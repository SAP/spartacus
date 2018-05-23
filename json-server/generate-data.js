var contextGenerator = require('./generators/generate-context');
var pageGenerator = require('./generators/generate-pages');

const SITES = ['electronics', 'apparel'];

module.exports = () => {
  const data = {};

  contextGenerator.generate(data, SITES);
  pageGenerator.generate(data, SITES);

  return data;
};
