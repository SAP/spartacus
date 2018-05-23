var faker = require('faker');
var header = require('./generate-header');

exports.generate = function(data, sites) {
  // generate pages for each site
  for (const site of sites) {
    const pages = [];

    pages.push(generateHomepage());

    data[site + '-pages'] = pages;
  }
};

function generateHomepage() {
  const page = {
    uid: 'homepage',
    name: 'testPage',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: [].concat(header.generateHeaderSlots())
    }
  };
  return page;
}
