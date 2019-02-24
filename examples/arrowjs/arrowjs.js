var parser=function(){var t=function(t,e,n,s){for(n=n||{},s=t.length;s--;n[t[s]]=e);return n},e=[1,3],n=[1,4],s=[1,5],i=[1,6],r=[1,7],h=[1,8],o=[1,9],a=[2,17],c=[1,12],l=[6,7,13,16,19,21,23,25,30],y=[1,14],u=[1,20],p=[16,21],f=[19,21],g=[1,48],_={trace:function(){},yy:{},symbols_:{error:2,top:3,type:4,annotations:5,EOF:6,"~>":7,IDENT:8,sum_tail:9,_:10,"'":11,"[":12,"]":13,"(":14,types:15,")":16,"<":17,named_types:18,">":19,"{":20,"}":21,"+":22,",":23,":":24,"\\\\":25,bounds:26,throws:27,bound:28,bound_tail:29,"<=":30,$accept:0,$end:1},terminals_:{2:"error",6:"EOF",7:"~>",8:"IDENT",10:"_",11:"'",12:"[",13:"]",14:"(",16:")",17:"<",19:">",20:"{",21:"}",22:"+",23:",",24:":",25:"\\\\",30:"<="},productions_:[0,[3,3],[3,5],[4,1],[4,2],[4,1],[4,2],[4,3],[4,3],[4,3],[4,3],[9,2],[9,3],[15,1],[15,3],[18,3],[18,5],[5,0],[5,6],[26,2],[26,3],[26,4],[27,2],[27,3],[28,3],[29,2],[29,3]],performAction:function(t,e,n,s,i,r,h){var o=r.length-1;switch(i){case 1:return[r[o-2],r[o-1]];case 2:return[r[o-4],r[o-2],r[o-1]];case 3:this.$=new NamedType(r[o]);break;case 4:this.$=new SumType([new NamedType(r[o-1])].concat(r[o]));break;case 5:this.$=new TopType;break;case 6:this.$=new ParamType(r[o]);break;case 7:this.$=new ArrayType(r[o-1]);break;case 8:this.$=new TupleType(r[o-1]);break;case 9:this.$=new TaggedUnionType(m(r[o-1]));break;case 10:this.$=new RecordType(m(r[o-1]));break;case 11:this.$=[new NamedType(r[o])];break;case 12:this.$=[new NamedType(r[o-1])].concat(r[o]);break;case 13:case 25:this.$=[r[o]];break;case 14:this.$=[r[o-2]].concat(r[o]);break;case 15:this.$=[[r[o-2],r[o]]];break;case 16:this.$=[[r[o-4],r[o-2]]].concat(r[o]);break;case 17:this.$=[[],[]];break;case 18:this.$=[r[o-3],r[o-1]];break;case 19:this.$=[];break;case 20:this.$=[r[o-1]];break;case 21:this.$=[r[o-2]].concat(r[o-1]);break;case 22:this.$=[];break;case 23:this.$=r[o-1];break;case 24:this.$=new Constraint(r[o-2],r[o]);break;case 26:this.$=[r[o-1]].concat(r[o])}},table:[{3:1,4:2,8:e,10:n,11:s,12:i,14:r,17:h,20:o},{1:[3]},{5:10,6:a,7:[1,11],25:c},t(l,[2,3],{9:13,22:y}),t(l,[2,5]),{8:[1,15]},{4:16,8:e,10:n,11:s,12:i,14:r,17:h,20:o},{4:18,8:e,10:n,11:s,12:i,14:r,15:17,17:h,20:o},{8:u,18:19},{8:u,18:21},{6:[1,22]},{4:23,8:e,10:n,11:s,12:i,14:r,17:h,20:o},{14:[1,24]},t(l,[2,4]),{8:[1,25]},t(l,[2,6]),{13:[1,26]},{16:[1,27]},t(p,[2,13],{23:[1,28]}),{19:[1,29]},{24:[1,30]},{21:[1,31]},{1:[2,1]},{5:32,6:a,25:c},{20:[1,34],26:33},t(l,[2,11],{9:35,22:y}),t(l,[2,7]),t(l,[2,8]),{4:18,8:e,10:n,11:s,12:i,14:r,15:36,17:h,20:o},t(l,[2,9]),{4:37,8:e,10:n,11:s,12:i,14:r,17:h,20:o},t(l,[2,10]),{6:[1,38]},{23:[1,39]},{4:42,8:e,10:n,11:s,12:i,14:r,17:h,20:o,21:[1,40],28:41},t(l,[2,12]),t(p,[2,14]),t(f,[2,15],{23:[1,43]}),{1:[2,2]},{20:[1,45],27:44},{23:[2,19]},{21:[1,46],23:g,29:47},{30:[1,49]},{8:u,18:50},{16:[1,51]},{4:18,8:e,10:n,11:s,12:i,14:r,15:53,17:h,20:o,21:[1,52]},{23:[2,20]},{21:[1,54]},{4:42,8:e,10:n,11:s,12:i,14:r,17:h,20:o,28:55},{4:56,8:e,10:n,11:s,12:i,14:r,17:h,20:o},t(f,[2,16]),{6:[2,18]},{16:[2,22]},{21:[1,57]},{23:[2,21]},{21:[2,25],23:g,29:58},t([21,23],[2,24]),{16:[2,23]},{21:[2,26]}],defaultActions:{22:[2,1],38:[2,2],40:[2,19],46:[2,20],51:[2,18],52:[2,22],54:[2,21],57:[2,23],58:[2,26]},parseError:function(t,e){if(!e.recoverable){var n=new Error(t);throw n.hash=e,n}this.trace(t)},parse:function(t){var e=this,n=[0],s=[null],i=[],r=this.table,h="",o=0,a=0,c=0,l=i.slice.call(arguments,1),y=Object.create(this.lexer),u={yy:{}};for(var p in this.yy)Object.prototype.hasOwnProperty.call(this.yy,p)&&(u.yy[p]=this.yy[p]);y.setInput(t,u.yy),u.yy.lexer=y,u.yy.parser=this,void 0===y.yylloc&&(y.yylloc={});var f=y.yylloc;i.push(f);var g=y.options&&y.options.ranges;"function"==typeof u.yy.parseError?this.parseError=u.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var _,m,d,k,b,x,v,w,$,E=function(){var t;return"number"!=typeof(t=y.lex()||1)&&(t=e.symbols_[t]||t),t},S={};;){if(d=n[n.length-1],this.defaultActions[d]?k=this.defaultActions[d]:(null==_&&(_=E()),k=r[d]&&r[d][_]),void 0===k||!k.length||!k[0]){var I="";for(x in $=[],r[d])this.terminals_[x]&&2<x&&$.push("'"+this.terminals_[x]+"'");I=y.showPosition?"Parse error on line "+(o+1)+":\n"+y.showPosition()+"\nExpecting "+$.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==_?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(I,{text:y.match,token:this.terminals_[_]||_,line:y.yylineno,loc:f,expected:$})}if(k[0]instanceof Array&&1<k.length)throw new Error("Parse Error: multiple actions possible at state: "+d+", token: "+_);switch(k[0]){case 1:n.push(_),s.push(y.yytext),i.push(y.yylloc),n.push(k[1]),_=null,m?(_=m,m=null):(a=y.yyleng,h=y.yytext,o=y.yylineno,f=y.yylloc,0<c&&c--);break;case 2:if(v=this.productions_[k[1]][1],S.$=s[s.length-v],S._$={first_line:i[i.length-(v||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(v||1)].first_column,last_column:i[i.length-1].last_column},g&&(S._$.range=[i[i.length-(v||1)].range[0],i[i.length-1].range[1]]),void 0!==(b=this.performAction.apply(S,[h,a,o,u.yy,k[1],s,i].concat(l))))return b;v&&(n=n.slice(0,-1*v*2),s=s.slice(0,-1*v),i=i.slice(0,-1*v)),n.push(this.productions_[k[1]][0]),s.push(S.$),i.push(S._$),w=r[n[n.length-2]][n[n.length-1]],n.push(w);break;case 3:return!0}}return!0}};function m(t){var e={};return t.forEach(function(t){if(t[0]in e)throw new Error("Duplicate key in record type.");e[t[0]]=t[1]}),e}var d={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===s.length?this.yylloc.first_column:0)+s[s.length-n.length].length-n[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(20<t.length?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(20<t.length?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},test_match:function(t,e){var n,s,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),(s=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=s.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],n=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var r in i)this[r]=i[r];return!1}return!1},next:function(){if(this.done)return this.EOF;var t,e,n,s;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),r=0;r<i.length;r++)if((n=this._input.match(this.rules[i[r]]))&&(!e||n[0].length>e[0].length)){if(e=n,s=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(n,i[r])))return t;if(this._backtrack){e=!1;continue}return!1}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,i[s]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return 0<this.conditionStack.length-1?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return 0<=(t=this.conditionStack.length-1-Math.abs(t||0))?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(t,e,n,s){switch(n){case 0:return 7;case 1:return 30;case 2:return 25;case 3:return 10;case 4:return 14;case 5:return 16;case 6:return 17;case 7:return 19;case 8:return 12;case 9:return 13;case 10:return 20;case 11:return 21;case 12:return 23;case 13:return 24;case 14:return 22;case 15:return"'";case 16:return 8;case 17:break;case 18:return 6;case 19:return"INVALID"}},rules:[/^(?:~>)/,/^(?:<=)/,/^(?:\\)/,/^(?:_\b)/,/^(?:\()/,/^(?:\))/,/^(?:<)/,/^(?:>)/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:,)/,/^(?::)/,/^(?:\+)/,/^(?:')/,/^(?:[_a-zA-Z][_a-zA-Z0-9]*)/,/^(?:\s+)/,/^(?:$)/,/^(?:.)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],inclusive:!0}}};function k(){this.yy={}}return _.lexer=d,new((k.prototype=_).Parser=k)}();"undefined"!=typeof require&&"undefined"!=typeof exports&&(exports.parser=parser,exports.Parser=parser.Parser,exports.parse=function(){return parser.parse.apply(parser,arguments)},exports.main=function(t){t[1]||(console.log("Usage: "+t[0]+" FILE"),process.exit(1));var e=require("fs").readFileSync(require("path").normalize(t[1]),"utf8");return exports.parser.parse(e)},"undefined"!=typeof module&&require.main===module&&exports.main(process.argv.slice(1)));
let numarrows = 0;
let numannotations = 0;
let annotationParseTime = 0;

let typechecks = 0;
let typecheckTime = 0;

let started;
let typecheck = true;
let benchmark = false;
let displaychecks = false;

function _setTypecheck(shouldTypecheck) {
  typecheck = shouldTypecheck;
}

function _benchmarkStart(shouldTypecheck) {
    benchmark = true;
    typecheck = shouldTypecheck;

    started = window.performance.now();
}

function _benchmarkResultsOrRun(/* ...arrows */) {
    if (benchmark) {
        let elapsed = window.performance.now() - started;

        console.log("Arrows: " + numarrows);
        console.log("Num annotations: " + numannotations);
        console.log("Composition time: " + elapsed + " (" + annotationParseTime + ")");
    } else {
        for (let i = 0; i < arguments.length; i++) {
            arguments[i].run();
        }
    }
}

function _construct(f) {
    if (typecheck) {
        return f();
    } else {
        return new ArrowType(new TopType(), new TopType());
    }
}

function _check(type, value) {
    if (typecheck) {
        let start = window.performance.now();

        type.check(value);

        let elapsed = window.performance.now() - start;
        typechecks++;
        typecheckTime += elapsed;

        if (displaychecks) {
            console.log(typechecks + " checks, " + typecheckTime + "ms");
        }
    }
}

Array.create = function(length, value) {
    let arr = [];
    while (--length >= 0) {
        arr.push(value);
    }

    return arr;
};

Array.copy = function(array) {
    return [].slice.call(array);
};

Array.prototype.unique = function() {
    return this.filter((v, i, s) => s.indexOf(v) === i);
};

Function.prototype.lift = function() {
    return new LiftedArrow(this);
};

Number.prototype.lift = function() {
    let value = this.valueOf();

    return new LiftedArrow(function() {
        /* @arrow :: _ ~> Number */
        return value;
    });
};

Boolean.prototype.lift = function() {
    let value = this.valueOf();

    return new LiftedArrow(function() {
        /* @arrow : _ ~> Bool */
        return value;
    });
};

class Arrow {
    constructor(type) {
        numarrows++;
        this.type = type;
    }

    call(x, p, k, h) {
        throw new Error("Call undefined");
    }

    equals(that) {
        throw new Error("Equals undefined");
    }

    isAsync() {
        return false;
    }

    run() {
        if (!(this.type.arg instanceof TopType)) {
            throw new Error("Cannot run an arrow that takes arguments");
        }

        let p = new Progress(true);
        this.call(null, p, () => {}, err => { throw err; });
        return p;
    }

    // Combinator constructors

    noemit() {
        return Arrow.noemit(this);
    }

    seq(/* ...arrows */) {
        return Arrow.seq([this].concat(Array.copy(arguments)));
    }

    any(/* ...arrows */) {
        return Arrow.any([this].concat(Array.copy(arguments)));
    }

    all(/* ...arrows */) {
        return Arrow.all([this].concat(Array.copy(arguments)));
    }

    try(success, failure) {
        return Arrow.try(this, success, failure);
    }

    // Convenience API

    named(name) {
        return new NamedArrow(name, this);
    }

    lift() {
        return this;
    }

    wait(duration) {
        return this.seq(new DelayArrow(duration));
    }

    after(duration) {
        return new DelayArrow(duration).seq(this);
    }

    triggeredBy(selector, event) {
        return new ElemArrow(selector).seq(new EventArrow(event)).remember().seq(this);
    }

    then(success, failure) {
        if (failure === undefined) {
            return this.seq(success);
        } else {
            return this.try(success, failure);
        }
    }

    catch(failure) {
        return this.then(Arrow.id(), failure);
    }

    // Data Routing

    split(n) {
        return this.seq(new SplitArrow(n));
    }

    nth(n) {
        return this.seq(new NthArrow(n));
    }

    fanout(/* ...arrows */) {
        return Arrow.fanout([this].concat(Array.copy(arguments)));
    }

    tap(/* ...functions */) {
        let sec = getNonNullElems(Array.copy(arguments)).map(a => a.lift());
        let all = [this].concat(sec);
        let rem = [this].concat(sec.map(a => a.remember()));

        return new NamedArrow("tap(" + all.map(a => a.toString()).join(", " ) + ")", Arrow.seq(rem));
    }

    on(name, handler) {
        return new NamedArrow("on(" + name + ", {0})", this.seq(new SplitArrow(2), Arrow.id().all(new EventArrow(name)), handler), [handler]);
    }

    remember() {
        return new NamedArrow("remember({0})", this.carry().nth(1), [this]);
    }

    carry() {
        return new NamedArrow("carry({0})", new SplitArrow(2).seq(Arrow.id().all(this)), [this]);
    }

    // Repeating

    repeat() {
        return new NamedArrow("repeat({0})", Arrow.fix(a => this.wait(0).seq(Arrow.try(Arrow.repeatTail(), a, Arrow.id()))), [this]);
    }

    times(n) {
        let init = new LiftedArrow(function() {
            /* @arrow :: _ ~> Number */
            return n;
        });

        let rep = new LiftedArrow((n, x, y) => {
            /* @arrow :: (Number, 'a, 'b) ~> <loop: (Number, 'a, 'a), halt: 'b> */
            return n > 1 ? Arrow.loop([n - 1, x, x]) : Arrow.halt(y);
        });

        let arr = Arrow.seq([
            Arrow.fanout([
                init.lift(),
                Arrow.id(),
                Arrow.id()
            ]),
            Arrow.all([
                Arrow.id(),
                Arrow.id(),
                this
            ]).seq(rep).repeat()
        ]);

        return new NamedArrow("times(" + n + ", {0})", arr, [this]);
    }

    forever() {
        return new NamedArrow("forever({0})", this.seq(Arrow.reptop()).repeat(), [this]);
    }

    whileTrue() {
        return new NamedArrow("whileTrue({0})", this.carry().seq(Arrow.repcond()).repeat(), [this]);
    }
}

// Unary combinators
Arrow.noemit = arrow => new NoEmitCombinator(arrow);

// N-ary combinators
Arrow.seq    = arrows    => new SeqCombinator(arrows);
Arrow.any    = arrows    => new AnyCombinator(arrows);
Arrow.all    = arrows    => new AllCombinator(arrows);
Arrow.try    = (a, s, f) => new TryCombinator(a, s, f);
Arrow.fanout = arrows    => {
    arrows = getNonNullArrows(arrows);
    let result = new SplitArrow(arrows.length).seq(Arrow.all(arrows));
    return new NamedArrow("fanout(" + arrows.map(a => a.toString()).join(", " ) + ")", result, arrows);
};

// Convenience
Arrow.repeat = a          => a.repeat();
Arrow.bind   = (event, a) => new NamedArrow("bind(" + event + ", {0})", Arrow.seq([new SplitArrow(2), Arrow.id().all(new EventArrow(event)), a]), [a]);
Arrow.catch  = (a, f)     => Arrow.try(a, Arrow.id(), f);
Arrow.db     = (f, db)    => new QueryArrow(f, db);

// Built-ins
Arrow.id  = () => new LiftedArrow(x => {
    /* @arrow :: 'a ~> 'a */
    return x;
}).named("id");

Arrow.log = () => new LiftedArrow(x => {
    /* @arrow :: 'a ~> 'a */
    console.log(x);
    return x;
}).named("log");

Arrow.throwFalse = () => new LiftedArrow(x => {
    /* @arrow :: Bool ~> _ \ ({}, {Bool}) */
    if (x) {
        throw x;
    }
}).named("throwFalse");

// Repetition helpers
Arrow.reptop     = () => new LiftedArrow(x => {
    /* @arrow :: _ ~> <loop: _, halt: _> */
    return Arrow.loop(null);
});

Arrow.repcond    = () => new LiftedArrow((x, f) =>{
    /* @arrow :: ('a, Bool) ~> <loop: 'a, halt: _> */
    return f ? Arrow.loop(x) : Arrow.halt(null);
});

Arrow.repeatTail = () => new LiftedArrow(x => {
    /* @arrow :: <loop: 'a, halt: 'b> ~> 'a \ ({}, {'b}) */
    if (x.hasTag("loop")) {
        return x.value();
    } else {
        throw x.value();
    }
});

class TaggedValue {
    constructor(tag, val) {
        this.tag = tag;
        this.val = val;
    }

    hasTag(tag) {
        return tag == this.tag;
    }

    value() {
        return this.val;
    }
}

// Utility Constructors
Arrow.loop = x => new TaggedValue("loop", x);
Arrow.halt = x => new TaggedValue("halt", x);

let _cancelerId = 0;

class Progress {
    constructor(canEmit) {
        this.canEmit = canEmit;
        this.cancelers = {};
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    addCanceler(canceler) {
        let id = _cancelerId++;
        this.cancelers[id] = canceler;
        return id;
    }

    advance(cancelerId) {
        if (cancelerId != null) {
            this.cancelers[cancelerId] = null;
        }

        while (this.observers.length > 0) {
            let observer = this.observers.pop();

            if (this.canEmit) {
                observer();
            }
        }
    }

    cancel() {
        for (let id in this.cancelers) {
            if (this.cancelers[id] != null) {
                this.cancelers[id]();
            }
        }

        this.cancelers = {};
    }
}

let annotationCache = {};

class LiftedArrow extends Arrow {
    constructor(f, notrace) {
        if (!(f instanceof Function)) {
            throw new Error("Cannot lift non-function");
        }

        super(_construct(() => {
            let start = window.performance.now();

            let s = f.toString();
            let i = s.indexOf("/*");
            let j = s.indexOf("*/", i + 1);
            let c = s.substring(i + 2, j);
            
            let parsed = annotationCache[c];
            
            if (annotationCache[c] === undefined) {
                let comment;
                
                try {
                    comment = c.match(/\@arrow :: (.*)\n?/)[1];
                } catch (err) {
                    if (typecheck) {
                        console.warn("Function being lifted does not contain an @arrow annotation");
                    }

                    comment = "_ ~> _";
                }

                try {
                    // jison exports the parser name like this
                    parsed = parser.parse(comment);
                } catch (err) {
                    throw new ComposeError(`Function being lifted does not contain a parseable @arrow annotation.\n${err.message}\n`);
                }

                annotationCache[c] = parsed;
            }

            let elapsed = window.performance.now() - start;
            numannotations++;
            annotationParseTime += elapsed;

            let arg = parsed[0];
            let out = parsed[1];
            let ncs = new ConstraintSet([]).addAll(parsed[2][0]);

            return new ArrowType(arg, out, ncs, parsed[2][1]).sanitize();
        }));

        this.f = f;
    }

    toString() {
        return "lift :: " + this.type.toString();
    }

    call(x, p, k, h) {
        let result;

        try {
            // If the function has more than one parameter and we have
            // an array argument, spread the elements. Else, just call
            // the function with a single argument.
            
            if (x && x.constructor === Array && this.f.length > 1) {
                result = this.f.apply(null, x);
            } else {
                result = this.f(x);
            }

            _check(this.type.out, result);
        } catch (err) {
            return h(err);
        }

        k(result);
    }

    equals(that) {
        return that instanceof LiftedArrow && this.f === that.f;
    }
}

class ElemArrow extends LiftedArrow {
    constructor(selector) {
        super(() => {
            /* @arrow :: _ ~> Elem */
            return $(selector);
        });

        this.selector = selector;
    }

    toString() {
        return "elem :: " + this.type.toString();
    }

    equals(that) {
        return that instanceof ElemArrow && this.selector === that.selector;
    }
}

//
// Simple Asynchronous Arrow Implementation
//

class SimpleAsyncArrow extends Arrow {
    isAsync() {
        return true;
    }
}

// Simple Asynchronous Arrow that takes in a config object

class SimpleConfigBasedAsyncArrow extends SimpleAsyncArrow {
    constructor(f, errorType) {
        if (!(f instanceof Function)) {
            throw new Error("Cannot use non-function as configuration value");
        }

        super(_construct(() => {
            let start = window.performance.now();

            let s = f.toString();
            let i = s.indexOf("/*");
            let j = s.indexOf("*/", i + 1);
            let c = s.substring(i + 2, j);

            let ncs = new ConstraintSet([]);
            let err = [new NamedType(errorType)];

            let conf;
            let resp;

            if (annotationCache[c] !== undefined) {
                conf = annotationCache[c][0];
                resp = annotationCache[c][1];
            } else {
                try {
                    // jison exports the parser name like this
                    conf = parser.parse(c.match(/\@conf :: (.*)\n?/)[1]);

                    ncs = ncs.addAll(conf[1][0]);
                    err = err.concat(conf[1][1]);
                } catch (err) {
                    throw new ComposeError(`Config does not contain a parseable @conf annotation.\n${err.message}\n`);
                }

                try {
                    // jison exports the parser name like this
                    resp = parser.parse(c.match(/\@resp :: (.*)\n?/)[1]);

                    ncs = ncs.addAll(resp[1][0]);
                    err = err.concat(resp[1][1]);
                } catch (err) {
                    throw new ComposeError(`Config does not contain a parseable @resp annotation.\n${err.message}\n`);
                }

                annotationCache[c] = [conf, resp];
            }

            let elapsed = window.performance.now() - start;
            numannotations++;
            annotationParseTime += elapsed;

            return new ArrowType(conf[0], resp[0], ncs, err).sanitize();
        }));

        this.c = f;
    }
}

class AjaxArrow extends SimpleConfigBasedAsyncArrow {
    constructor(f) {
        super(f, "AjaxError");
    }

    toString() {
        return "ajax :: " + this.type.toString();
    }

    call(x, p, k, h) {
        // If the function has more than one parameter and we have
        // an array argument, spread the elements. Else, just call
        // the function with a single argument.

        // TODO - wrap this in try

        let conf;
        if (x && x.constructor === Array && this.c.length > 1) {
            conf = this.c.apply(null, x);
        } else {
            conf = this.c(x);
        }

        let abort = false;

        const cancel = () => {
            abort = true;
        };

        const fail = h;
        const succ = x => {
            _check(this.type.out, x);
            k(x);
        };

        $.ajax($.extend(conf, {
            success: (x, status, xhr) => { if (!abort) { p.advance(cancelerId); succ(x); } },
            error  : (xhr, status, x) => { if (!abort) { p.advance(cancelerId); fail(x); } },
        }));

        let cancelerId = p.addCanceler(cancel);
    }

    equals(that) {
        // TODO - deep comparison of objects
        return that instanceof AjaxArrow && this.c === that.c;
    }
}

class QueryArrow extends SimpleConfigBasedAsyncArrow {
    constructor(f, db) {
        super(f, "QueryError");
        this.db = db;
    }

    toString() {
        return "query :: " + this.type.toString();
    }

    call(x, p, k, h) {
        let conf;
        if (x && x.constructor === Array && this.c.length > 1) {
            conf = this.c.apply(null, x);
        } else {
            conf = this.c(x);
        }

        let abort = false;

        const cancel = () => {
            abort = true;
        };

        const fail = h;
        const succ = x => {
            _check(this.type.out, x);
            k(x);
        };

        this.db.query(conf.query, conf.param, function (err, rows) {
            if (err) {
                if (!abort) {
                    p.advance(cancelerId);
                    fail(err);
                }
            } else {
                if (!abort) {
                    p.advance(cancelerId);
                    succ(rows);
                }
            }
        });

        let cancelerId = p.addCanceler(cancel);
    }

    equals(that) {
        // TODO - deep comparison of objects
        return that instanceof QueryArrow && this.c === that.c;
    }
}

class EventArrow extends SimpleAsyncArrow {
    constructor(name) {
        // Elem ~> Event
        super(_construct(() => new ArrowType(new NamedType("Elem"), new NamedType("Event"))));
        this.name = name;
    }

    toString() {
        return "event(" + this.name + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        let abort = false;

        const cancel = () => {
            abort = true;
            x.off(this.name, runner);
        };

        const runner = ev => {
            if (!abort) {
                cancel();
                p.advance(cancelerId);
                k(ev);
            }
        };

        x.on(this.name, runner);
        let cancelerId = p.addCanceler(cancel);
    }

    equals(that) {
        return that instanceof EventArrow && this.name === that.name;
    }
}

class DynamicDelayArrow extends SimpleAsyncArrow {
    constructor() {
        // Number ~> _
        super(_construct(() => {
            return new ArrowType(new NamedType("Number"), new TopType());
        }));
    }

    toString() {
        return "delay :: " + this.type.toString();
    }

    call(x, p, k, h) {
        const cancel = () => clearTimeout(timer);
        const runner = () => {
            p.advance(cancelerId);
            k();
        };

        let timer = setTimeout(runner, x);
        let cancelerId = p.addCanceler(cancel);
    }

    equals(that) {
        return that instanceof DynamicDelayArrow;
    }
}

class DelayArrow extends SimpleAsyncArrow {
    constructor(duration) {
        // "a ~> "a
        super(_construct(() => {
            let alpha = ParamType.fresh();
            return new ArrowType(alpha, alpha);
        }));

        this.duration = duration;
    }

    toString() {
        return "delay(" + this.duration + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        const cancel = () => clearTimeout(timer);
        const runner = () => {
            p.advance(cancelerId);
            k(x);
        };

        let timer = setTimeout(runner, this.duration);
        let cancelerId = p.addCanceler(cancel);
    }

    equals(that) {
        return that instanceof Delay && this.duration === that.duration;
    }
}

//
// Simple (Generalized) Arrows
//

class SplitArrow extends Arrow {
    constructor(n) {
        super(_construct(() => {
            let arg = ParamType.fresh();
            let out = Array.create(n, arg);

            return new ArrowType(arg, new TupleType(out));
        }));

        this.n = n;
    }

    toString() {
        return "split(" + this.n + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        // TODO - clone values
        k(Array.create(this.n, x));
    }

    equals(that) {
        return that instanceof SplitArrow && this.n === that.n;
    }
}

class NthArrow extends Arrow {
    constructor(n) {
        super(_construct(() => {
            let arg = Array.create(n).map(() => ParamType.fresh());
            let out = arg[n - 1];

            return new ArrowType(new TupleType(arg), out);
        }));

        this.n = n;
    }

    toString() {
        return "nth(" + this.n + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        k(x[this.n - 1]);
    }

    equals(that) {
        return that instanceof NthArrow && this.n === that.n;
    }
}

class ComposeError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    toString() {
        return this.message;
    }
}

class Combinator extends Arrow {
    constructor(type, arrows) {
        super(type);
        this.arrows = arrows;
    }

    toString() {
        return this.constructor.name + "(" + this.arrows.map(a => a.toString()).join(", ") + ") :: " + this.type.toString();
    }

    isAsync() {
        return this.arrows.some(a => a.isAsync());
    }

    equals(that) {
        if (this.constructor === that.constructor) {
            return this.arrows.length === that.arrows.length && this.arrows.every((a, i) => a.equals(that.arrows[i]));
        }

        return false;
    }
}

class NamedArrow extends Combinator {
    constructor(name, a, args) {
        ensureArrow(a);

        super(_construct(() => {
            return a.type;
        }), [a]);

        this.name = format(name, (args || []).map(a => a.toString()));
    }

    toString() {
        return this.name + " :: " + this.arrows[0].type.toString();
    }

    call(x, p, k, h) {
        this.arrows[0].call(x, p, k, h);
    }

    isAsync() {
        return this.arrows[0].isAsync();
    }
}

class NoEmitCombinator extends Combinator {
    constructor(a) {
        ensureArrow(a);
        
        super(_construct(() => {
            return a.type;
        }), [a]);
    }

    toString() {
        return "noemit(" + this.arrows[0].toString() + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        let quiet = new Progress(false);
        p.addCanceler(() => quiet.cancel());

        this.arrows[0].call(x, quiet, z => {
            p.advance();

            setTimeout(() => {
                k(z);
            }, 0);
        }, h);
    }

    isAsync() {
        return true;
    }
}

class SeqCombinator extends Combinator {
    constructor(arrows) {
        arrows = getNonNullArrows(arrows);

        super(_construct(() => {
            let sty = sanitizeTypes(arrows);

            try {
                let len = sty.length - 1;

                let arg = sty[0].arg;
                let out = sty[len].out;
                let ncs = new ConstraintSet([]);
                let err = sty[0].errors;

                sty.forEach((t, i) => {
                    ncs = ncs.concat(t.constraints);
                    err = err.concat(t.errors);

                    if (i != 0) {
                        ncs = ncs.add(new Constraint(sty[i - 1].out, t.arg));
                    }
                });

                return new ArrowType(arg, out, ncs, err);
            } catch (err) {
                let message;
                let location = getLocation(err.stack);

                if (location) {
                    message = "Unable to seq arrows at: " + location;
                } else {
                    message = "Unable to seq arrows";
                }

                throw new ComposeError(message + "\n\tInput => Seq(" + sty.join(", ") + ")\n\tError => " + err);
            }
        }), arrows);
    }

    toString() {
        return "seq(" + this.arrows.map(a => a.toString()).join(", ") + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {

        let i = 0;
        let arrows = this.arrows;
        let last = arrows.length - 1;
        const rec = (y) => {
            if (i < last) {
                arrows[i++].call(y, p, rec, h);
            } else {
                arrows[i].call(y, p, k, h);
            }
        };

        rec(x);
    }
}

class AllCombinator extends Combinator {
    constructor(arrows) {
        arrows = getNonNullArrows(arrows);

        super(_construct(() => {
            let sty = sanitizeTypes(arrows);

            try {
                let arg = [];
                let out = [];
                let ncs = new ConstraintSet([]);
                let err = [];

                sty.forEach((t, i) => {
                    arg.push(t.arg);
                    out.push(t.out);

                    ncs = ncs.concat(t.constraints);
                    err = err.concat(t.errors);
                });

                return new ArrowType(new TupleType(arg), new TupleType(out), ncs, err);
            } catch (err) {
                let message;
                let location = getLocation(err.stack);

                if (location) {
                    message = "Unable to all arrows at: " + location;
                } else {
                    message = "Unable to all arrows";
                }

                throw new ComposeError(message + "\n\tInput => All(" + sty.join(", ") + ")\n\tError => " + err);
            }
        }), arrows);
    }

    toString() {
        return "all(" + this.arrows.map(a => a.toString()).join(", ") + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        let numFinished = 0;
        let callResults = this.arrows.map(x => null);

        this.arrows.forEach((a, i) => {
            a.call(x[i], p, y => {
                callResults[i] = y;

                // Once results array is finished, continue
                if (++numFinished == this.arrows.length) {
                    k(callResults);
                }
            }, h);
        });
    }
}

class AnyCombinator extends Combinator {
    constructor(arrows) {
        arrows = getNonNullArrows(arrows);

        super(_construct(() => {
            let sty = sanitizeTypes(arrows);

            try {
                let arg = ParamType.fresh();
                let out = ParamType.fresh();
                let ncs = new ConstraintSet([]);
                let err = [];

                sty.forEach((t, i) => {
                    ncs = ncs.concat(t.constraints);
                    err = err.concat(t.errors);

                    ncs = ncs.add(new Constraint(arg, t.arg));
                    ncs = ncs.add(new Constraint(t.out, out));
                });

                return new ArrowType(arg, out, ncs, err);
            } catch (err) {
                let message;
                let location = getLocation(err.stack);

                if (location) {
                    message = "Unable to any arrows at: " + location;
                } else {
                    message = "Unable to any arrows";
                }

                throw new ComposeError(message + "\n\tInput => Any(" + sty.join(", ") + ")\n\tError => " + err);
            }
        }), arrows);
    }

    toString() {
        return "any(" + this.arrows.map(a => a.toString()).join(", ") + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        // Note: This must be done at execution time instead of construction
        // time because a recursive arrow may present itself as falsely async.

        if (!this.arrows.every(a => a.isAsync())) {
            throw new Error("Any combinator requires asynchronous arrow arguments");
        }

        let progress = this.arrows.map(() => new Progress(true));

        // If combinator is canceled, cancel all children
        p.addCanceler(() => progress.forEach(p => p.cancel()));

        this.arrows.forEach((a, i) => {
            // When arrow[i] progresses, cancel others
            progress[i].addObserver(() => {
                p.advance();

                progress.forEach((p, j) => {
                    if (j != i) {
                        p.cancel();
                    }
                });
            });

            // TODO - clone value
            // Kick off execution synchronously
            a.call(x, progress[i], k, h);
        });
    }

    isAsync() {
        return true;
    }
}

class TryCombinator extends Combinator {
    constructor(a, s, f) {
        super(_construct(() => {
            let sta = sanitizeTypes([a])[0];
            let sts = sanitizeTypes([s])[0];
            let stf = sanitizeTypes([f])[0];

            try {
                let arg = sta.arg;
                let out = ParamType.fresh();
                let ncs = new ConstraintSet([]);
                let err = [];

                ncs = ncs.concat(sta.constraints);
                ncs = ncs.concat(sts.constraints);
                ncs = ncs.concat(stf.constraints);
                ncs = ncs.add(new Constraint(sta.out, sts.arg));
                ncs = ncs.add(new Constraint(sts.out, out));
                ncs = ncs.add(new Constraint(stf.out, out));

                sta.errors.forEach((e, i) => {
                    ncs = ncs.add(new Constraint(e, stf.arg));
                });

                err = err.concat(sts.errors);
                err = err.concat(stf.errors);

                return new ArrowType(arg, out, ncs, err);
            } catch (err) {
                let message;
                let location = getLocation(err.stack);

                if (location) {
                    message = "Unable to try arrows at: " + location;
                } else {
                    message = "Unable to try arrows";
                }

                throw new ComposeError(message + "\n\tInput => Try(" + [sta, sts, stf].join(", ") + ")\n\tError => " + err);
            }
        }), [a, s, f]);
    }

    toString() {
        return "try(" + this.arrows.map(a => a.toString()).join(", ") + ") :: " + this.type.toString();
    }

    call(x, p, k, h) {
        // Invoke original error callback "h" if either
        // callback creates an error value. This allows
        // nesting of error callbacks.

        let branch = new Progress(true);
        p.addCanceler(() => branch.cancel());
        branch.addObserver(() => p.advance());

        this.arrows[0].call(x, branch,
            y => this.arrows[1].call(y, p, k, h),
            z => {
                branch.cancel();
                this.arrows[2].call(z, p, k, h);
            }
        );
    }

    isAsync() {
        return (this.arrows[0].isAsync() || this.arrows[1].isAsync()) && this.arrows[2].isAsync();
    }
}

//
// Fix-Point Combinator
//

Arrow.fix = function(ctor) {
    let arg = ParamType.fresh(true);
    let out = ParamType.fresh(true);

    let p = new ProxyArrow(arg, out);
    let a = ctor(p);
    p.freeze(a);

    if (!(a instanceof Arrow)) {
        throw new Error("Fix constructor must return an arrow");
    }

    let t = a.type.toString();

    let map = {};
    descendants(arg).forEach(d => map[d.id] = arg);
    descendants(out).forEach(d => map[d.id] = out);

    arg.noreduce = false;
    out.noreduce = false;
    a.type.substitute(map);

    a.type.constraints = a.type.constraints.add(new Constraint(a.type.arg, arg));
    a.type.constraints = a.type.constraints.add(new Constraint(arg, a.type.arg));
    a.type.constraints = a.type.constraints.add(new Constraint(a.type.out, out));
    a.type.constraints = a.type.constraints.add(new Constraint(out, a.type.out));

    try {
        a.type.resolve();
    } catch (err) {
        let message;
        let location = getLocation(err.stack);

        if (location) {
            message = "Unable to fix arrow at: " + location;
        } else {
            message = "Unable to fix arrow";
        }

        throw new ComposeError(message + "\n\tInput => Fix(" + t + ")\n\tError => " + err);
    }

    return a;
};

class ProxyArrow extends Arrow {
    constructor(arg, out) {
        super(_construct(() => {
            return new ArrowType(arg, out);
        }));

        this.arrow = null;
    }

    toString() {
        if (this.arrow != null) {
            return "omega :: " + this.arrow.type.toString();
        }

        return "omega :: ???";
    }

    freeze(arrow) {
        this.arrow = arrow;
    }

    call(x, p, k, h) {
        return this.ensureFrozen(a => a.call(x, p, k, h));
    }

    equals(that) {
        return this.ensureFrozen(a => a.equals(that));
    }

    isAsync() {
        if (this._isAsync === undefined) {
          this._isAsync = false;
          this._isAsync = this.ensureFrozen(a => a.isAsync());
        }
        return this.ensureFrozen(a => a.isAsync());
    }

    ensureFrozen(f) {
        if (this.arrow != null) {
            return f(this.arrow);
        }

        throw new Error("Proxy not frozen");
    }
}

function getNonNullArrows(arrows) {
    let filtered = getNonNullElems(arrows);
    filtered.forEach(ensureArrow);
    return filtered;
}

function getNonNullElems(arrows) {
    let filtered = arrows.filter(a => a != null);
    if (filtered.length == 0) {
        throw new ComposeError("Combinator contains no non-null arguments.");
    }

    return filtered
}

function ensureArrow(arrow) {
    if (!(arrow instanceof Arrow)) {
        throw new ComposeError(`Passed non-arrow (${JSON.stringify(arrow)}) to combinator`);
    }
}

function descendants(param) {
    let children = [param];
    for (let child of param.children) {
        for (let descendant of descendants(child)) {
            children.push(descendant);
        }
    }

    return children;
}

function format(format, args) {
    return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
}

class Type {
    equals(that) {
        throw new Error("Equals undefined");
    }

    check(value) {
        throw new TypeClash(this, value);
    }

    isParam() {
        return false;
    }

    isConcrete() {
        return true;
    }

    harvest() {
        return [];
    }

    substitute(map) {
        return this;
    }

    sanitize(map) {
        return this;
    }
}

let uniqid = 0;

class ParamType extends Type {
    static fresh(noreduce) {
        return new ParamType(++uniqid, noreduce || false);
    }

    constructor(id, noreduce) {
        super();
        this.id = id;
        this.noreduce = noreduce;
        this.children = [];
    }

    equals(that) {
        return that instanceof ParamType && this.id === that.id;
    }

    toString() {
        return "'" + this.id;
    }

    check(value) {
    }

    isParam() {
        return true;
    }

    isConcrete() {
        return false;
    }

    harvest() {
        return [this];
    }

    substitute(map) {
        return this.id in map ? map[this.id] : this;
    }

    sanitize(map) {
        if (!(this.id in map)) {
            let p = ParamType.fresh(this.noreduce);
            this.children.push(p);
            map[this.id] = p;
        }

        return map[this.id];
    }
}

class TopType extends Type {
    equals(that) {
        return that instanceof TopType;
    }

    toString() {
        return "_";
    }

    check(value) {
    }
}

let runtimeCheckers = {
    "Bool"  : v => v === true || v === false,
    "Number": v => typeof v == "number",
    "String": v => typeof v == "string",
    "Elem"  : v => v instanceof jQuery,
    "Event" : v => false, // TODO
};

function checkNamedType(name, value) {
    let checker = runtimeCheckers[name];

    if (checker) {
        return checker(value);
    } else {
        throw new Error(`Named type "${name}" does not have an associated checker.`);
    }
}

class NamedType extends Type {
    constructor(name) {
        super();
        this.name = name;
    }

    equals(that) {
        return that instanceof NamedType && this.name === that.name;
    }

    toString() {
        return this.name;
    }

    check(value) {
        if (!checkNamedType(this.name, value)) {
            super.check(value);
        }
    }
}

class SumType extends Type {
    constructor(names) {
        super();
        this.names = names.unique().sort();
    }

    equals(that) {
        if (that instanceof SumType) {
            return this.names.length === that.names.length && this.names.every((n, i) => n === that.names[i]);
        }

        return false;
    }

    toString() {
        return this.names.join("+");
    }

    check(value) {
        if (!this.names.some(name => checkNamedType(name, value))) {
            super.check(value);
        }
    }
}

class TaggedUnionType extends Type {
    constructor(map) {
        super();
        this.vals = map;
        this.keys = Object.keys(map).sort();
    }

    equals(that) {
        if (that instanceof TaggedUnionType) {
            return this.keys.length === that.keys.length && this.keys.every(k => this.vals[k].equals(that.vals[k]));
        }

        return false;
    }

    toString() {
        return "<" + this.keys.map(k => k + ": " + this.vals[k].toString()).join(", ") + ">";
    }

    check(value) {
        try {
            for (let key in this.keys) {
                if (value.hasTag(key)) {
                    return this.vals[key].check(value.value());
                }
            }

            return false;
        } catch (err) {
            super.check(value);
        }
    }

    isConcrete() {
        return this.keys.every(k => this.vals[k].isConcrete());
    }

    harvest() {
        return this.keys.reduce((acc, k) => acc.concat(this.vals[k].harvest()), []);
    }

    substitute(map) {
        let vals = {};
        this.keys.forEach(k => {
            vals[k] = this.vals[k].substitute(map);
        });

        return new TaggedUnionType(vals);
    }

    sanitize(map) {
        let vals = {};
        this.keys.forEach(k => {
            vals[k] = this.vals[k].sanitize(map);
        });

        return new TaggedUnionType(vals);
    }
}

class ArrayType extends Type {
    constructor(type) {
        super();
        this.type = type;
    }

    equals(that) {
        if (that instanceof ArrayType) {
            return this.type.equals(that.type);
        }

        return false;
    }

    toString() {
        return "[" + this.type.toString() + "]";
    }

    check(value) {
        if (value && value.constructor === Array) {
            value.forEach(v => this.type.check(v));
        } else {
            super.check(value);
        }
    }

    isConcrete() {
        return this.type.isConcrete();
    }

    harvest() {
        return this.type.harvest();
    }

    substitute(map) {
        return new ArrayType(this.type.substitute(map));
    }

    sanitize(map) {
        return new ArrayType(this.type.sanitize(map));
    }
}

class TupleType extends Type {
    constructor(types) {
        super();
        this.types = types;
    }

    equals(that) {
        if (that instanceof TupleType) {
            return this.types.length === that.types.length && this.types.every((t, i) => t.equals(that.types[i]));
        }

        return false;
    }

    toString() {
        return "(" + this.types.map(t => t.toString()).join(", ") + ")";
    }

    check(value) {
        if (value && value.constructor === Array) {
            value.forEach((v, i) => this.types[i].check(v));
        } else {
            super.check(value);
        }
    }

    isConcrete() {
        return this.types.every(t => t.isConcrete());
    }

    harvest() {
        return this.types.reduce((acc, t) => acc.concat(t.harvest()), []);
    }

    substitute(map) {
        return new TupleType(this.types.map(t => t.substitute(map)));
    }

    sanitize(map) {
        return new TupleType(this.types.map(t => t.sanitize(map)));
    }
}

class RecordType extends Type {
    constructor(map) {
        super();
        this.vals = map;
        this.keys = Object.keys(map).sort();
    }

    equals(that) {
        if (that instanceof RecordType) {
            return this.keys.length === that.keys.length && this.keys.every(k => this.vals[k].equals(that.vals[k]));
        }

        return false;
    }

    toString() {
        return "{" + this.keys.map(k => k + ": " + this.vals[k].toString()).join(", ") + "}";
    }

    check(value) {
        try {
            this.keys.forEach(k => {
                this.vals[k].check(value[k]);
            });
        } catch (err) {
            super.check(value);
        }
    }

    isConcrete() {
        return this.keys.every(k => this.vals[k].isConcrete());
    }

    harvest() {
        return this.keys.reduce((acc, k) => acc.concat(this.vals[k].harvest()), []);
    }

    substitute(map) {
        let vals = {};
        this.keys.forEach(k => {
            vals[k] = this.vals[k].substitute(map);
        });

        return new RecordType(vals);
    }

    sanitize(map) {
        let vals = {};
        this.keys.forEach(k => {
            vals[k] = this.vals[k].sanitize(map);
        });

        return new RecordType(vals);
    }
}

class TypeClash extends Error {
    constructor(type, value) {
        super();

        this.type = type;
        this.value = value;
    }

    toString() {
        return `Runtime type assertion failure: Expected ${this.type.toString()}", got "${JSON.stringify(this.value)}".`;
    }
}

class Constraint {
    constructor(lower, upper) {
        this.lower = lower;
        this.upper = upper;
    }

    equals(that) {
        if (that instanceof Constraint) {
            return this.lower.equals(that.lower) && this.upper.equals(that.upper);
        }

        return false;
    }

    toString() {
        return this.lower.toString() + " <= " + this.upper.toString();
    }

    isUseless() {
        return this.lower.equals(this.upper) || this.upper instanceof TopType;
    }

    isConsistent() {
        let a = this.lower;
        let b = this.upper;

        if (a instanceof NamedType || a instanceof SumType) {
            if (b instanceof NamedType || b instanceof SumType) {
                let na = (a instanceof NamedType) ? [a] : a.names;
                let nb = (b instanceof NamedType) ? [b] : b.names;
                return na.every(t1 => nb.some(t2 => t1.equals(t2)));
            }
        }

        if (a instanceof ArrayType       && b instanceof ArrayType)       return true;
        if (a instanceof TupleType       && b instanceof TupleType)       return b.types.length <= a.types.length;
        if (a instanceof TaggedUnionType && b instanceof TaggedUnionType) return a.keys.every(k => b.keys.indexOf(k) >= 0);
        if (a instanceof RecordType      && b instanceof RecordType)      return b.keys.every(k => a.keys.indexOf(k) >= 0);

        return (b instanceof TopType) || a.isParam() || b.isParam();
    }

    unary() {
        if (this.lower instanceof ArrayType && this.upper instanceof ArrayType) {
            return [new Constraint(this.lower.type, this.upper.type)];
        }

        if (this.lower instanceof TupleType && this.upper instanceof TupleType) {
            return this.upper.types.filter((t, i) => i < this.lower.types.length).map((t, i) => new Constraint(this.lower.types[i], t));
        }

        if (this.lower instanceof TaggedUnionType && this.upper instanceof TaggedUnionType) {
            return this.lower.keys.filter(k => this.upper.keys.indexOf(k) >= 0).map(k => new Constraint(this.lower.vals[k], this.upper.vals[k]));
        }

        if (this.lower instanceof RecordType && this.upper instanceof RecordType) {
            return this.upper.keys.filter(k => this.lower.keys.indexOf(k) >= 0).map(k => new Constraint(this.lower.vals[k], this.upper.vals[k]));
        }

        return [];
    }

    binary(that) {
        if (this.upper.equals(that.lower)) {
            return [new Constraint(this.lower, that.upper)];
        }

        if (this.lower.equals(that.upper)) {
            return [new Constraint(that.lower, this.upper)];
        }

        return [];
    }
}

class ConstraintSet {
    constructor(constraints) {
        this.constraints = constraints.filter(c => !c.isUseless());
        let inconsistent = constraints.filter(c => !c.isConsistent());

        if (inconsistent.length != 0) {
            throw new Error("Inconsistent constraints: [" + inconsistent.map(c => c.toString()).join(", ") + "]");
        }
    }

    equals(that) {
        if (this.constraints.length == that.constraints.length) {
            for (let i = 0; i < this.constraints.length; i++) {
                if (!this.contains(this.constraints[i])) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    contains(constraint) {
        for (let i = 0; i < this.constraints.length; i++) {
            if (this.constraints[i].equals(constraint)) {
                return true;
            }
        }

        return false;
    }

    toString() {
        return "{" + this.constraints.map(c => c.toString()).join(", ") + "}";
    }

    add(constraint) {
        if (this.constraints.some(c => c.equals(constraint))) {
            return this;
        }

        return new ConstraintSet(this.constraints.concat([constraint]));
    }

    addAll(constraints) {
        return constraints.reduce((set, c) => set.add(c), this);
    }

    concat(cs) {
        return this.addAll(cs.constraints);
    }

    substitute(map) {
        return new ConstraintSet(this.constraints.map(c => new Constraint(c.lower.substitute(map), c.upper.substitute(map))));
    }

    sanitize(map) {
        return new ConstraintSet(this.constraints.map(c => new Constraint(c.lower.sanitize(map), c.upper.sanitize(map))));
    }
}

//
// Arrow Type
//

class ArrowType {
    constructor(arg, out, constraints, errors) {
        this.arg = arg;
        this.out = out;
        this.constraints = constraints || new ConstraintSet([]);
        this.errors = [];

        for (let type of (errors || [])) {
            if (!this.errors.some(e => e.equals(type))) {
                this.errors.push(type);
            }
        }

        this.resolve();
    }

    toString() {
        let type = this.arg.toString() + " ~> " + this.out.toString();

        if (this.constraints.constraints.length > 0 || this.errors.length > 0) {
            type += " \\ (";
            type += this.constraints.toString();
            type += ", {";
            type += this.errors.map(t => t.toString()).join(", ");
            type += "})";
        }

        return type;
    }

    resolve() {
        let initial = this.constraints;

        while (true) {
            this.constraints = this.closure();
            this.constraints = this.mergeConcreteBounds();

            let map = this.collectBounds();

            if (Object.getOwnPropertyNames(map).length === 0) {
                break;
            }

            this.substitute(map);
        }

        let cs = this.prune();

        if (cs.constraints.length === this.constraints.constraints.length || initial.equals(cs)) {
            return;
        }

        this.constraints = cs;
        this.resolve();
    }

    substitute(map) {
        this.arg = this.arg.substitute(map);
        this.out = this.out.substitute(map);
        this.constraints = this.constraints.substitute(map);
        this.errors = this.errors.map(e => e.substitute(map));
    }

    /**
     * Add the result of unary and binary closure rules on each constraint in
     * the set until no new constraints are produced (a fixed point reached).
     */
    closure() {
        let cs = [];
        let wl = Array.copy(this.constraints.constraints);

        while (wl.length > 0) {
            let w = wl.pop();

            if (!cs.some(c => c.equals(w))) {
                w.unary().forEach(c => wl.push(c));

                for (let c of cs) {
                    w.binary(c).forEach(c => wl.push(c));
                }

                cs.push(w);
            }
        }

        return new ConstraintSet(cs);
    }

    /**
     * Replace multiple constraints which upper bound or lower bound a param
     * type with the lub or glb, respectively, of the concrete bound.
     */
    mergeConcreteBounds() {
        let idmap = {};
        let lower = {};
        let upper = {};
        let other = [];

        for (let c of this.constraints.constraints) {
            let a = c.lower;
            let b = c.upper;

            if (a.isParam()) idmap[a.id] = a;
            if (b.isParam()) idmap[b.id] = b;

            if (a.isParam() && b.isConcrete()) {
                lower[a.id] = (a.id in lower) ? glb(lower[a.id], b) : b;
            } else if (b.isParam() && a.isConcrete()) {
                upper[b.id] = (b.id in upper) ? lub(upper[b.id], a) : a;
            } else {
                other.push(c);
            }
        }

        if (lower.length === 0 && upper.length === 0) {
            return null;
        }

        Object.keys(lower).forEach(id => other.push(new Constraint(idmap[id], lower[id])));
        Object.keys(upper).forEach(id => other.push(new Constraint(upper[id], idmap[id])));

        return new ConstraintSet(other);
    }

    /**
     * Create a substitution map. A param type p can be replaced by type t iff
     * one of the following hold:
     *
     *    - t <= p and p <= t
     *    - p^- <= t (and t is sole upper bound of p)
     *    - t <= p^+ (and t is sole lower bound of p)
     */
    collectBounds() {
        let map = {};

        function addToMap(p, t) {
            map[p.id] = (t.isParam() && t.id in map) ? map[t.id] : t;
        }

        let cs = this.constraints.constraints;
        let lowerParam = cs.filter(c => c.lower.isParam() && !c.lower.noreduce);
        let upperParam = cs.filter(c => c.upper.isParam() && !c.upper.noreduce);

        lowerParam.forEach(c1 => {
            upperParam.forEach(c2 => {
                if (c1.lower.equals(c2.upper) && c1.upper.equals(c2.lower)) {
                    addToMap(c1.lower, c1.upper);
                }
            });
        });

        let [n, p] = this.polarity();
        let negVar = n.filter(v => !p.some(x => x.equals(v))); // negative-only params
        let posVar = p.filter(v => !n.some(x => x.equals(v))); // positive-only params

        // Replace negative variables by their sole upper bound, if it exists
        negVar.map(p => cs.filter(c => c.lower === p)).filter(cs => cs.length === 1).forEach(c => {
            addToMap(c[0].lower, c[0].upper);
        });

        // Replace positive variables by their sole lower bound, if it exists
        posVar.map(p => cs.filter(c => c.upper === p)).filter(cs => cs.length === 1).forEach(c => {
            addToMap(c[0].upper, c[0].lower);
        });

        return map;
    }

    /**
     * Remove all constraints which are in one of the following forms:
     *
     *    - t <= t where neither are params
     *    - a <= b and (a or b) is not in the arrow type
     *    - t <= p^-
     *    - p^+ <= t
     */
    prune() {
        let [n, p] = this.polarity();
        let params = this.arg.harvest().concat(this.out.harvest()).concat(this.errors);

        return new ConstraintSet(this.constraints.constraints.filter(c => {
            // Keep no-reduce parameters
            if (c.lower.isParam() && c.lower.noreduce) return true;
            if (c.upper.isParam() && c.upper.noreduce) return true;

            // Remove non-parameter constraints
            if (!c.lower.isParam() && !c.upper.isParam()) return false;

            // Remove unknown type variables
            if (c.lower.isParam() && c.upper.isParam() && !params.some(p => p.equals(c.lower))) return false;
            if (c.lower.isParam() && c.upper.isParam() && !params.some(p => p.equals(c.upper))) return false;

            // Remove constraints with useless polarity
            if (c.lower.isParam() && !n.some(p => p.equals(c.lower))) return false;
            if (c.upper.isParam() && !p.some(p => p.equals(c.upper))) return false;

            return true;
        }));
    }

    /**
     * Determine which variables in arg and out have negative or positive position. This algorithm uses
     * dumb iteration and may be improved by the use of a worklist. The return value fo this function is
     * a pair [n, p] where n is the set of negative variables and p is the set of positive variables. If
     * a variable is both negative and positive it exists in both sets. If a variable is unreachable by
     * arg or out then it will be absent from both lists.
     */
    polarity() {
        let neg = this.arg.harvest();
        let pos = this.out.harvest().concat(this.errors);

        let changed = true;
        let negDefs = this.constraints.constraints.filter(c => c.lower.isParam()).map(c => [c.lower, c.upper.harvest()]);
        let posDefs = this.constraints.constraints.filter(c => c.upper.isParam()).map(c => [c.upper, c.lower.harvest()]);

        while (changed) {
            changed = false;

            let extraNeg = negDefs.filter(([a, b]) => neg.some(p => p === a)).reduce((c, [a, b]) => c.concat(b), []).filter(x => !neg.some(p => p === x));
            let extraPos = posDefs.filter(([a, b]) => pos.some(p => p === a)).reduce((c, [a, b]) => c.concat(b), []).filter(x => !pos.some(p => p === x));

            if (extraNeg.length > 0 || extraPos.length > 0) {
                changed = true;
                neg = neg.concat(extraNeg);
                pos = pos.concat(extraPos);
            }
        }

        return [neg, pos];
    }

    sanitize() {
        let map = {};
        let arg = this.arg.sanitize(map);
        let out = this.out.sanitize(map);
        let constraints = this.constraints.sanitize(map);
        let errors = this.errors.map(e => e.sanitize(map));

        return new ArrowType(arg, out, constraints, errors);
    }
}

//
// Type Utilities
//

function sanitizeTypes(arrows) {
    return arrows.map(a => a.type).map(t => t.sanitize());
}

function lub(a, b) {
    if (a.equals(b)) {
        return a;
    }

    if (a instanceof NamedType || a instanceof SumType) {
        if (b instanceof NamedType || b instanceof SumType) {
            let na = (a instanceof NamedType) ? [a] : a.names;
            let nb = (b instanceof NamedType) ? [b] : b.names;
            let nu = na.concat(nb.filter(n => na.indexOf(n) < 0));

            if (nu.length == 1) return new NamedType(nu[0]);
            if (nu.length >= 2) return new SumType(nu);
        }
    }

    if (a instanceof TaggedUnionType && b instanceof TaggedUnionType) {
        let map = {};
        b.keys.filter(k => a.keys.indexOf(k) >= 0).forEach(k => {
            map[k] = lub(a.vals[k], b.vals[k]);
        });

        return new TaggedUnionType(map);
    }

    if (a instanceof ArrayType && b instanceof ArrayType) {
        return new ArrayType(lub(a.type, b.type));
    }

    if (a instanceof TupleType && b instanceof TupleType) {
        return new TupleType(a.types.length < b.types.length
            ? a.types.map((t, i) => lub(t, b.types[i]))
            : b.types.map((t, i) => lub(t, a.types[i])));
    }

    if (a instanceof RecordType && b instanceof RecordType) {
        let map = {};
        a.keys.filter(k => b.keys.indexOf(k) >= 0).forEach(k => {
            map[k] = lub(a.vals[k], b.vals[k]);
        });

        return new RecordType(map);
    }

    return new TopType();
}

function glb(a, b) {
    if (a.equals(b)) {
        return a;
    }

    if (a instanceof TopType) return b;
    if (b instanceof TopType) return a;

    if (a instanceof NamedType || a instanceof SumType) {
        if (b instanceof NamedType || b instanceof SumType) {
            let na = (a instanceof NamedType) ? [a] : a.names;
            let nb = (b instanceof NamedType) ? [b] : b.names;
            let ni = na.filter(t1 => nb.some(t2 => t1.equals(t2)));

            if (ni.length == 1) return new NamedType(ni[0]);
            if (ni.length >= 2) return new SumType(ni);
        }
    }

    if (a instanceof ArrayType && b instanceof ArrayType) {
        return new ArrayType(glb(a.type, b.type));
    }

    if (a instanceof TupleType && b instanceof TupleType) {
        return new TupleType(a.types.length < b.types.length
            ? b.types.map((t, i) => i >= a.types.length ? t : glb(t, a.types[i]))
            : a.types.map((t, i) => i >= b.types.length ? t : glb(t, b.types[i])));
    }

    if (a instanceof TaggedUnionType && b instanceof TaggedUnionType) {
        let map = {};
        a.keys.forEach(k => { map[k] = (k in map) ? glb(map[k], a.vals[k]) : a.vals[k]; });
        b.keys.forEach(k => { map[k] = (k in map) ? glb(map[k], b.vals[k]) : b.vals[k]; });

        return new RecordType(map);
    }

    if (a instanceof RecordType && b instanceof RecordType) {
        let map = {};
        a.keys.forEach(k => { map[k] = (k in map) ? glb(map[k], a.vals[k]) : a.vals[k]; });
        b.keys.forEach(k => { map[k] = (k in map) ? glb(map[k], b.vals[k]) : b.vals[k]; });

        return new RecordType(map);
    }

    throw new Error(`No greatest lower bound of "${a.toString()}" and "${b.toString()}".`);
}

function getLocation(stack) {
    let r = new RegExp(/(?:https?|file):\/\/(.+):(\d+):\d+/g);

    for (let match of stack.match(r)) {
        let parts = new RegExp(/(?:https?|file):\/\/(.+):(\d+):\d+/g).exec(match);

        if (!parts[1].endsWith("arrows.js")) {
            return parts[1] + ":" + parts[2];
        }
    }

    return "";
}
