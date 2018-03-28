var contextGenerator = require('./generators/generate-context');

const SITES = ['electronics'];

module.exports = () => {
  const data = {};

  contextGenerator.create(data, SITES);

  return data;
};
