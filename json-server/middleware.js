'use strict';

module.exports = (req, res, next) => {
  returnSingular(req, res);
  next();
};

/**
 * The json-server returns sometimes arrays where we need an object.
 * In order to keep our application code clean and unaware of the differences
 * we need to return the exact same payload. Therefor we intercept some routes
 * with the following middleware. Eeach route that contains the singular parameter
 * will try to return a single object.
 */
function returnSingular(req, res) {
  const _send = res.send;
  if (require('url').parse(req.url, true).query['singular']) {
    res.send = function (body) {
      try {
        const json = JSON.parse(body);
        if (Array.isArray(json)) {
          if (json.length === 1) {
            return _send.call(this, JSON.stringify(json[0]));
          } else if (json.length === 0) {
            return _send.call(this, '{}', 404);
          }
        }
      } catch (e) {}
    };
  }
}
