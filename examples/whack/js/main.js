// _benchmarkStart(true);
// _setTypecheck(false);
const checkHits = new LiftedArrow(function () {
  /*@arrow _ ~> _ \ ({}, {_})*/
  if (hits >= 10) {
    throw null;
  }
});
const random = new LiftedArrow(function () {
  /*@arrow :: _ ~> Number*/
  return randomTimeout();
});
const show = new LiftedArrow(function (hole) {
  /*@arrow :: Elem ~> _*/
  hole.flip(true);
});
const hide = new LiftedArrow(function (hole) {
  /*@arrow :: Elem ~> _*/
  hole.flip(false);
});
const randomDelay = Arrow.seq([random, new DynamicDelayArrow()]).remember();
function popup(selector) {
  return Arrow.seq([checkHits, randomDelay, new ElemArrow(selector), show.remember(), Arrow.any([randomDelay, Arrow.seq([new EventArrow('click'), hit.lift()]).remember()]), hide]).forever();
}
const play = Arrow.seq([setup.lift(), hideAll.lift(), Arrow.catch(Arrow.seq([Arrow.any([Arrow.fanout([popup('#hole1'), popup('#hole2'), popup('#hole3'), popup('#hole4'), popup('#hole5'), popup('#hole6'), popup('#hole7'), popup('#hole8'), popup('#hole9')]).noemit(), lost.lift().after(15000)])]), won.lift()), showAll.lift()]);
function setEnabled(enabled) {
  return new LiftedArrow(button => {
    /*@arrow :: Elem ~> _*/
    button.prop('disabled', !enabled);
  });
}
function startWhenPressed(elem, arrow) {
  return new ElemArrow(elem).on('click', arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.arr(x => {
    /*@arrow :: '_tvar1 ~> '_tvar1*/
    return x;
  })), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, [y]]) => {
    /*@arrow :: ('_tvar4, ('_tvar5)) ~> '_tvar5*/
    return y;
  }), setEnabled(false))), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar12 ~> '_tvar13*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([x, [y]]) => {
    /*@arrow :: ('_tvar6, ('_tvar7)) ~> '_tvar6*/
    return x;
  }), arrow)), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar10 ~> '_tvar11*/
    return p[0];
  }), arrowjs.seq(arrowjs.arr(([x, [y]]) => {
    /*@arrow :: ('_tvar8, ('_tvar9)) ~> '_tvar9*/
    return y;
  }), setEnabled(true)))))))).forever();
}
_benchmarkResultsOrRun(startWhenPressed('#play', play));

