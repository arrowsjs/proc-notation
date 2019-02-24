const {recursiveBind} = require("./visitor.js");

const ast = require("./ast.js");
const {intersection,idents,freeVars} = require('./util.js');
const {Node,Block,Let,Return,Conditional,Call,Member,Ident,Literal} = ast;

const arrowjsType = require('./arrowjsType.js');

let _options = {
  generalized_arrow: true,
  qualified_name: "",
  type_annotation: true,
};

module.exports = {
  translate: function(node, options) {
    if (typeof options === 'object') {
      for (let o in options)
        _options[o] = options[o];
    }
    return translate(node);
  }
};


function translate(node) {
  return recursiveBind(node, null, {
    ArrowProcedureExpression(node, state, c) {
      ast.setSource(node);
      return translate(translate_proc(node));
    }
  });
}


function translate_proc(node) {
  if (node.type === "ArrowProcedureExpression")
    return translate_command(node.param, node.command)
  return node;
}

function translate_command(p, cmd) {
  switch (cmd.type) {
  // proc p -> e1 -< e2
  // proc p -> e1 -<|
  case "ApplicationCommand": {
    let e1 = cmd.arrow, e2 = cmd.input;
    if (e2 === null) e2 = unit();
    let deps = intersection(idents(p), freeVars(e1));
    if (deps.size === 0)
      return seq(route(p, e2), e1);
    else {
      console.warn('requires app because of:', deps);
      return seq(route(p, ast.Array(e1, e2)), Ident("app"))
    }
  }

  // proc p -> form e ...cmds
  case "FormCommand": {
    let op = cmd.operator, ps = cmd.arguments.map(c => Proc(p, c));
    // if metafunction
    if (typeof op === "function")
      return op(...ps);
    else {
      let as = ps.map(translate_proc);
      return Call(op, ...as);
    }
  }

  // proc p -> κ p' -> cmd
  case "KappaAbstractionCommand": {
    let p2 = cmd.param, c = cmd.command;
    return Proc(TuplePattern(p, p2), c);
  }

  // proc p -> do { stmts }
  case "DoCommand":
    return translate_docmd(p, cmd.statements);

  // proc p -> if (e1) c1 else c2
  case "ConditionalCommand": {
    let e1 = cmd.test, c1 = cmd.consequent, c2 = cmd.alternate;
    let a = arr(Arrow([p], Conditional(e1, arr_left(p), arr_right(p))));
    return seq(a, fanin(Proc(p, c1), Proc(p, c2)));
  }

  // proc p -> let x = e and c
  case "LetCommand": {
    let x = cmd.id, e = cmd.init, c = cmd.command;
    let a = route(p, e);
    let fv_cmd = freeVars(c);
    if (intersection(idents(p), fv_cmd).size === 0)
      return seq(a, translate_command(x, c));
    else if (intersection(idents(x), fv_cmd).size === 0)
      return bind_(a, translate_command(p, c));
    else
      return bind(a, translate_command(p, Kabs(x, c)));
  }

  // proc p -> try c1 catch(e) c2
  case "TryCommand": {
    let c1 = cmd.command, e = cmd.handlerParam, c2 = cmd.handler
    //return Proc(p, Form(qualified(Ident("handle")), [Kabs(e, c2), c1]));
    return arr_handle(Proc(p, Kabs(e, c2)), Proc(p, c1));
  }

  // proc p -> { stmts }
  case "StatementBlockCommand":
    return arr(Arrow([p], cmd.body));

  default:
    console.warn("Unrecognized command", cmd.type);
  }
  return cmd;
}

