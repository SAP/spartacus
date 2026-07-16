/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_BASE_HREF } from '@angular/common';
import {
  NgExpressEngineDecorator,
  SsrOptimizationOptions,
  defaultExpressErrorHandlers,
  defaultSsrOptimizationOptions,
  ngExpressEngine as engine,
} from '@spartacus/setup/ssr';
import express from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'path';
import bootstrap from './main.server';

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
};

// By default (no `allowedOrigins`), Spartacus trusts the request origin as
// delivered by the trusted reverse proxy, gated by the `trust proxy` setting
// below. Deployments that know their set of valid domains can additionally
// pass a defense-in-depth allowlist against Host header injection / cache
// poisoning.
//
// The allowlist is read from the `SSR_ALLOWED_ORIGINS` environment variable
// (comma-separated), so it can be configured per environment without code
// changes, e.g.:
//   SSR_ALLOWED_ORIGINS="https://my.storefront.com,https://*.my.storefront.com"
// Each entry must be a full origin with no trailing slash. A `*` wildcard
// matches exactly one host label (it never crosses a dot or matches the apex),
// and the first entry is used as the fallback when a request origin is not
// allowed, so list the primary/canonical domain first. When the variable is
// unset or empty, `allowedOrigins` is `undefined` / `[]` and the default
// (opt-in) behavior is preserved.
const allowedOrigins = process.env['SSR_ALLOWED_ORIGINS']
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions, {
  allowedOrigins,
});

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const indexHtmlContent = readFileSync(indexHtml, 'utf-8');

  server.set('trust proxy', 'loopback');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap,
    })
  );

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(
    /.*\..*/,
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get(/.*/, (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  server.use(defaultExpressErrorHandlers(indexHtmlContent));

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    /* eslint-disable-next-line no-console
    --
    It's just an example application file. This message is not crucial
    to be logged using any special logger. Moreover, we don't have
    any special logger available in this context. */
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
