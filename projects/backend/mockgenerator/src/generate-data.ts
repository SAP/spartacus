import * as pageGenerator from './generators/generate-pages';

const SITES = ['electronics', 'apparel'];

export = function() {
  const data = {
    ...pageGenerator.generate(SITES)
  };
  return data;
};