// proc p -> do { stmts }
function translate_docmd(p, stmts) {
  // proc p -> do { c }
  if (stmts.length === 1) {
    let stmt = stmts[0];
    if (stmt.type !== "CommandStatement")
      throw new Error("do block must end with a command");
    return translate_command(p, stmt.command);
  }

  let [stmt, ...rest] = stmts;
  let p_idents = idents(p);
  let fv_rest = freeVars(DoCmd(rest));

  switch (stmt.type) {

  // proc p -> do { x <- c; rest }
  case "BindProcStatement": {
    let x = stmt.left, c = stmt.right;
    if (intersection(p_idents, fv_rest).size === 0)
      return seq(translate_command(p, c), translate_command(x, DoCmd(rest)));
    else if (intersection(idents(x), fv_rest).size === 0)
      return bind_(translate_command(p, c), translate_command(p, DoCmd(rest)));
    else
      return bind(translate_command(p, c), translate_command(p, Kabs(x, DoCmd(rest))));
  }

  // proc p -> do { let x = e; rest }
  case "LetProcStatement": {
    let x = stmt.id, e = stmt.init;
    let a = route(p, e);
    if (intersection(p_idents, fv_rest).size === 0)
      return seq(a, translate_command(x, DoCmd(rest)));
    else if (intersection(idents(x), fv_rest).size === 0)
      return bind_(a, translate_command(p, DoCmd(rest)));
    else
      return bind(a, translate_command(p, Kabs(x, DoCmd(rest))));
  }

  // proc p -> do { cmd; rest }
  case "CommandStatement":
    if (intersection(p_idents, fv_rest).size === 0) {
      let p2 = p;
      //FIXME: generate unique Identifier
      if (p2.type !== "Identifier")
        p2 = Ident("_");
      return seq(translate_command(p, stmt.command), translate_docmd(p2, rest));
    }
    else
      return bind_(translate_command(p, stmt.command), translate_docmd(p, rest));

  default:
    console.warn("Unrecognized command statement", stmt.type);
  }
}


// ast helper functions

// proc notation
function Proc(param, cmd) {
  return new Node("ArrowProcedureExpression", {
    param: param,
    command: cmd
  });
}

function Form(op, cmds) {
  return new Node("FormCommand", {operator: op, arguments: cmds});
}

function Kabs(pat, body) {
  return new Node("KappaAbstractionCommand", {
    param: pat,
    command: body
  });
}

function DoCmd(stmts) {
  return new Node("DoCommand", {statements: stmts});
}


// assume all arrow methods (and combinators) are within this namespace
function qualified(id) {
  return _options.qualified_name ? Member(Ident(_options.qualified_name), id) : id
}

// arrow interface
function arr_id() {
  let n = Call(qualified(Ident("id")));
  n._route = "id";
  return n;
}

function arr(f) {
  return Call(qualified(Ident("arr")), f);
}

// same as arr, but marked for routing function
function arr_route(f) {
  return Call(qualified(Ident("arr_route")), f);
}

function arr_first(a) {
  return Call(qualified(Ident("first")), a);
}

function arr_second(a) {
  return Call(qualified(Ident("second")), a);
}

function fanout(f, g) {
  return Call(qualified(Ident("fanout")), f, g);
}

function fanin(f, g) {
  return Call(qualified(Ident("fanin")), f, g);
}

function unit() {
  return qualified(Ident("unit"));
}

function seq(f, g) {
  if (f._route === "id") return g;
  if (g._route === "id") return f;
  return Call(qualified(Ident("seq")), f, g);
}

function arr_left(a) {
  return Call(qualified(Ident("Left")), a);
}

function arr_right(a) {
  return Call(qualified(Ident("Right")), a);
}

function arr_handle(h, a) {
  return Call(qualified(Ident("handle")), h, a);
}


// generalized arrow

// arr snd
function ga_cancell() {
  return Call(qualified(Ident("cancell")));
}

// arr fst
function ga_cancelr() {
  return Call(qualified(Ident("cancelr")));
}

// arr \x -> ((), x)
function ga_uncancell() {
  return Call(qualified(Ident("uncancell")));
}

// arr \x -> (x, ())
function ga_uncancelr() {
  return Call(qualified(Ident("uncancelr")));
}

// arr assoc
// where assoc ((a,b),c) = (a,(b,c))
function ga_assoc() {
  return Call(qualified(Ident("assoc")));
}

// arr unassoc
// where unassoc (a,(b,c)) = ((a,b),c))
function ga_unassoc() {
  return Call(qualified(Ident("unassoc")));
}

// arr \_ -> ()
function ga_drop() {
  return Call(qualified(Ident("drop")));
}

// arr \x -> (x,x)
function ga_copy() {
  return Call(qualified(Ident("copy")));
}

// arr \(x,y) -> (y,x)
function ga_swap() {
  return Call(qualified(Ident("swap")));
}

//
function bind(f, g) {
  return seq(fanout(arr_id(), f), g);
}

function bind_(f, g) {
  if (f._route === "id") return g;
  let fst = _options.generalized_arrow ? ga_cancelr()
    : arr_route(Arrow([Ident("p")], Member(Ident("p"), Literal(0), true)));
  return bind(f, seq(fst, g));
}

// for route/ga_route
function node_eq_array(a1, a2) {
  return a1.length === a2.length
      && a1.every((e,i) => node_eq(e, a2[i]));
}

