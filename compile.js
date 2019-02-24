let filename, qualified_name = "";

for (let i = 2; i < process.argv.length; i++) {
  const args = process.argv[i];
  const argf = () => (process.argv[++i] ? process.argv[i] : "");
  if (args[0] !== '-') {
    filename = process.argv[i];
  } else {
    switch (args) {
    case "-q":
      qualified_name = argf();
      break;
    default:
      console.error("unknown option:", args);
      process.exit(-1);
    }
  }
}

if (!filename) {
  console.error("usage:", process.argv[0], process.argv[1], "[-q <qualifier>] <filename>");
  process.exit(-1);
}

const fs = require('fs')
const {translate} = require("./src/index.js");

let p = fs.readFileSync(filename, 'utf8');

try {
  let p2 = translate(p, {qualified_name: qualified_name});
  console.log(p2);
} catch (e) {
  if (e instanceof SyntaxError) {
    let loc = e.loc;
    let linenum = loc.line + ":";
    let line = p.split('\n')[loc.line - 1];
    console.error(linenum, line);
    console.error('^'.padStart(linenum.length + 2 + loc.column));
  }
  console.error(e);
}

