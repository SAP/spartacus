/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Express } from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Options for serving static sitemap files from disk.
 */
export interface StaticSitemapServingOptions {
  /**
   * Directory where sitemap XML files are stored on disk.
   * This is the same directory used as `--output` in the CLI.
   * Default: `./dist/sitemaps`
   */
  sitemapDir?: string;

  /**
   * URL path prefix for individual sitemap files.
   * Default: `/sitemaps`
   */
  servePath?: string;

  /**
   * Cache-Control max-age in seconds for sitemap responses.
   * Default: 3600 (1 hour)
   */
  maxAge?: number;
}

/**
 * Sets up Express routes to serve pre-generated sitemap XML files from disk.
 *
 * This is the **recommended** approach for production deployments.
 * Unlike `setupSitemapServing()` (which serves from in-memory shared state),
 * this middleware reads files from disk, making it:
 *
 * - **Cluster-safe**: All Node.js pods serve the same files from a shared volume or CDN
 * - **Memory-efficient**: No XML content held in process memory
 * - **Decoupled**: Generation (CLI) and serving (Express) are independent
 * - **CDN-friendly**: Files can be served directly by nginx/CDN, bypassing Node entirely
 *
 * ## Usage
 *
 * ```typescript
 * // server.ts
 * import { setupStaticSitemapServing } from '@spartacus/setup/sitemaps';
 *
 * const server = express();
 * setupStaticSitemapServing(server, {
 *   sitemapDir: '/var/www/sitemaps',  // directory with generated XML files
 * });
 * ```
 *
 * ## File structure expected
 *
 * ```
 * /var/www/sitemaps/
 * ├── sitemap.xml                              # Master index
 * ├── electronics-spa/
 * │   ├── sitemap-en.xml
 * │   └── sitemap-de.xml
 * └── apparel-uk-spa/
 *     ├── sitemap-en-1.xml
 *     └── sitemap-en-2.xml
 * ```
 *
 * ## Deployment patterns
 *
 * ### Pattern 1: Shared volume (simplest)
 * ```
 * Cron Pod → writes to shared PVC → SSR Pods read from same PVC
 * ```
 *
 * ### Pattern 2: CDN (recommended for large sites)
 * ```
 * Cron Pod → writes to blob storage → CDN serves directly
 * SSR Pods not involved in sitemap serving at all
 * ```
 *
 * ### Pattern 3: Single pod generation
 * ```
 * Kubernetes CronJob → generates files → uploads to all pods via sidecar/init-container
 * ```
 */
export function setupStaticSitemapServing(
  app: Express,
  options: StaticSitemapServingOptions = {}
): void {
  const sitemapDir = options.sitemapDir || './dist/sitemaps';
  const servePath = options.servePath || '/sitemaps';
  const maxAge = options.maxAge ?? 3600;

  const cacheControl = `public, max-age=${maxAge}`;

  console.log(`[Sitemap] Static serving configured from: ${sitemapDir}`);

  // Serve /sitemap.xml (master index)
  app.get('/sitemap.xml', (_req, res) => {
    const filePath = join(sitemapDir, 'sitemap.xml');

    if (!existsSync(filePath)) {
      res.status(404).send('Sitemap index not found. Run the sitemap generator first.');
      return;
    }

    try {
      const xml = readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', cacheControl);
      res.send(xml);
    } catch (error) {
      console.error('[Sitemap] Error reading sitemap.xml:', error);
      res.status(500).send('Internal server error');
    }
  });

  // Serve /sitemaps/:baseSite/:filename
  app.get(`${servePath}/:baseSite/:filename`, (req, res) => {
    const baseSite = req.params['baseSite'];
    const filename = req.params['filename'];
    const filePath = join(sitemapDir, baseSite, filename);

    if (!existsSync(filePath)) {
      res.status(404).send(`Sitemap file '${baseSite}/${filename}' not found.`);
      return;
    }

    try {
      const xml = readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', cacheControl);
      res.send(xml);
    } catch (error) {
      console.error(`[Sitemap] Error reading ${baseSite}/${filename}:`, error);
      res.status(500).send('Internal server error');
    }
  });

  // Legacy: /sitemaps/:filename (single-site)
  app.get(`${servePath}/:filename`, (req, res) => {
    const filename = req.params['filename'];
    const filePath = join(sitemapDir, filename);

    if (!existsSync(filePath)) {
      res.status(404).send(`Sitemap file '${filename}' not found.`);
      return;
    }

    try {
      const xml = readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', cacheControl);
      res.send(xml);
    } catch (error) {
      console.error(`[Sitemap] Error reading ${filename}:`, error);
      res.status(500).send('Internal server error');
    }
  });

  // Status endpoint
  app.get('/sitemap-status', (_req, res) => {
    const indexExists = existsSync(join(sitemapDir, 'sitemap.xml'));
    res.json({
      mode: 'static-files',
      sitemapDir,
      indexExists,
    });
  });
}

