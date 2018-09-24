getMime = function(imageUrl) {
  return 'image/png';
};

createImage = function(width, height) {
  // https://placeimg.com/640/480/tech
  return `https://placeimg.com/${width}/${height}/tech`;
};

module.exports = {
  getMime,
  createImage
};
