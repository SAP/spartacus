'use strict';
const url = require('url');

module.exports = (req, res, next) => {
  const uri = url.parse(req.url, true);
  sendImage(uri, res);
  sendContextImage(uri, res);
  next();
};

function sendContextImage(uri, res) {
  if (isContextMedia(uri.path)) {
    res.send = () => res.redirect('https://placeimg.com/200/200/tech');
  }
}

function sendImage(uri, res) {
  const media = getMedia(uri.pathname);
  if (media) {
    const sizes = /([0-9]+)x([0-9]+)/.exec(media);
    const width = sizes[1];
    const height = sizes[2];
    res.send = () => res.redirect(`https://placeimg.com/${width}/${height}/tech`);
  }
}

function getMedia(uri) {
  const media = /medias\/(.+)\.jpg/.exec(uri);
  return media && media[1];
}

function isContextMedia(uri) {
  return /medias\/\?context=(.+)/.test(uri);
}
