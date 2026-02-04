/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createNodeRequestHandler, isMainModule } from '@angular/ssr/node';
import {
  NgExpressEngineDecorator,
  SsrOptimizationOptions,
  defaultSsrOptimizationOptions,
  ngExpressEngine as engine,
} from '@spartacus/setup/ssr';
import express from 'express';
import bootstrap from './main.server';

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
  ssrFeatureToggles: {
    limitCacheByMemory: true,
  },
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

// Create the engine instance once, to be used directly (bypassing Express view system)
// Otherwise we get this error from Express: https://github.com/expressjs/express/blob/91891e3aee6f2a0b1c4db1e0b499338d05bda91b/lib/application.js#L516
// because in Vite Dev Server there are no physical files on the disk (only virtual),
// so we cannot plug those files into Express view system.
const ssrEngine = ngExpressEngine({ bootstrap });

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  server.set('trust proxy', 'loopback');

  // All regular routes use the Angular SSR engine directly (bypassing Express view system)
  server.get(/.*/, (req, res, next) => {
    ssrEngine(
      '', // SPIKE - filePath is not used by ngExpressEngine, so just passing empty value
      {
        req,

        // SPIKE - VERY IMPORTANT to pass `res` here, so ngExpressEngine send write response
        // directly to it, by calling to `writeResponseToNodeResponse(response, res)` - to forward
        // `response` from AngularNodeAppEngine to the `res` of Express
        res,

        // SPIKE - providers are no longer passed to the app, because AngularNodeAppEngine doesn't accept extra providers
        // providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      },
      (err) => {
        // if AngularNodeAppEngine.handle fails, it calls this `callback(err)`. thanks to it, here in server.ts
        // we can forward the error to `next()` error handler
        if (err) {
          next(err);
        }
        // Note: successful response is written directly by ngExpressEngine via writeResponseToNodeResponse
      }
    );
  });

  // SPIKE CAUTION - disabling our custom error handlers for now, because I don't know how to obtain
  //                 indexHtmlContent here in vite dev server, because files seem to be virtual only there
  // server.use(defaultExpressErrorHandlers(indexHtmlContent));

  return server;
}

// SPIKE - conflict of names (comparing to fresh angular app): app vs appInstance, so renaming to appInstance for now
const appInstance = app();

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  appInstance.listen(
    port,
    // SPIKE - somehow it doesn't accept `(error)` argument. maybe I'm using wrong `express@4` version still locally?
    // (error) => {
    // if (error) {
    //   throw error;
    // }
    () => {
      /* eslint-disable-next-line no-console
      --
      It's just an example application file. This message is not crucial
      to be logged using any special logger. Moreover, we don't have
      any special logger available in this context. */
      console.log(`Node Express server listening on http://localhost:${port}`);
    }
  );
}

// SPIKE - this named export is expected by Angular's builder with "outputMode": "server"
export const reqHandler = createNodeRequestHandler(appInstance);
