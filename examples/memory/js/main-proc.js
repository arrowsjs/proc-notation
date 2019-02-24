//_benchmarkStart(true);

//_setTypecheck(false);

const selectOne = Arrow.bind('click', select.lift()).whileTrue();

const round = proc x -> do {
  clear.lift() -< x
  selectOne -< x
  selectOne -< x
  y <- validate.lift() -< x
  Arrow.id().wait(500) -< y
  freeze.lift() -< [x, y]
  Arrow.id().wait(500) -< y
};


const game = (proc x -> do {
  round -< x
  cardsLeft.lift() -< x
}).whileTrue();

const play = proc x -> do {
  y <- setup.lift() -< x
  Arrow.id().wait(1000) -< y
  game -< y
  won.lift() -< y
};


function setEnabled(enabled) {
    return new LiftedArrow(button => {
        /* @arrow :: Elem ~> _ */
        button.prop('disabled', !enabled);
    });
}

function startWhenPressed(elem, arrow) {
  return new ElemArrow(elem).on('click', proc x -> do {
    let [y] = x and do {
      setEnabled(false) -< y
      arrow -< x
      setEnabled(true) -< y
    }
  }).forever();
}

_benchmarkResultsOrRun(startWhenPressed('#play', play));
