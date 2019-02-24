// _benchmarkStart(true);
_setTypecheck(false);
const showTitle = new LiftedArrow(i => {
  /** @arrow :: Number ~> _*/
  $('#music-title').text(songNames[i]);
  $('#music-time').text('Loading...');
});
const checkIfReady = new LiftedArrow(song => {
  /** @arrow :: Elem ~> Bool*/
  return song.prop('readyState') >= 4;
});
const update = new LiftedArrow(song => {
  /** @arrow :: Elem ~> _*/
  $('#music-time').text(formatTime(song.prop('currentTime')) + '/' + formatTime(song.prop('duration')));
});
const isPlaying = new LiftedArrow(song => {
  /** @arrow :: Elem ~> Bool*/
  return song.prop('currentTime') != song.prop('duration');
});
const getSong = new LiftedArrow(i => {
  /*@arrow :: Number ~> Elem*/
  return $('#music' + i);
});
const loadSong = new LiftedArrow(song => {
  /** @arrow :: Elem ~> _*/
  if (song.prop('readyState') < 4) {
    song.trigger('load');
  }
});
const playSong = new LiftedArrow(song => {
  /** @arrow :: Elem ~> _*/
  song.trigger('play');
});
const pauseSong = new LiftedArrow(song => {
  /** @arrow :: Elem ~> _*/
  song.trigger('pause');
});
const stopSong = new LiftedArrow(song => {
  /** @arrow :: Elem ~> _*/
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
const showProgress = Arrow.fix(showProgress => arrowjs.seq(arrowjs.fanout(arrowjs.id(), update), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), wait(250))), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.fanout(arrowjs.id(), isPlaying), arrowjs.seq(arrowjs.arr(([song, playing]) => {
  /*@arrow :: ('_tvar3, '_tvar4) ~> '_tvar5*/
  return playing ? arrowjs.Left([song, playing]) : arrowjs.Right([song, playing]);
  // (song => console.log(song)).lift() -< song;
}), arrowjs.fanin(arrowjs.seq(arrowjs.cancelr(), showProgress), arrowjs.seq(arrowjs.drop(), returnA)))))))));
const loadAndPlaySong = arrowjs.seq(arrowjs.fanout(arrowjs.id(), showTitle), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(getSong, arrowjs.seq(arrowjs.fanout(arrowjs.id(), loadSong), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr(song => {
  /*@arrow :: '_tvar6 ~> '_tvar7*/
  return song.prop('readyState') < 4 ? arrowjs.Left(song) : arrowjs.Right(song);
}), arrowjs.fanin(event('canplay canplaythrough'), arrowjs.seq(arrowjs.drop(), showPlay))))))));
const mainloop = Arrow.fix(mainloop => arrowjs.seq(arrowjs.fanout(arrowjs.id(), ((...args) => Arrow.any(args))(arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), onElemEvent('#music-pause', 'click'))), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), showPlay)), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.fanout(arrowjs.id(), getSong), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.cancell(), pauseSong)), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr_route(([id, song]) => {
  /*@arrow :: ('_tvar21, '_tvar22) ~> ('_tvar21, '_tvar23)*/
  return [id, false];
}), returnA)))))))), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), onElemEvent('#music-play', 'click'))), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr_route(id => {
  /*@arrow :: '_tvar10 ~> ('_tvar10, '_tvar11)*/
  return [id, true];
}), returnA))), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), onElemEvent('#music-next', 'click'))), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr_route(id => {
  /*@arrow :: '_tvar12 ~> ('_tvar13, '_tvar14)*/
  return [(id + 1) % songNames.length, true];
}), returnA))), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), onElemEvent('#music-prev', 'click'))), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr_route(id => {
  /*@arrow :: '_tvar15 ~> ('_tvar16, '_tvar17)*/
  return [id == 0 ? songNames.length - 1 : id - 1, true];
}), returnA))))), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([id, [nextSong, playnow]]) => {
  /*@arrow :: ('_tvar24, ('_tvar25, '_tvar26)) ~> '_tvar27*/
  return isFirst() || id != nextSong ? arrowjs.Left([id, [nextSong, playnow]]) : arrowjs.Right([id, [nextSong, playnow]]);
}), arrowjs.fanin(arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.cancelr(), getSong)), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.cancell(), stopSong)), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr_route(([[id, [nextSong, playnow]], song]) => {
  /*@arrow :: (('_tvar36, ('_tvar37, '_tvar38)), '_tvar39) ~> '_tvar37*/
  return nextSong;
}), loadAndPlaySong)))), arrowjs.seq(arrowjs.drop(), returnA)))), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr(([id, [nextSong, playnow]]) => {
  /*@arrow :: ('_tvar28, ('_tvar29, '_tvar30)) ~> '_tvar31*/
  return playnow ? arrowjs.Left([id, [nextSong, playnow]]) : arrowjs.Right([id, [nextSong, playnow]]);
}), arrowjs.fanin(arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr_route(([id, [nextSong, playnow]]) => {
  /*@arrow :: ('_tvar40, ('_tvar41, '_tvar42)) ~> '_tvar41*/
  return nextSong;
}), getSong)), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.cancell(), playSong)), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), showPause)), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.arr_route(([[id, [nextSong, playnow]], song2]) => {
  /*@arrow :: (('_tvar47, ('_tvar48, '_tvar49)), '_tvar50) ~> '_tvar48*/
  return nextSong;
}), Arrow.any([mainloop, arrowjs.seq(arrowjs.fanout(arrowjs.id(), getSong), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.cancell(), showProgress.noemit())), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.drop(), showPlay)), arrowjs.seq(arrowjs.cancelr(), arrowjs.seq(arrowjs.cancelr(), mainloop))))))]))))))), arrowjs.seq(arrowjs.arr_route(([id, [nextSong, playnow]]) => {
  /*@arrow :: ('_tvar53, ('_tvar54, '_tvar55)) ~> '_tvar54*/
  return nextSong;
}), mainloop)))))));
var first = true;
const isFirst = () => {
  if (first) {
    first = false;
    return true;
  } else {
    return false;
  }
};
_benchmarkResultsOrRun(arrowjs.seq(arrowjs.seq(arrowjs.drop(), showPlay), arrowjs.seq(arrowjs.arr_route(_ => {
  /*@arrow :: _ ~> '_tvar56*/
  return 0;
}), mainloop)));

