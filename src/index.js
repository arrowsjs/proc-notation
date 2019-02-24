const parser = require('./parser.js');
const proc = require('./translate.js');
const astravel = require('astravel');
const astring = require('astring');

module.exports = {
  parse(text) {
    const comments = [];
    const ast = parser.parse(text, {locations: true, onComment: comments});
    return {ast: ast, comments: comments};
  },

  transform(ast, options) {
    return proc.translate(ast, options);
  },

  attachComments(ast, comments) {
    return astravel.attachComments(ast, comments);
  },

  codegen(ast) {
    return astring.generate(ast, {comments: true});
  },

  translate(text, options) {
    const comments = [];
    let ast = parser.parse(text, {locations: true, onComment: comments});
    ast = proc.translate(ast, options);
    ast = astravel.attachComments(ast, comments);
    return astring.generate(ast, {comments: true});
  },
};

