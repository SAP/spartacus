/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_BASE_HREF } from '@angular/common';
import {
  NgExpressEngineDecorator,
  SsrOptimizationOptions,
  createBaseSiteAwareRoute,
  defaultExpressErrorHandlers,
  defaultSsrOptimizationOptions,
  getOriginValidationMiddleware,
  ngExpressEngine as engine,
} from '@spartacus/setup/ssr';
import express from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'path';
import { baseSite } from './app/spartacus/base-site.config';
import { environment } from './environments/environment';
import bootstrap from './main.server';

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');
const indexHtmlContent = readFileSync(indexHtml, 'utf-8');
const baseSiteAwareRoute = createBaseSiteAwareRoute({
  baseSites: baseSite,
  indexHtml: indexHtmlContent,
  occBaseUrl: environment.occBaseUrl,
});

/**
 * Example-only helper: renders a per-site llms.txt body;
 * a `null` base site yields a general document.
 */
function renderLlmsTxt(uid?: string | null): string {
  if (!uid) {
    return '# llms.txt\n> General LLM guidance for all sites on this origin.\n';
  }
  return `# llms.txt\n> Site: ${uid}\n`;
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

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

  // Serves a per-site llms.txt. Registered before the static handler because
  // `llms.txt` carries a dot and would otherwise be caught by the static route.
  server.use(
    baseSiteAwareRoute({
      route: '/llms.txt',
      withBaseSiteInPath: true,
      handler: (req, res) => {
        res.type('text/plain').send(renderLlmsTxt(req.baseSite));
      },
    })
  );

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
