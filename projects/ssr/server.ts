// These are important and needed before anything else
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import { join } from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// spike todo remove:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Express server
const app = express();

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ConfigFromOccBaseSites,
  getOccBaseUrlFromMetaTag,
  fetchOccBaseSitesConfig,
} = require('../../dist/storefrontapp-server/main');

const fs = require('fs');
const https = require('https');

const occBaseUrl = getOccBaseUrlFromMetaTag(
  fs.readFileSync(join(DIST_FOLDER, 'storefrontapp', 'index.html')).toString()
);
console.log(occBaseUrl); //spike todo remove

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'storefrontapp'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'storefrontapp')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  fetchOccBaseSitesConfig(
    { baseUrl: occBaseUrl, ssrHttpsClient: https },
    req.protocol + '://' + req.get('host') + req.originalUrl
  ).then(config => {
    res.render('index', {
      req,
      providers: [{ provide: ConfigFromOccBaseSites, useValue: config }],
    });
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
