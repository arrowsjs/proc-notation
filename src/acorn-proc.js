/*

proc p -> cmd
interface ArrowProcedureExpression <: Expression {
  param: Pattern,
  command: ProcCommand
}

interface ProcCommand <: Node { }

a -< x
interface ApplicationCommand <: ProcCommand {
  type: "ApplicationCommand",
  arrow: Expression,
  input: Expression | null
}

p <- cmd
interface BindProcStatement <: ProcStatement {
  type: "BindProcStatement",
  left: Pattern,
  right: Command
}

(| op cmd ... |)
interface FormCommand <: ProcCommand {
  type: "FormCommand",
  operator: Expression,
  arguments: [ ProcCommand ]
}

{ stmt ... }
interface StatementBlockCommand <: ProcCommand {
  type: "StatementBlockCommand",
  body: Statement
}

do { cstmt ... cmd }
interface DoCommand <: ProcCommand {
  type: "DoCommand",
  statements: [ ProcStatement ]
}

interface ProcStatement <: Node

interface CommandStatement <: ProcStatement {
  type: "CommandStatement"
  command: command
}

let x = e
interface LetProcStatement <: ProcStatement {
  type: "LetProcStatement"
  id: Pattern
  init: Expression
}

try cmd catch (x) cmd
interface TryCommand <: ProcCommand {
  type: "TryCommand",
  command: Command,
  handlerParam: Pattern,
  handler: Command
}

let x = e and cmd
interface LetCommand <: ProcCommand {
  type: "LetCommand",
  id: Pattern,
  init: Expression,
  command: Commmand
}

if (e) e else e
interface ConditionalCommand <: ProcCommand {
  type: "ConditionalCommand",
  test: Expression,
  consequent: Expression,
  alternate: Expression
}

κ p' -> cmd
interface KappaAbstractCommand <: ProcCommand {
  type: "KappaAbstractCommand",
  param: Pattern,
  command: Command
}


typed command
p : T <- cmd
let x : T = e and cmd

T ::= tvar                                          -> TypeVariable
    | name                                          -> NamedType
    | [T]                                           -> ArrayType
    | ()                                            -> UnitType (undefined)
    | (T, T, ... T)                                 -> TupleType
    | T + T                                         -> SumType
    | { l:T, ... l:T}                               -> RecordType
    | < l:T, ... l:T>                               -> TaggedUnionType

tvar = { ?a , ?b, ?c ... }
name = identifier
l = string


Actual implementation:
Parsed type information are set to the identifier/pattern AST node as property named "typeAnnotation".

Type objects created to attach to the nodes are objects almost identical to arrowjs type objects, with
a toString method to convert it to text form.

- TypeVariable above renamed to ParamType match arrowjs type.
- UnitType is not implemented since the it uses arrowjs types directly and it does not seems to have
  unit type.
- if named type is `_`, it means top type in arrowjs

*/


const {TokenType, TokContext, tokTypes, tokContexts, isNewLine, isIdentifierStart, isIdentifierChar} = require("acorn");
const {idents} = require('./util.js');
const arrowjsType = require('./arrowjsType.js');

const proc_tc = {
  p_expr: new TokContext("proc", true),
  p_cmd: new TokContext("cmd"),
  p_do: new TokContext("do{}"),
};

const beforeExpr = {beforeExpr: true};

// new tokens (only valid within specific context)
const proc_tok = {
  parrow: new TokenType('->', beforeExpr),
  tail: new TokenType('-<', beforeExpr),
  tailUnit: new TokenType('-<|', beforeExpr),
  bind: new TokenType('<-', beforeExpr),
  form_start: new TokenType('(|', beforeExpr),
  form_end: new TokenType('|)'),
};

const SCOPE_PROC = 256;


// not exported by acorn
const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
const keywordRelationalOperator = /^in(stanceof)?$/;




