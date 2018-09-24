const headerGenerator = require('./generate-header');
const componentGenerator = require('./generate-components');
const ENDPOINTS = require('../constants/endpoints');
const products = require('../services/products');

exports.generate = function(sites) {
  const data = {};
  // generate pages for each site
  for (const site of sites) {
    data[`${site}-${ENDPOINTS.PAGES}`] = [
      generateHomepage(),
      generateProductPage(),
      generateNotFound(),
      generateCartPage()
    ];
  }
  return data;
};

function generateNotFound() {
  const page = {
    uid: 'notFound',
    name: 'notFound',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: []
    }
  };
  return page;
}

function generateProductPage() {
  const page = {
    uid: 'ProductPage',
    name: 'testPage',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: []
    }
  };
  return page;
}

function generateHomepage() {
  const productCodes = [...products]
    .splice(0, 6)
    .map(product => product.code)
    .join(' ');
  const page = {
    uid: 'homepage',
    name: 'testPage',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: [
        {
          components: {
            component: [
              {
                uid: 'ElectronicsHomepageProductCarouselComponent',
                typeCode: 'ProductCarouselComponent',
                modifiedTime: '2018-07-10T00:22:49.391Z',
                name: 'Electronics Homepage Product Carousel',
                container: 'false',
                popup: 'false',
                scroll: 'ALLVISIBLE',
                productCodes,
                title: 'Our Bestselling Products'
              }
            ]
          },
          name: 'Section3 Slot for Homepage',
          position: 'Section3',
          slotId: 'Section3Slot-Homepage',
          slotShared: false
        }
      ]
        .concat(headerGenerator.generateHeaderSlots())
        .concat(generateHomePageSlots())
        .concat(headerGenerator.generateFooterSlots())
    }
  };
  return page;
}

function generateCartPage() {
  const page = {
    uid: 'cartPage',
    name: 'cartPage',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: []
        .concat(headerGenerator.generateHeaderSlots())
        .concat(headerGenerator.generateFooterSlots())
    }
  };
  return page;
}

generateHomePageSlots = function() {
  return [
    {
      position: 'Section1',
      components: {
        component: [componentGenerator.banner(800, 200, '/a-link')]
      }
    },
    {
      position: 'Section2A',
      components: {
        component: [componentGenerator.banner()]
      }
    },
    {
      position: 'Section2B',
      components: {
        component: [componentGenerator.banner()]
      }
    }
  ];
};
