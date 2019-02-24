const {translate} = require('../src/index.js');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

fs.readdirSync("tests", {withFileTypes: true}).forEach(dirent => {
  if (dirent.isFile()) {
    const src = fs.readFileSync(path.join("tests", dirent.name), 'utf8')
    try {
      translate(src);
      console.log(dirent.name, colors.green("passed"));
    } catch(e) {
      console.log(dirent.name, colors.red("failed"));
    }
  }
});

