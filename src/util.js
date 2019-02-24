const {recursive} = require('./visitor.js');

function intersection(a, b) {
  const s = new Set();
  for (const x of a)
    if (b.has(x))
      s.add(x);
  return s;
}

function idents(node) {
  if (node._idents) return node._idents;
  let set = new Set();
  recursive(node, null, {
    Identifier(node) {
      set.add(node.name);
    }
  });
  node._idents = set;
  return set;
}


// per function scope
class FreeEnv {
  constructor() {
    this.lexical = [new Set()];
    this.freeVars = new Set();
  }

  addFreeVars(fv) {
    for (let id of fv)
      if (! this.has(id))
        this.freeVars.add(id);
  }

  pushScope() {
    this.lexical.push(new Set());
  }

  popScope() {
    this.lexical.pop();
  }

  has(name) {
    for (let scope of this.lexical)
      if (scope.has(name))
        return true;
    return false;
  }

  declare(names, isVar) {
    let idx = isVar ? 0 : this.lexical.length - 1;
    let env = this.lexical[idx];
    let fv = this.freeVars;
    for (let id of names) {
      env.add(id);
      if (isVar && fv.has(id))
        fv.remove(id);
    }
  }
}

// cache fv on function expression and proc
function freeVars(astNode) {
  if (astNode._freeVars) return astNode._freeVars;

  let ctx = new FreeEnv();

  recursive(astNode, ctx, {
    VariableDeclaration(node, ctx, c) {
      let isVar = node.kind === "var";
      for (let decl of node.declarations) {
        if (decl.init) c(decl.init, ctx);
        ctx.declare(idents(decl.id), isVar);
      }
    },
    Function(node, ctx, c) {
      if (node !== astNode) {
        let fv = freeVars(node);
        ctx.addFreeVars(fv);
        if (node.type === "FunctionDeclaration")
          ctx.declare(idents(node.id), true);
      } else {
        if (node.id) ctx.declare(idents(node.id));
        for (let p of node.params)
          ctx.declare(idents(p));
        c(node.body, ctx);
        node._freeVars = ctx.freeVars;
      }
    },
    Identifier(node, ctx) {
      if (!ctx.has(node.name))
        ctx.freeVars.add(node.name);
    },
    MemberExpression(node, ctx, c) {
      c(node.object, ctx);
      if (node.computed)
        c(node.property, ctx);
    },
    BlockStatement(node, ctx, c) {
      ctx.pushScope();
      for (let stmt of node.body)
        c(stmt, ctx);
      ctx.popScope();
    },
    ForStatement(node, ctx, c) {
      ctx.pushScope();
      if (node.init) c(node.init, ctx);
      if (node.test) c(node.test, ctx);
      if (node.update) c(node.update, ctx);
      c(node.body, ctx);
      ctx.popScope();
    },
    CatchClause(node, ctx, c) {
      ctx.pushScope();
      if (node.param)
        ctx.declare(idents(node.param));
      c(node.body, ctx);
      ctx.popScope();
    },
    ArrowProcedureExpression(node, ctx, c) {
      if (node !== astNode) {
        let fv = freeVars(node);
        ctx.addFreeVars(fv);
      } else {
        ctx.declare(idents(node.param));
        c(node.command, ctx);
        node._freeVars = ctx.freeVars;
      }
    },
    ApplicationCommand(node, ctx, c) {
      c(node.arrow, ctx);
      if (node.input) c(node.input, ctx);
    },
    BindProcStatement(node, ctx, c) {
      ctx.declare(idents(node.left));
      c(node.right, ctx);
    },
    FormCommand(node, ctx, c) {
      c(node.operator, ctx);
      for (let cmd of node.arguments)
        c(cmd, ctx);
    },
    DoCommand(node, ctx, c) {
      ctx.pushScope();
      for (let stmt of node.statements)
        c(stmt, ctx);
      ctx.popScope();
    },
    CommandStatement(node, ctx, c) {
      c(node.command, ctx);
    },
    LetProcStatement(node, ctx, c) {
      c(node.init, ctx);
      ctx.declare(idents(node.id));
    },
    TryCommand(node, ctx, c) {
      c(node.command, ctx);
      ctx.pushScope();
      ctx.declare(idents(node.handlerParam));
      c(node.handler, ctx);
      ctx.popScope();
    },
    LetCommand(node, ctx, c) {
      ctx.pushScope();
      c(node.init, ctx);
      ctx.declare(idents(node.id));
      c(node.command, ctx);
      ctx.popScope();
    },
    ConditionalCommand(node, ctx, c) {
      c(node.test, ctx);
      c(node.consequent, ctx);
      c(node.alternate, ctx);
    },
    KappaAbstractCommand(node, ctx, c) {
      ctx.pushScope();
      ctx.declare(idents(node.param));
      c(node.command, ctx);
      ctx.popScope();
    },
    StatementBlockCommand(node, ctx, c) {
      c(node.body, ctx);
    }
  });
  return ctx.freeVars;
}

module.exports = {
  intersection: intersection,
  idents: idents,
  freeVars: freeVars
};

