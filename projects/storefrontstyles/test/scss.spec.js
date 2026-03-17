const path = require('path');
const sassTrue = require('sass-true');
const sass = require('sass');
const { globSync } = require('glob');

describe('Scss Styles', () => {
  const testFiles = globSync(
    path.resolve(process.cwd(), `test/**/*.spec.scss`)
  );

  testFiles.forEach((file) => sassTrue.runSass({ describe, it, sass }, file));
});
