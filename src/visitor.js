// modified version of acorn-walk

const ignore = (node) => node;

let b = {};
b.Program = b.BlockStatement = (node, st, c) => {
  for (let i = 0, len = node.body.length; i < len; ++i)
    node.body[i] = c(node.body[i], st);
  return node;
};
b.Statement = ignore;
b.EmptyStatement = ignore;
b.ExpressionStatement = b.ParenthesizedExpression = (node, st, c) => {
  node.expression = c(node.expression, st);
  return node;
};
b.IfStatement = (node, st, c) => {
  node.test = c(node.test, st);
  node.consequent = c(node.consequent, st);
  if (node.alternate) node.alternate = c(node.alternate, st);
  return node;
};
b.LabeledStatement = (node, st, c) => {
  node.body = c(node.body, st);
  return node;
};
b.BreakStatement = b.ContinueStatement = ignore;
b.WithStatement = (node, st, c) => {
  node.object = c(node.object, st);
  node.body = c(node.body, st);
  return node;
};
b.SwitchStatement = (node, st, c) => {
  node.discriminant = c(node.discriminant, st);
  for (let i = 0, len = node.cases.length; i < len; ++i)
    node.cases[i] = c(node.cases[i], st);
  return node;
};
b.SwitchCase = (node, st, c) => {
  if (node.test) node.test = c(node.test, st);
  for (let i = 0, len = node.consequent.length; i < len; ++i)
    node.consequent[i] = c(node.consequent[i], st);
  return node;
};
b.ReturnStatement = b.YieldExpression = b.AwaitExpression = (node, st, c) => {
  if (node.argument) node.argument = c(node.argument, st);
  return node;
};
b.ThrowStatement = b.SpreadElement = (node, st, c) => {
  node.argument = c(node.argument, st);
  return node;
};
b.TryStatement = (node, st, c) => {
  node.block = c(node.block, st);
  if (node.handler) node.handler = c(node.handler, st);
  if (node.finalizer) node.finalizer = c(node.finalizer, st);
  return node;
};
b.CatchClause = (node, st, c) => {
  if (node.param) node.param = c(node.param, st);
  node.body = c(node.body, st);
  return node;
};
b.WhileStatement = b.DoWhileStatement = (node, st, c) => {
  node.test = c(node.test, st);
  node.body = c(node.body, st);
  return node;
};
b.ForStatement = (node, st, c) => {
  if (node.init) node.init = c(node.init, st);
  if (node.test) node.test = c(node.test, st);
  if (node.update) node.update = c(node.update, st);
  node.body = c(node.body, st);
  return node;
};
b.ForInStatement = b.ForOfStatement = (node, st, c) => {
  node.left = c(node.left, st);
  node.right = c(node.right, st);
  node.body = c(node.body, st);
  return node;
};
b.DebuggerStatement = ignore
b.FunctionDeclaration = (node, st, c) => c(node, st, "Function");
b.VariableDeclaration = (node, st, c) => {
  for (let i = 0, len = node.declarations.length; i < len; ++i)
    node.declarations[i] = c(node.declarations[i], st);
  return node;
}
b.VariableDeclarator = (node, st, c) => {
  node.id = c(node.id, st);
  if (node.init) node.init = c(node.init, st);
  return node;
};
b.Function = (node, st, c) => {
  if (node.id) node.id = c(node.id, st);
  for (let i = 0, len = node.params.length; i < len; ++i)
    node.params[i] = c(node.params[i], st);
  node.body = c(node.body, st);
  return node;
};
b.Identifier = ignore;
b.FunctionBody = ignore;
b.Pattern = ignore;
b.RestElement = (node, st, c) => {
  node.argument = c(node.argument, st);
  return node;
};
b.ArrayPattern = (node, st, c) => {
  for (let i = 0, len = node.elements.length; i < len; ++i) {
    let elem = node.elements[i];
    if (elem) node.elements[i] = c(elem, st);
  }
  return node;
};
b.ObjectPattern = (node, st, c) => {
  for (let i = 0, len = node.properties.length; i < len; ++i) {
    let prop = node.properties[i];
    if (prop.type === "Property")
      node.properties[i] = c(prop, st, "AssignmentProperty");
    else
      node.properties[i] = c(prop, st, "RestElement");
  }
  return node;
};
b.AssignmentProperty = (node, st, c) => {
  node.key = c(node.key, st);
  node.value = c(node.value, st);
  return node;
};
b.Expression = ignore;
b.ThisExpression = b.Super = b.MetaProperty = ignore
b.ArrayExpression = (node, st, c) => {
  for (let i = 0, len = node.elements.length; i < len; ++i) {
    const elem = node.elements[i];
    if (elem) node.elements[i] = c(elem, st);
  }
  return node;
};
b.ObjectExpression = (node, st, c) => {
  for (let i = 0, len = node.properties.length; i < len; ++i)
    node.properties[i] = c(node.properties[i], st);
  return node;
};
b.FunctionExpression = b.ArrowFunctionExpression = b.FunctionDeclaration;
b.SequenceExpression = (node, st, c) => {
  for (let i = 0, len = node.expressions.length; i < len; ++i)
    node.expressions[i] = c(node.expressions[i], st);
  return node;
};
b.MethodDefinition = b.Property = (node, st, c) => {
  node.key = c(node.key, st);
  node.value = c(node.value, st);
  return node;
};
b.SequenceExpession = (node, st, c) => {
  for (let i = 0, len = node.expressions.length; i < len; ++i) {
    const expr = node.expressions[i];
    if (expr) node.expressions[i] = c(expr, st);
  }
  return node;
};
b.TemplateLiteral = (node, st, c) => {
  for (let i = 0, len = node.quasis.length; i < len; ++i)
    node.quasis[i] = c(node.quasis[i], st);

  for (let i = 0, len = node.expressions.length; i < len; ++i) {
    const expr = node.expressions[i];
    if (expr) node.expressions[i] = c(expr, st);
  }
  return node;
};
b.TemplateElement = ignore
b.TaggedTemplateExpression = (node, st, c) => {
  node.tag = c(node.tag, st);
  node.quasi = c(node.quasi, st);
  return node;
};
b.UnaryExpression = b.UpdateExpression = (node, st, c) => {
  node.argument = c(node.argument, st);
  return node;
};
b.BinaryExpression = b.LogicalExpression =
b.AssignmentExpression = b.AssignmentPattern = (node, st, c) => {
  node.left = c(node.left, st);
  node.right = c(node.right, st);
  return node;
};
b.ConditionalExpression = (node, st, c) => {
  node.test = c(node.test, st);
  node.consequent = c(node.consequent, st);
  node.alternate = c(node.alternate, st);
  return node;
};
b.NewExpression = b.CallExpression = (node, st, c) => {
  node.callee = c(node.callee, st);
  if (node.arguments)
    for (let i = 0, len = node.arguments.length; i < len; ++i)
      node.arguments[i] = c(node.arguments[i], st);
  return node;
};
b.MemberExpression = (node, st, c) => {
  node.object = c(node.object, st);
  node.property = c(node.property, st);
  return node;
};
b.ExportNamedDeclaration = b.ExportDefaultDeclaration = (node, st, c) => {
  if (node.declaration) node.delcaration = c(node.delcaration, st);
  if (node.source) node.source = c(node.source, st);
  return node;
};
b.ExportAllDeclaration = (node, st, c) => {
  node.source = c(node.source, st);
  return node;
};
b.ImportDeclaration = (node, st, c) => {
  for (let i = 0, len = node.specifiers.length; i < len; ++i)
    node.specifiers[i] = c(node.specifiers[i], st);
  node.source = c(node.source, st);
  return node;
};
b.ImportSpecifier = b.ImportDefaultSpecifier = b.ImportNamespaceSpecifier = b.Literal = ignore
b.ClassDeclaration = b.ClassExpression = (node, st, c) => c(node, st, "Class");
b.Class = (node, st, c) => {
  if (node.id) node.id = c(node.id, st);
  if (node.superClass) node.superClass = c(node.superClass, st);
  node.body = c(node.body, st);
  return node;
}
b.ClassBody = (node, st, c) => {
  for (let i = 0, len = node.body.length; i < len; ++i)
    node.body[i] = c(node.body[i], st);
  return node;
};

function make(funcs, base) {
  let visitor = Object.create(base || b);
  for (let type in funcs)
    visitor[type] = funcs[type];
  return visitor;
}

function recursive(node, state, visitor, override) {
  visitor = make(visitor, b);
  return (function dispatch(node, state, override) {
    if (typeof visitor[override || node.type] !== "function")
      console.error(`${override||node.type} is not a function`);
    visitor[override || node.type](node, state, dispatch);
    return node;
  })(node, state, override);
}

function recursiveBind(node, state, visitor, override) {
  visitor = make(visitor, b);
  return (function dispatch(node, state, override) {
    if (typeof visitor[override || node.type] !== "function")
      console.error(`${override||node.type} is not a function`);
    return visitor[override || node.type](node, state, dispatch);
  })(node, state, override);
}

module.exports = {
  visitor: b,
  recursive: recursive,
  recursiveBind: recursiveBind,
};

