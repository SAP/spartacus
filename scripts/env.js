#!/usr/bin/env node
const backend_url = 'http://localhost:9002';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const file = 'projects/storefrontapp/src/index.html';

const config = {
  MutationEvents: '2.0',
  QuerySelector: false
};

JSDOM.fromFile(file, config).then(dom => {
  var document = dom.window.document;
  var meta = document.createElement('meta');
  meta.content = backend_url;
  meta.name = 'occ-backend-base-url';
  document.getElementsByTagName('head')[0].appendChild(meta);

  fs.writeFile(
    file,
    '<!doctype html>' + document.documentElement.outerHTML,
    function(error) {
      if (error) {
        console.log('Error writing file: ' + error);
      }
    }
  );
});
