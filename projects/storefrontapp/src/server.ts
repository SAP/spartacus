/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// SPIKE — base-site detection, approach (b): createApplication().
// See: core-libs/setup/ssr/site-context/base-site-resolver.ts for the shared interface.
// See: adr-base-site-detection-ssr.md for the full comparison.

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
import { getRequestUrl } from '../../../core-libs/setup/ssr/express-utils/express-request-url';

// Approach (b): createApplication() — cacheless. Each resolve() boots a
// minimal Angular app (HttpClient only) and fetches base-sites from OCC.
import { AngularAppBaseSiteResolver } from '../../../core-libs/setup/ssr/site-context/angular-app-base-site-resolver';
import { OccUnavailableError } from '../../../core-libs/setup/ssr/site-context/base-site-resolver';
const baseSiteResolver = new AngularAppBaseSiteResolver({
  occBaseUrl: buildProcess.env.CX_BASE_URL,
  timeoutMs: 3000,
  // In production this comes from the app's SiteContextConfig context.baseSite[0].
  defaultBaseSite: 'electronics-spa',
});

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

// The Express app is exported so that it can be used by serverless Functions.
// SPIKE: app() is async so the resolver can warm the platform-server module
// graph before serving (initialize() does not fetch or cache).
export async function app(): Promise<express.Express> {
  // Warm the platform-server module graph once before serving requests.
  await baseSiteResolver.initialize();

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

  // SPIKE: llms.txt — example non-render handler consuming the resolver.
  // Unlike robots.txt (origin-root only, RFC 9309), llms.txt MAY be nested under a
  // path. The regex below matches BOTH:
  //   • /llms.txt            → no site prefix → resolve() returns null → default
  //   • /{baseSite}/llms.txt → prefix present → resolve() matches urlPattern → per-site
  server.get(/\/llms\.txt$/, async (req, res, next) => {
    try {
      const baseSiteId = await baseSiteResolver.resolve(getRequestUrl(req));
      const content = getLlmsTxt(baseSiteId);
      res.type('text/plain').send(content);
    } catch (err) {
      // resolve() throws OccUnavailableError on render timeout/failure — map to
      // 503 + Retry-After rather than serving default content on a failed OCC.
      if (err instanceof OccUnavailableError) {
        res.set('Retry-After', '5').status(503).type('text/plain').send('');
        return;
      }
      next(err);
    }
  });

  // Angular Universal render — all regular routes.
  server.get(/.*/, (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  server.use(defaultExpressErrorHandlers(indexHtmlContent));

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
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

/**
 * SPIKE stub — returns per-site llms.txt content.
 * In production this would read from config / CMS.
 * Consumed by the Express llms.txt handler above.
 */
function getLlmsTxt(baseSiteId: string | null): string {
  if (!baseSiteId) {
    return '# llms.txt\n> General LLM rules — applies to all sites on this origin.\n';
  }
  return `# llms.txt\n> Site: ${baseSiteId}\n`;
}
