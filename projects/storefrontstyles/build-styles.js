const sass = require('sass');
const fs = require('fs');
const importer = require('./importer');

const file = './_index.scss';
const outFile = './output.css';
const includePaths = ['./'];

sass.render(
  {
    file,
    outFile,
    includePaths,
    importer,
  },
  function(error, result) {
    if (!error) {
      fs.writeFile(outFile, result.css, function() {});
    }
  }
);
