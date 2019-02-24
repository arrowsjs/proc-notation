const Arrowjs = require("./arrowjs.js");
const {arrowjs,returnA,wait,ChoiceCombinator} = require("./arrow.js");

Arrowjs._setTypecheck(true);

let x = 0;

const isPlaying = (() => {
  /* @arrow :: _ ~> Bool */
  console.log(x);
  return ++x < 5;
}).lift();

const showProgress = Arrowjs.Arrow.fix(showProgress =>
  proc song -> do {
    playing <- isPlaying -< song
//    wait(250) -<|
    if (playing) showProgress -< song
    else returnA -<|
  }
);

function constArr(v) {
  return (() => {
    /* @arrow :: _ ~> 'a */
    return v;
  }).lift();
}

constArr(undefined).seq(showProgress).run();

console.log(showProgress.isAsync());

//Arrowjs._setTypecheck(true);

function a(x) {
  /* @arrow :: Number ~> String */
  x.toString();
}
function b(x) {
  /* @arrow :: String ~> String */
  x.toString();
}

let aa = new ChoiceCombinator(returnA, returnA);
let bb = new ChoiceCombinator(a.lift(), b.lift());

console.log(aa.type.toString());
console.log(bb.type.toString());

let a3 = proc (_ : _) -> do {
  let [x,y] = [1,2];
  returnA -< x
  { throw new Error("debug this"); }
}

a3.run();

