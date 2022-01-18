import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import {
  NgExpressEngineDecorator,
  SsrOptimizationOptions,
} from '@spartacus/setup/ssr';
import { Express } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import 'zone.js/node';
import { AppServerModule } from './src/main.server';

// Require is used here, because we can't use `import * as express` together with TS esModuleInterop option.
// And we need to use esModuleInterop option in ssr dev mode, because i18next enforce usage of this option for cjs module.
const express = require('express');

const ssrOptions: SsrOptimizationOptions = {
  concurrency: 20,
  timeout: Number(process.env.SSR_TIMEOUT ?? 3000),
  reuseCurrentRendering: true,
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server: Express = express();
  const distFolder = join(process.cwd(), 'dist/storefrontapp');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.set('trust proxy', 'loopback');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
