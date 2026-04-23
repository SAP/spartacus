const path = require('path');
const dominoPath = path.resolve(
  __dirname,
  '../../../node_modules/@angular/platform-server/third_party/domino/bundled-domino.mjs'
);
const fs = require('fs');
const code = fs.readFileSync(dominoPath, 'utf8');
const cjsCode = code.replace(
  'export { index as default };',
  'module.exports = index; module.exports.__esModule = true; module.exports.default = index;'
);
const Module = require('module');
const m = new Module(dominoPath);
m.filename = dominoPath;
m.paths = Module._nodeModulePaths(path.dirname(dominoPath));
m._compile(cjsCode, dominoPath);
module.exports = m.exports;
