'use strict';
const url = require('url');

const unique = {};
module.exports = (req, res, next) => {
  const uri = url.parse(req.url, true);
  sendImage(uri, res);
  sendContextImage(uri, res);
  next();
};

function sendContextImage(uri, res) {
  if (isContextMedia(uri.path)) {
    const context = /context=(.*)/.exec(uri.path)[1];
    res.send = () =>
      res.redirect(
        `https://placeimg.com/200/200/tech?${getUnqiueRedirectSuffix(context)}`
      );
  }
}

function sendImage(uri, res) {
  const media = getMedia(uri.pathname);
  if (media) {
    const context = /context=(.*)/.exec(uri.path)[1];
    const sizes = /([0-9]+)x([0-9]+)/.exec(media);

    const width = sizes ? sizes[1] : '100';
    const height = sizes ? sizes[2] : '100';
    res.send = () =>
      res.redirect(
        `https://placeimg.com/${width}/${height}/tech?${getUnqiueRedirectSuffix(
          context
        )}`
      );
  }
}

function getMedia(uri) {
  const media = /medias\/(.+)\.[jpg|svg]/.exec(uri);
  return media && media[1];
}

function isContextMedia(uri) {
  return /medias\/\?context=(.+)/.test(uri);
}

function getUnqiueRedirectSuffix(uri) {
  if (!unique[uri]) {
    unique[uri] = Object.keys(unique).length;
  }
  return unique[uri];
}
