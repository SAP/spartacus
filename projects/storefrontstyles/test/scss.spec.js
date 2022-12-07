const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

describe('Scss Styles', () => {
  const testFiles = glob.sync(
    path.resolve(process.cwd(), `test/**/*.spec.scss`)
  );

  testFiles.forEach((file) =>
    sassTrue.runSass({ file: file }, { describe, it })
  );
});
