var faker = require('faker');
var headerGenerator = require('./generate-header');
var componentGenerator = require('./generate-components');

exports.generate = function(data, sites) {
  // generate pages for each site
  for (const site of sites) {
    const pages = [];

    pages.push(generateHomepage());
    pages.push(generateCartPage());

    data[site + '-pages'] = pages;
  }
};

function generateHomepage() {
  const page = {
    uid: 'homepage',
    name: 'testPage',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: []
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
