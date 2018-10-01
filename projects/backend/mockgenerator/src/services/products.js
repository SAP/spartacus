const faker = require('faker');

const products = (function() {
  const productList = [];
  for (let n = 0; n < 50; n++) {
    const code = faker.random.number();
    const product = {
      code,
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(50),
      manufacturer: faker.lorem.word(),
      numberOfReviews: 19,
      availableForPickup: true,
      averageRating: 3.52,
      stock: { stockLevel: 45, stockLevelStatus: 'inStock' },
      price: {
        formattedValue: faker.commerce.price(),
        currencyIso: 'USD',
        priceType: 'BUY',
        value: faker.commerce.price()
      },
      images: [
        {
          url: faker.random.image(),
          format: 'thumbnail',
          imageType: 'PRIMARY'
        },
        {
          altText: faker.commerce.productName(),
          url: faker.random.image(),
          format: 'product',
          imageType: 'PRIMARY'
        },
        {
          altText: faker.commerce.productName(),
          url: faker.random.image(),
          format: 'zoom',
          imageType: 'GALLERY',
          galleryIndex: 0
        },
        {
          altText: faker.commerce.productName(),
          url: faker.random.image(),
          format: 'product',
          imageType: 'GALLERY',
          galleryIndex: 0
        },
        {
          altText: faker.commerce.productName(),
          url: faker.internet.avatar(),
          format: 'thumbnail',
          imageType: 'GALLERY',
          galleryIndex: 0
        }
      ],
      url: `/products/${code}`,
      classifications: [
        {
          code: '3419',
          features: [
            {
              code: 'ElectronicsClassification/1.0/3419.processor model, 47',
              comparable: true,
              featureUnit: {
                name: '.',
                symbol: '.',
                unitType: '300'
              },
              featureValues: [
                {
                  value: faker.internet.mac()
                }
              ],
              name: 'Processor model',
              range: false
            }
          ],
          name: 'Processor'
        },
        {
          code: '1093',
          features: [
            {
              code: 'ElectronicsClassification/1.0/1093.weight, 94',
              comparable: true,
              featureUnit: {
                name: 'gram',
                symbol: 'g',
                unitType: faker.random.number({ min: 12, max: 98 })
              },
              featureValues: [
                { value: faker.random.number({ min: 100, max: 1000 }) }
              ],
              name: 'Weight',
              range: false
            }
          ],
          name: 'Weight & dimensions'
        }
      ]
    };
    productList.push(product);
  }

  return {
    get list() {
      return productList;
    }
  };
})();
module.exports = products.list;
