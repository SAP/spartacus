/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Express, Router } from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Options for sitemap Express middleware (serving only)
 */
export interface SitemapServingOptions {
  /**
   * Directory where sitemap files are stored
   */
  outputDir: string;

  /**
   * URL path to serve sitemaps (default: '/sitemaps')
   */
  servePath?: string;
}

/**
 * Creates Express middleware for serving sitemap files.
 *
 * This middleware only serves existing sitemap files.
 * Sitemap generation should be handled by Angular services during SSR.
 *
 * @example
 * ```typescript
 * // In server.ts
 * const sitemapRouter = createSitemapServingMiddleware({
 *   outputDir: join(browserDistFolder, 'sitemaps'),
 * });
 * app.use(sitemapRouter);
 * ```
 */
export function createSitemapServingMiddleware(
  options: SitemapServingOptions
): Router {
  const router = Router();
  const servePath = options.servePath || '/sitemaps';

  // Serve sitemap files with proper Content-Type
  router.use(
    servePath,
    express.static(options.outputDir, {
      setHeaders: (res, path) => {
        if (path.endsWith('.xml')) {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        }
      },
    })
  );

  // Serve /sitemap.xml from root
  router.get('/sitemap.xml', (_req, res) => {
    const indexPath = join(options.outputDir, 'sitemap.xml');

    if (existsSync(indexPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Sitemap not yet generated. Generate via SSR first.');
    }
  });

  console.log(`[Sitemap] Serving middleware configured at ${servePath}`);

  return router;
}

// ============================================================================
// LEGACY SUPPORT (Node.js-only generation without Angular DI)
// Use Angular services (SitemapGeneratorService) for new implementations
// ============================================================================

import { SitemapConfig } from '../config/sitemap-config';
import { SitemapGenerator } from '../generator/sitemap-generator';
import { UrlProvider } from '../providers/url-provider';

/**
 * @deprecated Use Angular-based generation with SitemapGeneratorService instead.
 * This approach doesn't use SemanticPathService and may generate incorrect URLs.
 */
export interface SitemapMiddlewareOptions {
  config: SitemapConfig;
  providers: UrlProvider[];
  outputDir: string;
  servePath?: string;
  generateOnStartup?: boolean;
}

/**
 * @deprecated Use createSitemapServingMiddleware and Angular SitemapGeneratorService instead.
 */
export function createSitemapMiddleware(
  options: SitemapMiddlewareOptions
): Router {
  const router = Router();
  const servePath = options.servePath || '/sitemaps';
  const generateOnStartup = options.generateOnStartup ?? true;

  console.warn(
    '[Sitemap] WARNING: Using legacy Node.js-only sitemap generation. ' +
    'This does not use SemanticPathService and may generate incorrect URLs. ' +
    'Consider using Angular-based SitemapGeneratorService instead.'
  );

  if (generateOnStartup) {
    generateSitemapsLegacy(options).catch((error) => {
      console.error('[Sitemap] Failed to generate sitemaps:', error);
    });
  }

  router.use(
    servePath,
    express.static(options.outputDir, {
      setHeaders: (res, path) => {
        if (path.endsWith('.xml')) {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        }
      },
    })
  );

  router.get('/sitemap.xml', (_req, res) => {
    const indexPath = join(options.outputDir, 'sitemap.xml');

    if (existsSync(indexPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Sitemap not yet generated');
    }
  });

  return router;
}

async function generateSitemapsLegacy(options: SitemapMiddlewareOptions): Promise<void> {
  console.log('[Sitemap] Generating sitemaps (legacy mode)...');
  const generator = new SitemapGenerator(options.providers);
  const result = await generator.generate(options.config, options.outputDir);
  console.log(`[Sitemap] Created ${result.sitemapFiles.length} sitemap(s) with ${result.totalUrls} URLs`);
}

/**
 * @deprecated Use createSitemapServingMiddleware and Angular SitemapGeneratorService instead.
 */
export function setupSitemaps(
  app: Express,
  options: SitemapMiddlewareOptions
): void {
  const middleware = createSitemapMiddleware(options);
  app.use(middleware);
}

