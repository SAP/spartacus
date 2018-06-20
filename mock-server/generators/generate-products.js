var faker = require('faker');

exports.generate = function(data) {
  generateProductData(data);
  generateSuggestions(data);
};

generateProductData = function(data) {
  data.search = {
    products: []
  };
  for (var n = 0; n < 10; n++) {
    data.search.products.push({
      code: faker.random.number(),
      name: faker.commerce.productName(),
      price: {
        formattedValue: faker.commerce.price()
      },
      images: [
        {
          url: faker.image.avatar(),
          format: 'thumbnail',
          imageType: 'PRIMARY'
        }
      ]
    });
  }
};

generateSuggestions = function(data) {
  data.suggestions = {
    suggestions: [
      {
        value: faker.commerce.color()
      },
      {
        value: faker.commerce.color()
      },
      {
        value: faker.commerce.productName()
      }
    ]
  };
};
