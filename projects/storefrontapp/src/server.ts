/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { writeResponseToNodeResponse } from '@angular/ssr/node';
import {
  CxAngularNodeAppEngine,
  DefaultExpressServerLogger,
  defaultExpressErrorHandlers,
} from '@spartacus/setup/ssr';
import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Modern SSR server using AngularNodeAppEngine.
 *
 * This is the new modern implementation that uses:
 * - Promise-based API instead of callbacks
 * - Web-standard Request/Response instead of Express-specific types
 * - Middleware pattern instead of view engine
 * - Error propagation via requestContext.cx namespace
 * - Server logging via requestContext.cx.logger
 */

/**
 * Reads the index HTML content for CSR fallback.
 */
function getIndexHtmlContent(
  serverDistFolder: string,
  browserDistFolder: string
): string {
  const indexServerHtml = join(serverDistFolder, 'index.server.html');
  if (existsSync(indexServerHtml)) {
    return readFileSync(indexServerHtml, 'utf-8');
  }

  const indexHtml = join(browserDistFolder, 'index.html');
  if (existsSync(indexHtml)) {
    return readFileSync(indexHtml, 'utf-8');
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Spartacus Storefront</title>
  <base href="/">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>`;
}

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtmlContent = getIndexHtmlContent(
    serverDistFolder,
    browserDistFolder
  );

  server.set('trust proxy', 'loopback');

  const logger = new DefaultExpressServerLogger();
  const angularApp = new CxAngularNodeAppEngine({ logger });

  // Serve static files from /browser
  server.get(
    /.*\..*/,
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // Handle all Angular routes
  server.use((req, res, next) => {
    angularApp
      .handle(req)
      .then((response) => {
        if (response) {
          writeResponseToNodeResponse(response, res);
        } else {
          next();
        }
      })
      .catch(next);
  });

  // Error handling middleware - CSR fallback
  server.use(defaultExpressErrorHandlers(indexHtmlContent));

  return server;
}

async function run() {
  const port = process.env['PORT'] || 4000;

  const server = await app();
  server.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(
      `Node Express server (MODERN) listening on http://localhost:${port}`
    );
  });
}

run();
