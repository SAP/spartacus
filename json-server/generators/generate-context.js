var faker = require('faker');

exports.create = function(data, sites) {
  data.context = [];
  for (const site of sites) {
    data.context.push({
      uid: site,
      languages: generateLanguages(),
      currencies: generateCurrencies()
    });
  }
};

function generateLanguages() {
  const languages = [];
  languages.push(
    {
      isocode: 'en',
      nativeName: 'English'
    },
    {
      isocode: 'de',
      nativeName: 'German'
    }
  );

  return languages;
}

function generateCurrencies() {
  const currencies = [];
  currencies.push(
    {
      isocode: 'USD'
    },
    {
      isocode: 'EUR'
    }
  );
  // use faker
  for (const i of [1, 2, 3]) {
    currencies.push({
      isocode: faker.finance.currencyCode()
    });
  }

  return currencies;
}
