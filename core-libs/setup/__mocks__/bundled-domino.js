const path = require('path');
const dominoPath = path.resolve(
  __dirname,
  '../../../node_modules/@angular/platform-server/third_party/domino/bundled-domino.mjs'
);
module.exports = require(dominoPath).default;
