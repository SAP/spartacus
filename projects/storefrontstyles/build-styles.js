const sass = require('sass');
const fs = require('fs');
const importer = require('./importer');

const file = './_index.scss';
const outFile = './output.css';

sass.render(
  {
    file,
    outFile,
    importer,
  },
  function(error, result) {
    if (error) {
      throw error;
    } else {
      fs.writeFile(outFile, result.css, function() {});
    }
  }
);