function plugin(Parser) {
  return class extends Parser {

    proc_tryParseType() {
      if (this.eat(tokTypes.colon)) {
        return this.proc_parseType();
      }
      return null;
    }

    proc_parseType() {
      let startPos = this.start;
      let type = this.proc_parseTypeAtom();
      if (this.value === '+' && this.eat(tokTypes.plusMin)) {
        let types = [type];
        do {
          types.push(this.proc_parseTypeAtom());
        } while (this.value === '+' && this.eat(tokTypes.plusMin));
        type = new arrowjsType.SumType(types);
      }
      return type;
    }

    proc_parseTypeAtom() {
      let startPos = this.start;
      switch (this.type) {
      case tokTypes.question: {
        this.next();
        if (this.type !== tokTypes.name)
          this.unexpected();
        let name = this.value;
        this.next();
        return new arrowjsType.ParamType(name);
      }

      case tokTypes.name: {
        let name = this.value;
        this.next();
        if (name === "_") return new arrowjsType.TopType();
        return new arrowjsType.NamedType(name);
      }

      case tokTypes.parenL: {
        this.next();
        if (this.eat(tokTypes.parenR))
          this.raiseRecoverable(startPos, "unit type not implememented");

        let elems = [];
        elems.push(this.proc_parseType());
        while (!this.eat(tokTypes.parenR)) {
          this.expect(tokTypes.comma);
          elems.push(this.proc_parseType());
        }
        if (elems.length == 1) {
          return elems[0];
        }
        return new arrowjsType.TupleType(elems);
      }

      case tokTypes.bracketL: {
        this.next();
        let type = this.proc_parseType();
        this.expect(tokTypes.bracketR);
        return new arrowjsType.ArrayType(type);
      }

      case tokTypes.braceL: {
        this.next();
        let taggedTypes = this.proc_parseLabeledTypeSequence();
        this.expect(tokTypes.braceR);
        return new arrowjsType.RecordType(taggedTypes);
      }

      case tokTypes.relational:
        if (this.value === '<') {
          this.next();
          let taggedTypes = this.proc_parseLabeledTypeSequence();
          if (this.value !== '>') this.unexpected();
          this.next();
          return new arrowjsType.TaggedUnionType(taggedTypes);
        }
      }
      this.raiseRecoverable(startPos, "Unrecognized type");
    }

    proc_parseLabeledTypeSequence() {
      let seq = []
      do {
        if (this.type !== tokTypes.name)
          this.unexpected();
        let tag = this.value;
        this.next();
        this.expect(tokTypes.colon);
        let taggedType = this.proc_parseType();
        seq.push({ tag: tag, taggedType: taggedType });
      } while (this.eat(tokTypes.comma));
      return seq;
    }

    // same as isLet from acorn (statement.js)
    // return true if proc follows by (, or ident
    // proc (
    // proc ident
    proc_isProcExpr() {
      if (!this.isContextual("proc")) return false;
      skipWhiteSpace.lastIndex = this.pos;
      let skip = skipWhiteSpace.exec(this.input);
      let next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
      if (nextCh === 40) return true;  // '('
      if (isIdentifierStart(nextCh, true)) {
        let pos = next + 1
        while (isIdentifierChar(this.input.charCodeAt(pos), true)) ++pos
        let ident = this.input.slice(next, pos)
        if (!keywordRelationalOperator.test(ident)) return true;
      }
      return false
    }

    proc_declareName(name, pos) {
      for (let i = this.scopeStack.length - 1; ; --i) {
        let scope = this.scopeStack[i];
        if (scope.lexical.indexOf(name) > -1)
          this.raiseRecoverable(pos, `Identifier '${name}' has already been declared`);
        if (scope.flags & SCOPE_PROC) break;
      }
      this.currentScope().lexical.push(name);
    }


    proc_parseProcExpr() {
      let node = this.startNode();
      this.context.push(proc_tc.p_expr);  // p_expr
      this.next(); // proc
      this.enterScope(SCOPE_PROC);
      let has_paren = this.eat(tokTypes.parenL);
      node.param = this.parseBindingAtom();
      for (let p of idents(node.param))
        this.proc_declareName(p, node.param.start);
      if (has_paren) {
        node.param.typeAnnotation = this.proc_tryParseType();
        this.expect(tokTypes.parenR);
      }
      this.expect(proc_tok.parrow);
      this.context.push(proc_tc.p_cmd);  // p_cmd
      node.command = this.proc_parseCommand();
      this.exitScope();
      this.context.pop();  // p_cmd
      this.context.pop();  // p_expr
      return this.finishNode(node, "ArrowProcedureExpression");
    }

    proc_parseCommand() {
      let node = this.startNode();
      switch (this.type) {
      case tokTypes.parenL:
        this.next();
        node = this.proc_parseCommand();
        this.expect(tokTypes.parenR);
        return node;

      case tokTypes._do: {
        // do notation
        this.next();
        this.expect(tokTypes.braceL);
        this.context.push(proc_tc.p_do);  // p_do
        this.enterScope(0);
        node.statements = [];
        while (!this.eat(tokTypes.braceR)) {
          node.statements.push(this.proc_parseStatement());
          this.semicolon();
        }
        this.exitScope();
        this.context.pop();  // p_do
        if (node.statements.length === 0)
          this.raiseRecoverable(last.start, "do block cannot be empty");
        let last = node.statements[node.statements.length - 1];
        if (last.type !== "CommandStatement")
          this.raiseRecoverable(last.start, "do block must end with a command");
        return this.finishNode(node, "DoCommand");
      }

      case tokTypes._if:
        // if else command
        this.next();
        node.test = this.parseParenExpression();
        node.consequent = this.proc_parseCommand();
        this.semicolon();
        this.expect(tokTypes._else);
        node.alternate = this.proc_parseCommand();
        return this.finishNode(node, "ConditionalCommand");

      case tokTypes._try:
        // try command
        this.next();
        node.command = this.proc_parseCommand();
        this.expect(tokTypes._catch);
        this.expect(tokTypes.parenL);
        node.handlerParam = this.parseBindingAtom();
        this.expect(tokTypes.parenR);
        node.handler = this.proc_parseCommand();
        return this.finishNode(node, "TryCommand");

      case proc_tok.form_start:
        // form command
        this.next();
        if (this.type === tokTypes.parenL)
          node.operator = this.parseParenExpression();
        else
          node.operator = this.parseExprAtom();
        node.arguments = [];
        while (!this.eat(proc_tok.form_end))
          node.arguments.push(this.proc_parseCommand());
        return this.finishNode(node, "FormCommand");

      case tokTypes.braceL: {
        this.parseArrowExpression(node, [], false);
        return this.finishNode(node, "StatementBlockCommand");
      }

      default:
        // let command
        if (this.eatContextual("let")) {
          this.enterScope(0);
          node.id = this.parseBindingAtom();
          node.id.typeAnnotation = this.proc_tryParseType();
          this.expect(tokTypes.eq);
          node.init = this.parseExpression();
          let let_idents = idents(node.id);
          for (let p of let_idents)
            this.proc_declareName(p, node.id.start);
          this.expectContextual("and");
          node.command = this.proc_parseCommand();
          this.exitScope();
          return this.finishNode(node, "LetCommand");
        }

        // arrow application
        let left = this.parseExpression();
        if (this.eat(proc_tok.tail)) {
          node.arrow = left;
          node.input = this.parseMaybeAssign();
          return this.finishNode(node, "ApplicationCommand");
        }
        else if (this.eat(proc_tok.tailUnit)) {
          node.arrow = left;
          node.input = null;
          return this.finishNode(node, "ApplicationCommand");
        }
        else {
          let type = this.proc_tryParseType();
          this.expect(proc_tok.bind);
          node.left = this.toAssignable(left, true);
          node.left.typeAnnotation = type;
          for (let p of idents(node.left))
            this.proc_declareName(p, node.left.start);
          node.right = this.proc_parseCommand();
          if (node.right.type === "BindProcStatement")
            this.unexpected();
          return this.finishNode(node, "BindProcStatement");
        }
      }
      this.unexpected();
    }

    proc_parseStatement() {
      let node = this.startNode();
      // let statement
      if (this.eatContextual("let")) {
        node.id = this.parseBindingAtom();
        node.id.typeAnnotation = this.proc_tryParseType();
        this.expect(tokTypes.eq);
        node.init = this.parseExpression();
        if (this.eatContextual("and")) {
          // limit variable scope for let command
          let cmd = node;
          node = this.startNodeAt(cmd.start, cmd.loc);
          this.enterScope(0);
          for (let p of idents(cmd.id))
            this.proc_declareName(p, cmd.id.start);
          cmd.command = this.proc_parseCommand();
          this.exitScope();
          node.command = this.finishNode(cmd, "LetCommand");
          return this.finishNode(node, "CommandStatement");
        }
        // continue as let statement
        for (let p of idents(node.id))
          this.proc_declareName(p, node.id.start);
        return this.finishNode(node, "LetProcStatement");
      }

      let cmd = this.proc_parseCommand();
      if (cmd.type === "BindProcStatement")
        return cmd;
      node.command = cmd;
      return this.finishNode(node, "CommandStatement");
    }

    // overrides
    parseExprAtom(refShortHandDefaultPos) {
      if (this.proc_isProcExpr()) return this.proc_parseProcExpr();
      return super.parseExprAtom(refShortHandDefaultPos);
    }

    // TODO: context sensitive tokenizing
    getTokenFromCode(code) {
      switch (code) {
      case 40:  // (
        if (this.input.charCodeAt(this.pos + 1) === 124)
          return this.finishOp(proc_tok.form_start, 2);
        break;
      case 124: // |
        if (this.input.charCodeAt(this.pos + 1) === 41)  // )
          return this.finishOp(proc_tok.form_end, 2);
        break;
      case 45:  // -
        if (this.input.charCodeAt(this.pos + 1) === 60) {  // <
          if (this.input.charCodeAt(this.pos + 2) === 124)
            return this.finishOp(proc_tok.tailUnit, 3);   // -<|
          return this.finishOp(proc_tok.tail, 2);        // -<
        }
        else if (this.input.charCodeAt(this.pos + 1) === 62)  // >
          return this.finishOp(proc_tok.parrow, 2);
        break;
      case 60:  // <
        if (this.input.charCodeAt(this.pos + 1) === 45)  // -
          return this.finishOp(proc_tok.bind, 2);
        break;
      }
      return super.getTokenFromCode(code);
    }
  };
}

module.exports = plugin;

