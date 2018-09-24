'use strict';
const url = require('url');
module.exports = (req, res, next) => {
  returnSingular(req, res);
  next();
};

/**
 * The json-server returns sometimes arrays where we need an object.
 * In order to keep our application code clean and unaware of the differences
 * we need to return the exact same payload. Therefor we intercept some routes
 * with the following middleware. Each route that contains the singular parameter
 * will try to return a single object.
 */

function returnSingular(req, res) {
  const isSingular = url.parse(req.url, true).query['singular'];
  if (isSingular) {
    res.send = modifySingularResponse(res.send);
  }
}

function modifySingularResponse(_send) {
  return function(body) {
    try {
      const json = JSON.parse(body);
      if (!Array.isArray(json)) {
        return;
      }
      switch (json.length) {
        case 0:
          return _send.call(this, '{}', 404);
        case 1:
          return _send.call(this, JSON.stringify(json[0]));
        default:
          return;
      }
    } catch (e) {}
  };
}
