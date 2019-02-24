
const NoImpl = (s) => Error("Not Implemented" + (s ? ": " + s : ""));

export default class GArrow {
  constructor() {
    this.unit = undefined;
  }

  id() { throw new NoImpl("id"); }
  compose() { throw new NoImpl("compose"); }

  returnA() { this.id(); }
  seq(a, b) { return this.compose(b, a); }

  arr(f) { throw new NoImpl("arr"); }
  first(a) { throw new NoImpl("first"); }
  second(a) {
    return this.seq(this.swap(), this.seq(this.first(a), this.swap()));
  }
  split(a, a2) {
    return this.seq(this.first(a), this.second(a2));
  }
  fanout(a, a2) {
    return this.seq(this.copy(), this.seq(this.first(a), this.second(a2)));
  }

  cancelr() { return this.arr_route(([p]) => p); }
  cancell() { return this.arr_route(([_,p]) => p); }
  assoc() { return this.arr_route(([[a,b],c]) => [a,[b,c]]); }
  unassoc() { return this.arr_route(([a,[b,c]]) => [[a,b],c]); }
  drop() { return this.arr_route(_ => this.unit); }
  copy() { return this.arr_route(a => [a,a]); }
  swap() { return this.arr_route(([a,b]) => [b,a]); }

  arr_route(f) { return this.arr(f); }
}

