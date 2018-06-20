var faker = require('faker');

exports.banner = function(width, height, link, name, imageUrl) {
  if (!imageUrl) imageUrl = getUrl(width | 500, height | 400);

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

getMime = function(imageUrl) {
  return 'image/png';
};

getUrl = function(width, height) {
  const number = Math.floor(Math.random() * 50);
  // https://placeimg.com/640/480/tech
  return 'https://placeimg.com/' + width + '/' + height + '/tech';
};
