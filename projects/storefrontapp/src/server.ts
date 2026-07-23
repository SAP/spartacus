/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// SPIKE — base-site detection approaches
// Switch approach by commenting/uncommenting ONE block below.
// See: core-libs/setup/ssr/site-context/base-site-resolver.ts for the shared interface.
// See: adr-base-site-detection-ssr.md for the full comparison.

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

// ── Approach (a): Pure Node ───────────────────────────────────────────────────
// Plain fetch() + AbortController + in-memory cache. No Angular overhead.
// import { PureNodeBaseSiteResolver } from '../../../core-libs/setup/ssr/site-context/pure-node-base-site-resolver';
// const baseSiteResolver = new PureNodeBaseSiteResolver({
//   occBaseUrl: buildProcess.env.CX_BASE_URL,
//   timeoutMs: 3000,
//   cacheTtlMs: 60_000,
// });

// ── Approach (b): createApplication() ────────────────────────────────────────
// Boots a minimal Angular app (HttpClient only) once at startup; caches base sites.
import { AngularAppBaseSiteResolver } from '../../../core-libs/setup/ssr/site-context/angular-app-base-site-resolver';
const baseSiteResolver = new AngularAppBaseSiteResolver({
  occBaseUrl: buildProcess.env.CX_BASE_URL,
  timeoutMs: 3000,
  cacheTtlMs: 60_000,
});

// ── Approach (c): Angular-native ─────────────────────────────────────────────
// baseSiteId is resolved inside the Angular SSR pipeline via AiSeoBaseSiteService.
// Enable provideAiSeoBaseSiteDetection() in app.config.server.ts.
// Comment out baseSiteResolver usages and the llms.txt handler below.

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  cache: process.env['SSR_CACHE'] === 'true',
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

/**
 * Returns the full absolute URL for the given Express request.
 * Mirrors the logic in express-utils/express-request-url.ts.
 */
function getFullUrl(req: express.Request): string {
  const proto = req.get('X-Forwarded-Proto') ?? req.protocol;
  const host = req.get('X-Forwarded-Host') ?? req.get('host') ?? 'localhost';
  return `${proto}://${host}${req.originalUrl}`;
}

// The Express app is exported so that it can be used by serverless Functions.
// SPIKE: app() is now async to allow resolver.initialize() to warm up before serving.
export async function app(): Promise<express.Express> {
  // ── Approach (a) ──
  // ── Approach (b) ──
  // shared wiring — warm up cache once before serving requests
  await baseSiteResolver.initialize();

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

  // ── Approach (a) ──
  // ── Approach (b) ──
  // shared wiring — SPIKE debug, remove before merge
  // Logs the resolved baseSiteId per request via baseSiteResolver.resolve().
  server.use(async (req, _res, next) => {
    const id = await baseSiteResolver.resolve(getFullUrl(req));
    console.log(`[spike] ${req.path} → ${id ?? '(null)'}`);
    next();
  });

  // Serve static files from /browser
  server.get(
    /.*\..*/,
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // ── Approach (a) ──
  // ── Approach (b) ──
  // shared wiring — non-render handler consuming baseSiteResolver
  // SPIKE: llms.txt — example non-render handler using approach (a) or (b).
  // Unlike robots.txt (origin-root only, RFC 9309), llms.txt MAY be nested under a
  // path. The regex below matches BOTH:
  //   • /llms.txt            → no site prefix → resolve() returns null → default
  //   • /{baseSite}/llms.txt → prefix present → resolve() matches urlPattern → per-site
  // This is the case where path-based multi-site IS resolvable — the site info is
  // in the nested URL, so approach (a) achieves the goal.
  //
  // ── Approach (c): DISABLED for (c) ──
  // When testing (c): comment this block out so the request falls through to the
  // Angular catch-all below and is handled by the Angular route (LlmsTxtComponent)
  // + AiSeoBaseSiteService. Active variant here is (b), so the handler is enabled.
  server.get(/\/llms\.txt$/, async (req, res) => {
    const baseSiteId = await baseSiteResolver.resolve(getFullUrl(req));
    const content = getLlmsTxt(baseSiteId);
    res.type('text/plain').send(content);
  });

  // ── Approach (a) ──
  // ── Approach (b) ──
  // ── Approach (c) ──
  // shared wiring — Angular Universal render (all regular routes).
  // For approach (c) this also serves AI-SEO routes (/llms.txt etc.) that fall
  // through here and are handled by Angular routes + AiSeoBaseSiteService.
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
 *
 * ── Approach (a) ──
 * ── Approach (b) ──
 * Consumed by the Express llms.txt handler above. Comment both out when
 * switching to approach (c).
 */
function getLlmsTxt(baseSiteId: string | null): string {
  if (!baseSiteId) {
    return '# llms.txt\n> General LLM rules — applies to all sites on this origin.\n';
  }
  return `# llms.txt\n> Site: ${baseSiteId}\n`;
}
