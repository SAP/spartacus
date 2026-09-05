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
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'path';
import bootstrap from './main.server';
import { defaultBaseSiteId } from './app/spartacus/base-site.config';
import { environment } from './environments/environment';
import { PureNodeBaseSiteResolver } from '../../../core-libs/setup/ssr/base-site/pure-node-base-site-resolver';
import { createBaseSiteRequestHandler } from '../../../core-libs/setup/ssr/base-site/base-site-request-handler';
import { extractOccBaseUrlFromHtml } from '../../../core-libs/setup/ssr/base-site/occ-base-url-extractor';

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

const _serverDistFolder = dirname(fileURLToPath(import.meta.url));
const _indexHtmlContent = readFileSync(
  join(_serverDistFolder, 'index.server.html'),
  'utf-8'
);
const { occBaseUrl, resolver: baseSiteResolver } =
  createBaseSiteResolver(_serverDistFolder);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const browserDistFolder = resolve(_serverDistFolder, '../browser');
  const indexHtml = join(_serverDistFolder, 'index.server.html');

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

  // Serves a per-site llms.txt. The framework handler resolves the baseSiteId
  // (and maps overload / OCC outages to 503); the app supplies only the route
  // and the body via `getLlmsTxt`.
  if (baseSiteResolver) {
    server.get(
      /\/llms\.txt$/,
      createBaseSiteRequestHandler({
        resolver: baseSiteResolver,
        render: getLlmsTxt,
      })
    );
  }

  // All regular routes use the Universal engine
  server.get(/.*/, (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  server.use(defaultExpressErrorHandlers(_indexHtmlContent));

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

function createBaseSiteResolver(serverDistFolder: string): {
  occBaseUrl: string | null;
  resolver: PureNodeBaseSiteResolver | null;
} {
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const browserIndexPath = existsSync(join(browserDistFolder, 'index.csr.html'))
    ? join(browserDistFolder, 'index.csr.html')
    : join(browserDistFolder, 'index.html');
  const occBaseUrl =
    environment.occBaseUrl ||
    extractOccBaseUrlFromHtml(readFileSync(browserIndexPath, 'utf-8')) ||
    null;

  if (!occBaseUrl) {
    /* eslint-disable-next-line no-console */
    console.warn(
      '[base-site-resolver] OCC base URL not configured — AI-SEO handlers disabled. ' +
        'Set CX_BASE_URL or substitute the occ-backend-base-url meta tag in index.server.html.'
    );
    return { occBaseUrl: null, resolver: null };
  }

  return {
    occBaseUrl,
    resolver: new PureNodeBaseSiteResolver({
      occBaseUrl,
      timeoutMs: 3000,
      defaultBaseSite: defaultBaseSiteId,
    }),
  };
}

function getLlmsTxt(baseSiteId: string | null): string {
  if (!baseSiteId) {
    return `# llms.txt\n> General LLM rules — applies to all sites on this origin.\n> OCC base URL: ${occBaseUrl}\n`;
  }
  return `# llms.txt\n> Site: ${baseSiteId}\n> OCC base URL: ${occBaseUrl}\n`;
}
