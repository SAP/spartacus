// CJS wrapper for Angular platform-server's bundled domino (ESM).
// The original `bundled-domino.mjs` uses `export { index as default }`.
// When Jest transforms this via jest-preset-angular, the ESM-to-CJS interop
// fails to unwrap the default export, so `import domino from '...'` yields
// an object without `.impl`, breaking `setDomTypes()`.
// This wrapper reads the original source, replaces the ESM export with
// `module.exports`, and compiles it as CJS so the default export resolves correctly.
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
