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
import { defaultBaseSiteId } from './app/spartacus/base-site.config';
import { PureNodeBaseSiteResolver } from '../../../core-libs/setup/ssr/site-context/pure-node-base-site-resolver';
import { createBaseSiteRequestHandler } from '../../../core-libs/setup/ssr/site-context/base-site-request-handler';

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

// Pure-Node SSR base-site resolver (approach a). Per request it fetches the
// base sites from OCC and matches the request URL against each site's
// `urlPatterns`, falling back to the app-configured default
// (`context.baseSite[0]`) when nothing matches. Cacheless by design (see the
// resolver's JSDoc). A concurrency cap (default 10) sheds load under pressure.
const baseSiteResolver = new PureNodeBaseSiteResolver({
  occBaseUrl: buildProcess.env.CX_BASE_URL,
  timeoutMs: 3000,
  defaultBaseSite: defaultBaseSiteId,
});

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

  // Serves a per-site llms.txt. The framework handler resolves the baseSiteId
  // (and maps overload / OCC outages to 503); the app supplies only the route
  // and the body via `getLlmsTxt`.
  server.get(
    /\/llms\.txt$/,
    createBaseSiteRequestHandler({
      resolver: baseSiteResolver,
      render: getLlmsTxt,
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

function getLlmsTxt(baseSiteId: string | null): string {
  if (!baseSiteId) {
    return '# llms.txt\n> General LLM rules — applies to all sites on this origin.\n';
  }
  return `# llms.txt\n> Site: ${baseSiteId}\n`;
}
