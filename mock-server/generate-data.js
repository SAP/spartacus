var contextGenerator = require('./generators/generate-context');
var pageGenerator = require('./generators/generate-pages');
var productGenerator = require('./generators/generate-products');

const SITES = ['electronics', 'apparel'];

module.exports = () => {
  const data = {};

  contextGenerator.generate(data, SITES);
  pageGenerator.generate(data, SITES);
  productGenerator.generate(data);

  return data;
};
