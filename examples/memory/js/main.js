// _benchmarkStart(true);
// _setTypecheck(false);
const selectOne = Arrow.bind('click', select.lift()).whileTrue();
const round = arrowjs.seq(arrowjs.fanout(arrowjs.id(), clear.lift()), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar5 ~> '_tvar6*/
  return p[0];
}), arrowjs.seq(arrowjs.fanout(arrowjs.id(), selectOne), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar3 ~> '_tvar4*/
  return p[0];
}), arrowjs.seq(arrowjs.fanout(arrowjs.id(), selectOne), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar1 ~> '_tvar2*/
  return p[0];
}), arrowjs.seq(arrowjs.fanout(arrowjs.id(), validate.lift()), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, y]) => {
  /*@arrow :: ('_tvar9, '_tvar10) ~> '_tvar10*/
  return y;
}), Arrow.id().wait(500))), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar17 ~> '_tvar18*/
  return p[0];
}), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, y]) => {
  /*@arrow :: ('_tvar11, '_tvar12) ~> ('_tvar11, '_tvar12)*/
  return [x, y];
}), freeze.lift())), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar15 ~> '_tvar16*/
  return p[0];
}), arrowjs.seq(arrowjs.arr(([x, y]) => {
  /*@arrow :: ('_tvar13, '_tvar14) ~> '_tvar14*/
  return y;
}), Arrow.id().wait(500)))))))))))));
const game = arrowjs.seq(arrowjs.fanout(arrowjs.id(), round), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar19 ~> '_tvar20*/
  return p[0];
}), cardsLeft.lift())).whileTrue();
const play = arrowjs.seq(arrowjs.fanout(arrowjs.id(), setup.lift()), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, y]) => {
  /*@arrow :: ('_tvar23, '_tvar24) ~> '_tvar24*/
  return y;
}), Arrow.id().wait(1000))), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar31 ~> '_tvar32*/
  return p[0];
}), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, y]) => {
  /*@arrow :: ('_tvar25, '_tvar26) ~> '_tvar26*/
  return y;
}), game)), arrowjs.seq(arrowjs.arr(p => {
  /*@arrow :: '_tvar29 ~> '_tvar30*/
  return p[0];
}), arrowjs.seq(arrowjs.arr(([x, y]) => {
  /*@arrow :: ('_tvar27, '_tvar28) ~> '_tvar28*/
  return y;
}), won.lift()))))));
function setEnabled(enabled) {
  return new LiftedArrow(button => {
    /*@arrow :: Elem ~> _*/
    button.prop('disabled', !enabled);
  });
}
function startWhenPressed(elem, arrow) {
  return new ElemArrow(elem).on('click', arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.arr(x => {
    /*@arrow :: '_tvar33 ~> '_tvar33*/
    return x;
  })), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, [y]]) => {
    /*@arrow :: ('_tvar36, ('_tvar37)) ~> '_tvar37*/
    return y;
  }), setEnabled(false))), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar44 ~> '_tvar45*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, [y]]) => {
    /*@arrow :: ('_tvar38, ('_tvar39)) ~> '_tvar38*/
    return x;
  }), arrow)), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar42 ~> '_tvar43*/
    return p[0];
  }), arrowjs.seq(arrowjs.arr(([x, [y]]) => {
    /*@arrow :: ('_tvar40, ('_tvar41)) ~> '_tvar41*/
    return y;
  }), setEnabled(true)))))))).forever();
}
_benchmarkResultsOrRun(startWhenPressed('#play', play));

