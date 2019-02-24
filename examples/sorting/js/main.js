// _benchmarkStart(true);
// _setTypecheck(false);
function initSort() {
  /*@arrow :: _ ~> (Number, Bool, Number)*/
  return [NUM_ITEMS, false, 0];
}
function shuffle(i) {
  /*@arrow :: Number ~> <loop: Number, halt: _>*/
  let j = Math.floor(Math.random() * (i + 1));
  $('#sort-div').children().eq(NUM_ITEMS - i - 1).addClass('swapping');
  $('#sort-div').children().eq(NUM_ITEMS - j - 1).addClass('swapping');
  return i > 1 ? Arrow.loop(i - 1) : Arrow.halt();
}
function sort(i, hasInversion, numSorted) {
  /*@arrow :: (Number, Bool, Number) ~> <loop: (Number, Bool, Number), halt: _>*/
  let n1 = $('#sort-div').children().eq(NUM_ITEMS - i);
  let n2 = $('#sort-div').children().eq(NUM_ITEMS - i + 1);
  var inverted = false;
  if (parseInt(n1.css('width')) > parseInt(n2.css('width'))) {
    inverted = true;
    n1.addClass('swapping');
    n2.addClass('swapping');
  } else {
    n1.addClass('looking');
    n2.addClass('looking');
  }
  if (i - 1 > numSorted + 1) {
    return Arrow.loop([i - 1, hasInversion || inverted, numSorted]);
  } else {
    return hasInversion || inverted ? Arrow.loop([NUM_ITEMS, false, numSorted + 1]) : Arrow.halt();
  }
}
function animate(init, main) {
  return init.seq(arrowjs.seq(arrowjs.fanout(arrowjs.id(), clear.lift()), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar1 ~> '_tvar2*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), main), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar5, '_tvar6) ~> '_tvar6*/
    return m;
  }), Arrow.id().wait(ANIMATION))), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar29 ~> '_tvar30*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar7, '_tvar8) ~> '_tvar8*/
    return m;
  }), indent.lift())), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar27 ~> '_tvar28*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar9, '_tvar10) ~> '_tvar10*/
    return m;
  }), Arrow.id().wait(ANIMATION))), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar25 ~> '_tvar26*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar11, '_tvar12) ~> '_tvar12*/
    return m;
  }), swap.lift())), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar23 ~> '_tvar24*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar13, '_tvar14) ~> '_tvar14*/
    return m;
  }), Arrow.id().wait(ANIMATION))), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar21 ~> '_tvar22*/
    return p[0];
  }), arrowjs.seq(arrowjs.fanout(arrowjs.id(), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar15, '_tvar16) ~> '_tvar16*/
    return m;
  }), dedent.lift())), arrowjs.seq(arrowjs.arr(p => {
    /*@arrow :: '_tvar19 ~> '_tvar20*/
    return p[0];
  }), arrowjs.seq(arrowjs.arr(([c, m]) => {
    /*@arrow :: ('_tvar17, '_tvar18) ~> '_tvar18*/
    return m;
  }), Arrow.id().wait(ANIMATION))))))))))))))))).repeat().seq(clear.lift()));
}
function startWhenPressed(elem, arrow) {
  return new ElemArrow(elem).on('click', Arrow.seq([setEnabled(false), arrow, setEnabled(true)])).forever();
}
const doSort = animate(initSort.lift(), sort.lift());
const doShuffle = animate((NUM_ITEMS - 1).lift(), shuffle.lift());
_benchmarkResultsOrRun(startWhenPressed('#sort', doSort), startWhenPressed('#shuffle', doShuffle));

