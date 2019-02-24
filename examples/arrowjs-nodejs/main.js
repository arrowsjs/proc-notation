const Arrowjs = require("./arrowjs.js");
const {arrowjs, returnA, wait, ChoiceCombinator} = require("./arrow.js");
Arrowjs._setTypecheck(true);
let x = 0;
const isPlaying = (() => {
  /*@arrow :: _ ~> Bool*/
  console.log(x);
  return ++x < 100;
}).lift();
const showProgress = Arrowjs.Arrow.fix(showProgress => arrowjs.seq(arrowjs.fanout(arrowjs.id(), isPlaying), arrowjs.seq(arrowjs.arr(([song, playing]) => {
  /*@arrow :: ('_tvar3, '_tvar4) ~> '_tvar5*/
  return playing ? arrowjs.Left([song, playing]) : arrowjs.Right([song, playing]);
  // wait(250) -<|
}), arrowjs.fanin(arrowjs.seq(arrowjs.arr(([song, playing]) => {
  /*@arrow :: ('_tvar6, '_tvar7) ~> '_tvar8*/
  return song;
}), showProgress), arrowjs.seq(arrowjs.arr(([song, playing]) => {
  /*@arrow :: ('_tvar9, '_tvar10) ~> '_tvar11*/
  return arrowjs.unit;
}), returnA)))));
function constArr(v) {
  return (() => {
    /*@arrow :: _ ~> 'a*/
    return v;
  }).lift();
}
constArr(undefined).seq(showProgress).run();
console.log(showProgress.isAsync());
// Arrowjs._setTypecheck(true);
function a(x) {
  /*@arrow :: Number ~> String*/
  x.toString();
}
function b(x) {
  /*@arrow :: String ~> String*/
  x.toString();
}
let aa = new ChoiceCombinator(returnA, returnA);
let bb = new ChoiceCombinator(a.lift(), b.lift());
console.log(aa.type.toString());
console.log(bb.type.toString());

