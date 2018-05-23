var faker = require('faker');

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

generateLogoConmponent = function() {
  return {
    uid: faker.random.number(),
    typeCode: 'SimpleBannerComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'Site Logo Component',
    container: 'false',
    external: 'false',
    media: {
      code: '/images/theme/logo_hybris_responsive.svg',
      mime: 'image/png',
      altText: 'hybris Accelerator',
      url: 'https://dummyimage.com/600x40/ffaacc/fff&text=myrandomlogo'
    },
    type: 'Simple Banner Component',
    urlLink: '/logo'
  };
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
