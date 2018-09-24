const faker = require('faker');
const componentGenerator = require('./generate-components');

exports.generateHeaderSlots = function() {
  return [
    {
      position: 'SiteLogo',
      components: {
        component: [generateLogoConmponent()]
      }
    },
    {
      position: 'SearchBox',
      components: {
        component: [generateSearchBoxComponent()]
      }
    },
    {
      position: 'MiniCart',
      components: {
        component: [generateMinicart()]
      }
    }
  ];
};

exports.generateFooterSlots = function() {
  return [
    {
      position: 'Footer',
      components: {
        component: []
      }
    }
  ];
};

generateLogoConmponent = function() {
  return componentGenerator.banner(
    null,
    null,
    '/',
    'Site Logo Component',
    'https://logo.clearbit.com/bankofamerica.com'
  );
};

generateSearchBoxComponent = function() {
  return {
    uid: faker.random.number(),
    typeCode: 'SearchBoxComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'Do a search...',
    displayProductImages: 'true',
    displayProducts: 'true',
    displaySuggestions: 'true',
    container: 'false',
    maxProducts: '5',
    maxSuggestions: '5',
    minCharactersBeforeRequest: '3',
    waitTimeBeforeRequest: '500'
  };
};

generateMinicart = function() {
  return {
    uid: faker.random.number(),
    typeCode: 'MiniCartComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    shownProductCount: '3',
    lightboxBannerComponent: {
      uid: 'banner',
      typeCode: 'SimpleBannerComponent'
    }
  };
};
