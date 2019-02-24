// copy of arrowjs types with toString function

function arrayToString(lst, f, sep1, start = "", end = "") {
  let str = "";
  let sep = "";
  for (let e of lst) {
    str += sep + f(e);
    sep = sep1;
  }
  return start + str + end;
}

class ParamType {
  static fresh() {
    return new ParamType('_tvar' + ++ParamType.freshCount);
  }
  constructor(name) {
    this.name = name;
  }
  toString() {
    return `'${this.name}`;
  }
}

ParamType.freshCount = 0; 

module.exports = {
  NamedType: class {
    constructor(name) { this.name = name; }
    toString() { return this.name; }
  },

  TopType: class {
    toString() { return '_'; }
  },

  ParamType: ParamType,

  ArrayType: class {
    constructor(elementType) {
      this.elementType = elementType;
    }
    toString() {
      return `[${this.elementType}]`;
    }
  },

  TupleType: class {
    constructor(elementTypes) {
      this.elementTypes = elementTypes;
    }
    toString() {
      return arrayToString(this.elementTypes, ty => ty.toString(), ", ", "(", ")");
    }
  },

  SumType: class {
    constructor(types) {
      this.types = types;
    }
    toString() {
      return arrayToString(this.types, ty => ty.toString(), " + ");
    }
  },

  RecordType: class {
    constructor(taggedTypes) {
      this.taggedTypes = taggedTypes;
    }
    toString() {
      return arrayToString(this.taggedTypes, tty => tty.tag + ":" + tty.taggedType, ", ", "{", "}");
    }
  },

  TaggedUnionType: class {
    constructor(taggedTypes) {
      this.taggedTypes = taggedTypes;
    }
    toString() {
      return arrayToString(this.taggedTypes, tty => tty.tag + ":" + tty.taggedType, ", ", "<", ">");
    }
  },

  ArrowType: class {
    constructor(arg, out) {
      this.arg = arg;
      this.out = out;
    }
    toString() { return `${this.arg} ~> ${this.out}`; }
  },

  asComment(type) {
    return "@arrow :: " + type.toString();
  }

}

