// _benchmarkStart(true);

_setTypecheck(false);

const showTitle = new LiftedArrow(i => {
    /** @arrow :: Number ~> _ */
    $('#music-title').text(songNames[i]);
    $('#music-time').text('Loading...');
});

const checkIfReady = new LiftedArrow(song => {
    /** @arrow :: Elem ~> Bool */
    return song.prop('readyState') >= 4
});

const update = new LiftedArrow(song => {
    /** @arrow :: Elem ~> _ */
    $('#music-time').text(
        formatTime(song.prop('currentTime')) + '/' + formatTime(song.prop('duration'))
    );
});

const isPlaying = new LiftedArrow(song => {
    /** @arrow :: Elem ~> Bool */
    return song.prop('currentTime') != song.prop('duration');
});

const getSong = new LiftedArrow(i => {
    /* @arrow :: Number ~> Elem */
    return $('#music' + i);
});

const loadSong = new LiftedArrow(song => {
    /** @arrow :: Elem ~> _ */
    if (song.prop('readyState') < 4) {
        song.trigger('load');
    }
});

const playSong = new LiftedArrow(song => {
    /** @arrow :: Elem ~> _ */
    song.trigger('play');
});

const pauseSong = new LiftedArrow(song => {
    /** @arrow :: Elem ~> _ */
    song.trigger('pause');
});

const stopSong = new LiftedArrow(song => {
    /** @arrow :: Elem ~> _ */
    song.trigger('pause');
    song.prop('currentTime', 0);
});

const showPlay = new LiftedArrow(() => {
    $('#music-play').show();
    $('#music-pause').hide();
});

const showPause = new LiftedArrow(() => {
    $('#music-play').hide();
    $('#music-pause').show();
});

const showProgress = Arrow.fix(showProgress =>
  proc song -> do {
    update -< song
    wait(250) -<|
    // (song => console.log(song)).lift() -< song;
    playing <- isPlaying -< song
    if (playing) showProgress -< song
    else returnA -<|
  }
);

const loadAndPlaySong = proc id -> do {
  showTitle -< id;
  song <- getSong -< id;
  loadSong -< song;
  if (song.prop('readyState') < 4)
    event('canplay canplaythrough') -< song;
  else do {
    showPlay -<|;
  }
}

const mainloop = Arrow.fix(mainloop =>
  proc id -> do {
    [nextSong, playnow] <- (| ((...args) => Arrow.any(args))
      do {
        onElemEvent('#music-pause', 'click') -<|
        showPlay -<|
        song <- getSong -< id
        pauseSong -< song
        returnA -< [id, false]
      }
      do {
        onElemEvent('#music-play', 'click') -<|
        returnA -< [id, true]
      }
      do {
        onElemEvent('#music-next', 'click') -<|
        returnA -< [(id + 1) % songNames.length, true]
      }
      do {
        onElemEvent('#music-prev', 'click') -<|
        returnA -< [(id == 0) ? (songNames.length - 1) : (id - 1), true]
      }
    |)
    if(isFirst() || id != nextSong) do {
          song <- getSong -< id
          stopSong -< song;
          loadAndPlaySong -< nextSong
    };
    else
          returnA -<|;
    if(playnow) do {
          showPause -<|

          Arrow.fix(loop =>
            Arrow.any([
               mainloop,
               proc id -> do {
                 song <- getSong -< id
                 playSong -< song
                 showProgress.noemit() -< song
                 loop -< ((id + 1) % songNames.length)
              }
            ])
          ) -< nextSong
    }
    else
          mainloop -< nextSong;

  }
);

var first = true;
const isFirst = () => { if(first) { first = false; return true; } else { return false; } }

_benchmarkResultsOrRun(proc (_ : _)-> do {
  showPlay -<|
  mainloop -< 0
});