function node_eq(n1, n2) {
  switch (n1.type) {
  case "Identifier":
    return n1.type === n2.type && n1.name === n2.name;
  case "ArrayPattern":
    return n2.type === "ArrayExpression" && node_eq_array(n1.elements, n2.elements)
  case "CallExpression":
    return n1.type === n2.type && node_eq(n1.callee, n2.callee)
        && node_eq_array(n1.arguments, n2.arguments);
  case "MemberExpression":
    return n1.type === n2.type && node_eq(n1.object, n2.object)
        && node_eq(n1.property, n2.property);
        // check computed form?
  case "Literal":
    return n1.type === n2.type && n1.value === n2.value;
  }
  return false;
}

function ga_route(pat, out) {
  if (node_eq(pat, out)) return arr_id();
  if (node_eq(out, unit())) return ga_drop();

  if (pat.type === "ArrayPattern") {
    // fst
    if (node_eq(pat.elements[0], out))
      return ga_cancelr();
    // snd
    if (node_eq(pat.elements[1], out))
      return ga_cancell();

    if (out.type === "ArrayExpression") {
      if (pat.elements.length === 2 && out.elements.length === 2) {
        // swap
        if (node_eq(pat.elements[0], out.elements[1]) && node_eq(pat.elements[1], out.elements[0]))
          return ga_swap();

        // assoc
        if (pat.elements[0].type === "ArrayPattern" && pat.elements[0].elements.length === 2
         && out.elements[1].type === "ArrayExpression" && out.elements[1].elements.length === 2
         && node_eq(pat.elements[0].elements[0], out.elements[0])
         && node_eq(pat.elements[0].elements[1], out.elements[1].elements[0])
         && node_eq(pat.elements[1], out.elements[1].elements[1]))
          return ga_assoc();

        // unassoc
        if (pat.elements[1].type === "ArrayPattern" && pat.elements[1].elements.length === 2
         && out.elements[0].type === "ArrayExpression" && out.elements[0].elements.length === 2
         && node_eq(pat.elements[0], out.elements[0].elements[0])
         && node_eq(pat.elements[1].elements[0], out.elements[0].elements[1])
         && node_eq(pat.elements[1].elements[1], out.elements[1]))
          return ga_unassoc();
      }
    }
  }

  if (out.type === "ArrayExpression") {
    if (out.elements.length === 2) {
      if (node_eq(pat, out.elements[0]) && node_eq(pat, out.elements[1]))
        return ga_copy();
    }
  }

  if (out.type === "MemberExpression") {
    if (node_eq(pat, out.object) && out.computed) {
      // fst
      if (node_eq(out.property, Literal(0)))
        return ga_cancelr();
      // snd
      if (node_eq(out.property, Literal(1)))
        return ga_cancell();
    }
  }

  return arr_route(Arrow([pat], out));
}


function route(pat, out) {
  if (_options.generalized_arrow) return ga_route(pat, out);

  if (node_eq(pat, out)) return arr_id();
  return arr_route(Arrow([pat], out));
}

function TuplePattern(...elems) {
  let node = ast.ArrayPattern(...elems);
  let types = [];
  let typed = false;
  let type_submap = {};
  for (let p of elems) {
    if (hasType(p)) typed = true;
    types.push(getType(p, type_submap));
  }

  if (typed)
    setType(node, new arrowjsType.TupleType(types));
  return node;
}

function Arrow(params, body) {
  if (_options.type_annotation) {
    let map = {}
    let paramTypes = params.map(n => getType(n, map))[0];  //!
    let returnType = getType(body, map);
    let arrow_type = new arrowjsType.ArrowType(paramTypes, returnType);
    let annotation = arrowjsType.asComment(arrow_type);

    if (body.type !== "BlockStatement")
      body = Block(Return(body));
    body.comments = [ new Node("Block", {value: annotation}, body) ];
  }
  return ast.Arrow(params, body);
}

function setType(node, type) {
  node.typeAnnotation = type;
}

function hasType(node) {
  return node.typeAnnotation;
}

function getType(node, map) {
  if (hasType(node))
    return node.typeAnnotation;

  switch (node.type) {
  case 'ArrayPattern':
  case 'ArrayExpression':
    return new arrowjsType.TupleType(node.elements.map(n => getType(n, map)));

  case 'Identifier': {
    let ty = map[node.name];
    if (ty) return ty;
    map[node.name] = ty = arrowjsType.ParamType.fresh();
    return ty;
  }

  default:
    return arrowjsType.ParamType.fresh();
  }
}

