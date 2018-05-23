var faker = require('faker');

exports.generate = function(data, sites) {
  data.context = [];
  for (const site of sites) {
    generateLanguages(data, site);
    generateCurrencies(data, site);
  }
};

function generateLanguages(data, site) {
  const languages = [];
  languages.push({
    isocode: 'en',
    nativeName: 'English'
  });
  languages.push({
    isocode: 'de',
    nativeName: 'German'
  });
  data[site + '-languages'] = {
    languages: languages
  };
}

function generateCurrencies(data, site) {
  const currencies = [];
  currencies.push(
    {
      isocode: 'USD',
      symbol: '$'
    },
    {
      isocode: 'EUR',
      symbol: '€'
    }
  );
  // add some fake content as well
  for (const i of [1, 2, 3]) {
    currencies.push({
      isocode: faker.finance.currencyCode(),
      symbol: faker.finance.currencySymbol()
    });
  }
  data[site + '-currencies'] = {
    currencies: currencies
  };
}
