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
  getOriginValidationMiddleware,
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

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const indexHtmlContent = readFileSync(indexHtml, 'utf-8');

  server.set('trust proxy', 'loopback');

  // Validates the resolved request origin against an allowlist. See the JSDoc
  // of `getOriginValidationMiddleware` for the accepted formats and matching
  // rules. Here it is read from the `SSR_ALLOWED_ORIGINS` environment variable
  // (comma-separated); when unset or empty the middleware is a no-op.
  server.use(
    getOriginValidationMiddleware({
      allowedOrigins: process.env['SSR_ALLOWED_ORIGINS'],
    })
  );

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
    const start = Date.now();
    console.log(`[SSR][florent request] ${req.method} ${req.url}`);
    res.render(
      indexHtml,
      {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      },
      (err, html) => {
        const duration = Date.now() - start;
        if (err) {
          console.error(`[SSR][florent error] ${req.url} (${duration}ms)`, err);
          res.status(500).send(indexHtmlContent);
          return;
        }
        const isLoginOrRegister =
          req.url.includes('/login') || req.url.includes('/register');
        if (isLoginOrRegister && html) {
          const formMatch = html.match(
            /<cx-login-form[^>]*>[\s\S]*?<\/cx-login-form>|<cx-register[^>]*>[\s\S]*?<\/cx-register>/
          );
          console.log(
            `[SSR][florent] ${req.url} (${duration}ms) — form component in HTML: ${!!formMatch}`
          );
          if (formMatch) {
            console.log(
              '[SSR][florent rendered] form snippet:',
              formMatch[0].slice(0, 400)
            );
          }
        } else {
          console.log(`[SSR][florent rendered] ${req.url} (${duration}ms)`);
        }
        res.send(html);
      }
    );
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
