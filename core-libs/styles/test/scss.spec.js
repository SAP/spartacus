const path = require('path');
const sassTrue = require('sass-true');
const { globSync } = require('glob');

const testFiles = globSync(path.resolve(process.cwd(), `test/**/*.spec.scss`));

describe('Scss Styles test runner', () => {
  it('should discover scss spec files to run through sass-true', () => {
    expect(testFiles.length).toBeGreaterThan(0);
  });
});

describe('Scss Styles', () => {
  testFiles.forEach((file) => sassTrue.runSass({ describe, it }, file));
});
