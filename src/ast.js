class Node {
  constructor(type, props, source = _source) {
    this.type = type;
    for (let p in props)
      this[p] = props[p];
    if (source) {
      this.loc = source.loc;
      this.start = source.start;
      this.end = source.end;
    }
  }
}

let _source;

module.exports = {
  setSource(node) {
    _source = node;
  },

  Node: Node,

  Block(...stmts) {
    return new Node("BlockStatement", {body: stmts});
  },

  Let(id, init) {
    return new Node("VariableDeclaration", {
      declarations: [ new Node("VariableDeclarator", {id: id, init: init}) ],
      kind: "let",
    });
  },

  Return(e) {
    return new Node("ReturnStatement", {argument: e});
  },

  Conditional(test, cons, alt) {
    return new Node("ConditionalExpression", {
      test: test,
      consequent: cons,
      alternate: alt
    });
  },

  Call(f, ...args) {
    return new Node("CallExpression", {callee: f, arguments: args});
  },

  Arrow(params, body) {
    return new Node("ArrowFunctionExpression", {
      params: params,
      body: body
    });
  },

  Member(obj, prop, computed) {
    return new Node("MemberExpression", {
      object: obj,
      property: prop,
      computed: !!computed,
    });
  },

  ArrayPattern(...elems) {
    return new Node("ArrayPattern", {elements: elems});
  },

  Ident(name) {
    return new Node("Identifier", {name: name});
  },

  Literal(value) {
    return new Node("Literal", {value: value});
  },

  Array(...elements) {
    return new Node("ArrayExpression", {elements: elements});
  }

};

