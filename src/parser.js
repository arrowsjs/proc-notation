const acorn = require("acorn");

// don't instaniate it
module.exports = acorn.Parser.extend(require("./acorn-proc.js"));

