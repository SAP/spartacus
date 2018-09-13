const faker = require('faker');
const { getMime, createImage } = require('../helpers/image');

exports.banner = function(width, height, link, name, imageUrl) {
  if (!imageUrl) imageUrl = createImage(width | 500, height | 400);

  return {
    uid: faker.random.number(),
    typeCode: 'SimpleBannerComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: name | 'name',
    container: 'false',
    external: 'false',
    media: {
      code: imageUrl,
      mime: getMime(imageUrl),
      altText: name | 'alt',
      url: imageUrl
    },
    urlLink: link
  };
};
