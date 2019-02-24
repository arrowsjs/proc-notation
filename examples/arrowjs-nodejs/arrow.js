const {
  Arrow,
  Progress,
  TaggedValue,
  LiftedArrow,
  DelayArrow,
  Combinator,
  ParamType,
  TaggedUnionType,
  ArrowType,
  ConstraintSet,
  Constraint,
  _construct,
  ensureArrow,
  sanitizeTypes,
  ComposeError,
} = require('./arrowjs.js');

class ChoiceCombinator extends Combinator {
  constructor(left, right) {
    ensureArrow(left);
    ensureArrow(right);

    super(_construct(() => {
      let stl = sanitizeTypes([left])[0];
      let str = sanitizeTypes([right])[0];

      try {
        let tl = ParamType.fresh();
        let tr = ParamType.fresh();
        let arg = new TaggedUnionType({left: tl, right: tr});

        let out = ParamType.fresh();
        let ncs = new ConstraintSet([]);
        let err = [];

        ncs = ncs.concat(stl.constraints);
        ncs = ncs.concat(str.constraints);
        ncs = ncs.add(new Constraint(stl.arg, tl));
        ncs = ncs.add(new Constraint(str.arg, tr));

        ncs = ncs.add(new Constraint(stl.out, out));
        ncs = ncs.add(new Constraint(str.out, out));

        err = err.concat(stl.errors);
        err = err.concat(str.errors);

        return new ArrowType(arg, out, ncs, err);
      } catch (err) {
        throw new ComposeError("Unabled to compose Choice(" + stl + ", " + str + ")\n" + err);
      }
    }), [left, right]);
  }

  call(x, p, k, h) {
    if (!(x instanceof TaggedValue)) {
      throw new Error("Input value is not a tagged value");
    }

    if (x.hasTag("left")) {
      this.arrows[0].call(x.value(), p, k, h);
    } else if (x.hasTag("right")) {
      this.arrows[1].call(x.value(), p, k, h);
    } else {
      throw new Error("Input value does not have left or right tag");
    }
  }
}



const arrowjs = {
  id() { return Arrow.id(); },
  arr(f) { return f.lift(); },
  arr_route(f) { return new LiftedArrow(f, true); },
  fanout(a, b) { return Arrow.fanout([a, b]); },

  seq(a, b) { return a.seq(b); },

  // cannot use try directly because handler only allows one parameter
  // handler should take a tuple [x, err]
  handle(h, a) {
    // tag right if success, tag left if exception
    return Arrow.try(a,
      arrowjs.Right.lift(),
      arrowjs.Left.lift()).carry().seq(
      arrowjs.arr(([x,tagged]) => new TaggedValue(tagged.tag, [x, tagged.val])).seq(
          arrowjs.fanin(h, arrowjs.arr(([_,x]) => /* (_,'a) -> 'a */ x))));
  },

  fanin(left, right) {
    return new ChoiceCombinator(left, right);
  },

  // Either
  Left(v) {
    /* @arrow :: 'a ~> <left: 'a>  */
    return new TaggedValue("left", v);
  },
  Right(v) {
    /* @arrow :: 'a ~> <right: 'a> */
    return new TaggedValue("right", v);
  },

  // generalized arrow
  cancelr() {
    return new LiftedArrow(p => {
      /* @arrow :: 'a ~> 'b */
      return p[0];
    }, true);
  },
  cancell() {
    return new LiftedArrow(p => {
      /* @arrow :: 'a ~> 'b */
      return p[1];
    }, true);
  },
  assoc() {
    return new LiftedArrow(([[a,b],c]) => {
      /* @arrow :: (('a,'b),'c) ~> ('a,('b,'c)) */
      return [a,[b,c]];
    }, true);
  },
  unassoc() {
    return new LiftedArrow(([a,[b,c]]) => {
      /* @arrow :: ('a,('b,'c)) ~> (('a,'b),'c) */
      return [[a,b],c];
    }, true);
  },
  drop() {
    return new LiftedArrow(a => {
      /* @arrow :: 'a ~> _ */
      return arrowjs.unit;
    }, true);
  },
  copy() {
    return new LiftedArrow(a => {
      /* @arrow :: 'a ~> ('a,'a) */
      return [a,a];
    }, true);
  },
  swap() {
    return new LiftedArrow(([a,b]) => {
      /* @arrow :: ('a,'b) ~> ('b,'a) */
      return [b,a];
    }, true);
  },

};

const returnA = arrowjs.id();

function wait(ms) {
  return new DelayArrow(ms);
}

function onElemEvent(selector, evt) {
  return new ElemArrow(selector).seq(new EventArrow(evt));
}


module.exports = {
  arrowjs: arrowjs,
  returnA: returnA,
  wait: wait,
  ChoiceCombinator: ChoiceCombinator,
};

