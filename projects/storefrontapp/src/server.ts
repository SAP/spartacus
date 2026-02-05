/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { writeResponseToNodeResponse } from '@angular/ssr/node';
import { CxAngularNodeAppEngine } from '@spartacus/setup/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'path';

/**
 * Modern SSR server using AngularNodeAppEngine.
 *
 * This is the new modern implementation that uses:
 * - Promise-based API instead of callbacks
 * - Web-standard Request/Response instead of Express-specific types
 * - Middleware pattern instead of view engine
 *
 * This coexists with the legacy server.ts during migration.
 *
 * Note: SSR optimization features (timeout, caching, concurrency) will be added in Phase 3.
 */

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  // const indexHtml = join(serverDistFolder, 'index.server.html');
  // const indexHtmlContent = readFileSync(indexHtml, 'utf-8');

  // Load and set the Angular app engine manifest
  // This is required for AngularNodeAppEngine to work
  // The manifest file is generated during build, so we use dynamic import
  // const manifestPath = join(serverDistFolder, 'angular-app-engine-manifest.mjs');
  // const angularAppEngineManifest = await import(/* webpackIgnore: true */ manifestPath);
  // ɵsetAngularAppEngineManifest(angularAppEngineManifest.default);

  // Trust proxy for cloud deployments (same as legacy)
  server.set('trust proxy', 'loopback');

  // Create the modern Angular SSR engine
  const angularApp = new CxAngularNodeAppEngine();

  // Serve static files from /browser
  // Note: Regex pattern /.*\..*/ matches files with extensions (e.g., .js, .css, .png)
  server.get(
    /.*\..*/,
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // Handle all Angular routes using modern middleware pattern
  server.use((req, res, next) => {
    angularApp
      .handle(req)
      .then((response) => {
        if (response) {
          // Angular handled the route - write the response
          writeResponseToNodeResponse(response, res);
        } else {
          // No matching Angular route - pass to next middleware
          next();
        }
      })
      .catch((error) => {
        // Error during rendering - log and pass to error middleware
        console.error('SSR Error:', error);
        next(error);
      });
  });

  // Error handling middleware - provides CSR fallback on errors
  // This ensures graceful degradation if SSR fails
  // server.use(defaultExpressErrorHandlers(indexHtmlContent));

  return server;
}

async function run() {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = await app();
  server.listen(port, () => {
    /* eslint-disable-next-line no-console
    --
    It's just an example application file. This message is not crucial
    to be logged using any special logger. Moreover, we don't have
    any special logger available in this context. */
    console.log(
      `Node Express server (MODERN) listening on http://localhost:${port}`
    );
  });
}

run();
