/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import express, { Express, Router } from 'express';
import express, { Express } from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
//
// /**
//  * Options for sitemap Express middleware (serving only)
//  */
// export interface SitemapServingOptions {
//   /**
//    * Directory where sitemap files are stored
//    */
//   outputDir: string;
//
//   /**
//    * URL path to serve sitemaps (default: '/sitemaps')
//    */
//   servePath?: string;
// }
//
// /**
//  * Creates Express middleware for serving sitemap files.
//  *
//  * This middleware only serves existing sitemap files.
//  * Sitemap generation should be handled by Angular services during SSR.
//  *
//  * @example
//  * ```typescript
//  * // In server.ts
//  * const sitemapRouter = createSitemapServingMiddleware({
//  *   outputDir: join(browserDistFolder, 'sitemaps'),
//  * });
//  * app.use(sitemapRouter);
//  * ```
//  */
// export function createSitemapServingMiddleware(
//   options: SitemapServingOptions
// ): Router {
//   const router = Router();
//   const servePath = options.servePath || '/sitemaps';
//
//   // Serve sitemap files with proper Content-Type
//   router.use(
//     servePath,
//     express.static(options.outputDir, {
//       setHeaders: (res, path) => {
//         if (path.endsWith('.xml')) {
//           res.setHeader('Content-Type', 'application/xml; charset=utf-8');
//         }
//       },
//     })
//   );
//
//   // Serve /sitemap.xml from root
//   router.get('/sitemap.xml', (_req, res) => {
//     const indexPath = join(options.outputDir, 'sitemap.xml');
//
//     if (existsSync(indexPath)) {
//       res.setHeader('Content-Type', 'application/xml; charset=utf-8');
//       res.sendFile(indexPath);
//     } else {
//       res.status(404).send('Sitemap not yet generated. Generate via SSR first.');
//     }
//   });
//
//   console.log(`[Sitemap] Serving middleware configured at ${servePath}`);
//
//   return router;
// }
//
// // ============================================================================
// // LEGACY SUPPORT (Node.js-only generation without Angular DI)
// // Use Angular services (SitemapGeneratorService) for new implementations
// // ============================================================================
//
// import { SitemapConfig } from '../config/sitemap-config';
// import { SitemapGenerator } from '../generator/sitemap-generator';
// import { UrlProvider } from '../providers/url-provider';
//
// /**
//  * @deprecated Use Angular-based generation with SitemapGeneratorService instead.
//  * This approach doesn't use SemanticPathService and may generate incorrect URLs.
//  */
// export interface SitemapMiddlewareOptions {
//   config: SitemapConfig;
//   providers: UrlProvider[];
//   outputDir: string;
//   servePath?: string;
//   generateOnStartup?: boolean;
// }
//
// /**
//  * @deprecated Use createSitemapServingMiddleware and Angular SitemapGeneratorService instead.
//  */
// export function createSitemapMiddleware(
//   options: SitemapMiddlewareOptions
// ): Router {
//   const router = Router();
//   const servePath = options.servePath || '/sitemaps';
//   const generateOnStartup = options.generateOnStartup ?? true;
//
//   console.warn(
//     '[Sitemap] WARNING: Using legacy Node.js-only sitemap generation. ' +
//     'This does not use SemanticPathService and may generate incorrect URLs. ' +
//     'Consider using Angular-based SitemapGeneratorService instead.'
//   );
//
//   if (generateOnStartup) {
//     generateSitemapsLegacy(options).catch((error) => {
//       console.error('[Sitemap] Failed to generate sitemaps:', error);
//     });
//   }
//
//   router.use(
//     servePath,
//     express.static(options.outputDir, {
//       setHeaders: (res, path) => {
//         if (path.endsWith('.xml')) {
//           res.setHeader('Content-Type', 'application/xml; charset=utf-8');
//         }
//       },
//     })
//   );
//
//   router.get('/sitemap.xml', (_req, res) => {
//     const indexPath = join(options.outputDir, 'sitemap.xml');
//
//     if (existsSync(indexPath)) {
//       res.setHeader('Content-Type', 'application/xml; charset=utf-8');
//       res.sendFile(indexPath);
//     } else {
//       res.status(404).send('Sitemap not yet generated');
//     }
//   });
//
//   return router;
// }
//
// async function generateSitemapsLegacy(options: SitemapMiddlewareOptions): Promise<void> {
//   console.log('[Sitemap] Generating sitemaps (legacy mode)...');
//   const generator = new SitemapGenerator(options.providers);
//   const result = await generator.generate(options.config, options.outputDir);
//   console.log(`[Sitemap] Created ${result.sitemapFiles.length} sitemap(s) with ${result.totalUrls} URLs`);
// }
//
// /**
//  * @deprecated Use createSitemapServingMiddleware and Angular SitemapGeneratorService instead.
//  */
// export function setupSitemaps(
//   app: Express,
//   options: SitemapMiddlewareOptions
// ): void {
//   const middleware = createSitemapMiddleware(options);
//   app.use(middleware);
// }

// ============================================================================
// SSR-BRIDGE APPROACH (Recommended)
// Uses shared state populated by Angular during SSR bootstrap
// ============================================================================

import { SITEMAP_SHARED_STATE, waitForSitemapState } from '../ssr-bridge/sitemap-shared-state';
import { transformRoute } from '../utils/route-utils';
import { BaseSiteService } from '../services/base-site.service';
import { writeFileSync, mkdirSync } from 'node:fs';
import { RoutesConfig } from '@spartacus/core';

/**
 * Options for SSR-bridge based sitemap middleware
 */
export interface SsrBridgeSitemapOptions {
  /**
   * Base URL for the storefront (e.g., 'https://example.com')
   */
  baseUrl: string;

  /**
   * OCC backend URL for fetching product data
   */
  occBaseUrl: string;

  /**
   * Base site ID (e.g., 'electronics-spa')
   */
  baseSiteId: string;

  /**
   * Directory to write sitemap files
   */
  outputDir: string;

  /**
   * URL path to serve sitemaps (default: '/sitemaps')
   */
  servePath?: string;

  /**
   * Timeout for waiting for Angular config (default: 30000ms)
   */
  configTimeout?: number;

  /**
   * Generate sitemaps on first request (default: true)
   */
  generateOnFirstRequest?: boolean;

  /**
   * Maximum products per page for OCC API (default: 100)
   */
  maxPageSize?: number;

  /**
   * Default currency (default: 'USD')
   */
  currency?: string;
}

/**
 * Internal state for sitemap generation
 */
interface SsrBridgeSitemapState {
  isGenerating: boolean;
  isGenerated: boolean;
  error: string | null;
  generatedFiles: string[];
  totalUrls: number;
  urlsByLanguage: Record<string, number>;
}

const sitemapGenerationState: SsrBridgeSitemapState = {
  isGenerating: false,
  isGenerated: false,
  error: null,
  generatedFiles: [],
  totalUrls: 0,
  urlsByLanguage: {},
};

/**
 * Creates Express middleware that uses routing configuration
 * extracted from Angular SSR context.
 *
 * This approach ensures that customer routing customizations
 * are automatically picked up for sitemap URL generation.
 *
 * ## How it works
 *
 * 1. Angular SSR bootstrap extracts RoutingConfig via provideSitemapConfigExtractor()
 * 2. Config is stored in shared state (Node.js memory)
 * 3. This middleware reads the config and uses UrlPathService
 * 4. Generated URLs match the actual storefront routing
 *
 * ## Requirements
 *
 * Add `provideSitemapConfigExtractor()` to your server config:
 *
 * ```typescript
 * // app.config.server.ts
 * import { provideSitemapConfigExtractor } from '@spartacus/setup/sitemaps/ssr-bridge';
 *
 * export const serverConfig: ApplicationConfig = {
 *   providers: [
 *     provideSitemapConfigExtractor(),
 *   ],
 * };
 * ```
 *
 * ## Usage
 *
 * ```typescript
 * // server.ts
 * import { setupSsrBridgeSitemaps } from '@spartacus/setup/sitemaps';
 *
 * setupSsrBridgeSitemaps(app, {
 *   baseUrl: 'https://example.com',
 *   occBaseUrl: 'https://api.example.com',
 *   baseSiteId: 'electronics-spa',
 *   outputDir: join(browserDistFolder, 'sitemaps'),
 * });
 * ```
 */
export function setupSsrBridgeSitemaps(
  app: Express,
  options: SsrBridgeSitemapOptions
): void {
  const servePath = options.servePath || '/sitemaps';
  const timeout = options.configTimeout || 30000;
  const generateOnFirstRequest = options.generateOnFirstRequest ?? true;

  console.log('[Sitemap] SSR-bridge sitemap middleware configured');
  console.log('[Sitemap] Waiting for Angular to provide routing config...');

  // Ensure output directory exists
  if (!existsSync(options.outputDir)) {
    mkdirSync(options.outputDir, { recursive: true });
  }

  // Endpoint to check sitemap status
  app.get('/sitemap-status', (_req, res) => {
    res.json({
      configReady: SITEMAP_SHARED_STATE.isReady,
      configLastUpdated: SITEMAP_SHARED_STATE.lastUpdated,
      routes: SITEMAP_SHARED_STATE.routingConfig
        ? Object.keys(SITEMAP_SHARED_STATE.routingConfig)
        : null,
      urlEncodingParams: SITEMAP_SHARED_STATE.urlEncodingParams,
      generation: {
        isGenerating: sitemapGenerationState.isGenerating,
        isGenerated: sitemapGenerationState.isGenerated,
        error: sitemapGenerationState.error,
        files: sitemapGenerationState.generatedFiles,
        totalUrls: sitemapGenerationState.totalUrls,
        urlsByLanguage: sitemapGenerationState.urlsByLanguage,
      },
    });
  });

  // Serve existing sitemap files
  app.use(servePath, express.static(options.outputDir, {
    setHeaders: (res, path) => {
      if (path.endsWith('.xml')) {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      }
    },
  }));

  // Main sitemap.xml endpoint
  app.get('/sitemap.xml', async (_req, res) => {
    const indexPath = join(options.outputDir, 'sitemap.xml');

    // If already generated, serve it
    if (existsSync(indexPath) && sitemapGenerationState.isGenerated) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.sendFile(indexPath);
      return;
    }

    // If generation is in progress, wait for it
    if (sitemapGenerationState.isGenerating) {
      // Wait up to 60 seconds for generation to complete
      const maxWait = 60000;
      const startWait = Date.now();

      while (sitemapGenerationState.isGenerating && (Date.now() - startWait) < maxWait) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (existsSync(indexPath)) {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.sendFile(indexPath);
        return;
      }
    }

    // Trigger generation on first request
    if (generateOnFirstRequest && !sitemapGenerationState.isGenerated && !sitemapGenerationState.isGenerating) {
      try {
        await generateSitemapsWithAngularConfig(options, timeout);

        if (existsSync(indexPath)) {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.sendFile(indexPath);
          return;
        }
      } catch (error) {
        console.error('[Sitemap] Error generating sitemaps:', error);
        res.status(503).send('Sitemap generation failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
        return;
      }
    }

    res.status(404).send('Sitemap not yet generated');
  });

  // Endpoint to trigger manual generation
  app.post('/sitemap-generate', async (_req, res) => {
    if (sitemapGenerationState.isGenerating) {
      res.json({
        status: 'already_generating',
        message: 'Sitemap generation is already in progress',
      });
      return;
    }

    try {
      const result = await generateSitemapsWithAngularConfig(options, timeout);
      res.json({
        status: 'success',
        ...result,
      });
    } catch (error) {
      res.status(503).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}

/**
 * Generates sitemaps using Angular routing config from shared state
 */
async function generateSitemapsWithAngularConfig(
  options: SsrBridgeSitemapOptions,
  timeout: number
): Promise<{
  files: string[];
  totalUrls: number;
  urlsByLanguage: Record<string, number>;
}> {
  sitemapGenerationState.isGenerating = true;
  sitemapGenerationState.error = null;

  try {
    // If config is not ready yet, we need to trigger an SSR render first
    // This happens when /sitemap.xml is requested before any other page
    if (!SITEMAP_SHARED_STATE.isReady) {
      console.log('[Sitemap] Config not ready. Triggering warmup request to bootstrap Angular...');
      console.log('[Sitemap] Note: First regular SSR request will initialize the config.');
      console.log('[Sitemap] Waiting for Angular routing config...');
    }

    const state = await waitForSitemapState(timeout);

    if (!state.routingConfig) {
      throw new Error('Routing config not available from Angular. Make sure provideSitemapConfigExtractor() is added to server config and at least one SSR render has completed.');
    }

    console.log('[Sitemap] Angular config received. Starting generation...');
    console.log(`[Sitemap] Routes count: ${Object.keys(state.routingConfig).length}`);

    // Log product route specifically
    const productRoute = state.routingConfig['product'];
    if (productRoute) {
      console.log(`[Sitemap] Product route paths: ${productRoute.paths?.join(', ')}`);
      console.log(`[Sitemap] Product route paramsMapping: ${JSON.stringify(productRoute.paramsMapping)}`);
    }

    console.log(`[Sitemap] URL encoding params: ${state.urlEncodingParams?.join(', ') ?? 'default'}`);

    // Routing config from Angular - will be used for URL generation
    const routingConfig = state.routingConfig as RoutesConfig;

    // Test product URL generation
    const testUrl = transformRoute(routingConfig, 'product', { code: 'TEST123', name: 'Test Product' });
    console.log(`[Sitemap] Test product URL: ${testUrl}`);

    // Fetch languages from basesites API
    const baseSiteService = new BaseSiteService(options.occBaseUrl);
    const languages = await baseSiteService.getLanguages(options.baseSiteId);
    const urlEncodingAttributes = state.urlEncodingParams ||
      await baseSiteService.getUrlEncodingAttributes(options.baseSiteId);

    if (languages.length === 0) {
      console.warn('[Sitemap] No languages found! Using default "en".');
      languages.push({ isocode: 'en', active: true });
    }

    console.log(`[Sitemap] Generating sitemaps for ${languages.length} language(s): ${languages.map(l => l.isocode).join(', ')}`);

    const sitemapFiles: string[] = [];
    let totalUrls = 0;
    const urlsByLanguage: Record<string, number> = {};
    const currency = options.currency || 'USD';
    const maxPageSize = options.maxPageSize || 100;

    // Generate sitemap for each language
    for (const lang of languages) {
      const urls = await fetchProductsForLanguage(
        options,
        routingConfig,
        lang.isocode,
        currency,
        urlEncodingAttributes,
        maxPageSize
      );

      if (urls.length > 0) {
        const filename = `sitemap-products-${lang.isocode}.xml`;
        const filepath = join(options.outputDir, filename);
        const xml = buildSitemapXml(urls);
        writeFileSync(filepath, xml, 'utf-8');

        sitemapFiles.push(filename);
        totalUrls += urls.length;
        urlsByLanguage[lang.isocode] = urls.length;

        console.log(`[Sitemap] Created ${filename} with ${urls.length} URLs`);
      }
    }

    // Generate sitemap index
    const indexPath = join(options.outputDir, 'sitemap.xml');
    const indexXml = buildSitemapIndexXml(sitemapFiles, options.baseUrl);
    writeFileSync(indexPath, indexXml, 'utf-8');

    console.log(`[Sitemap] Generation complete. ${sitemapFiles.length} files, ${totalUrls} total URLs`);

    // Update state
    sitemapGenerationState.isGenerated = true;
    sitemapGenerationState.generatedFiles = sitemapFiles;
    sitemapGenerationState.totalUrls = totalUrls;
    sitemapGenerationState.urlsByLanguage = urlsByLanguage;

    return { files: sitemapFiles, totalUrls, urlsByLanguage };

  } catch (error) {
    sitemapGenerationState.error = error instanceof Error ? error.message : 'Unknown error';
    throw error;
  } finally {
    sitemapGenerationState.isGenerating = false;
  }
}

/**
 * Fetches products for a specific language and generates URLs
 */
async function fetchProductsForLanguage(
  options: SsrBridgeSitemapOptions,
  routingConfig: RoutesConfig,
  language: string,
  currency: string,
  urlEncodingAttributes: string[],
  maxPageSize: number
): Promise<Array<{ loc: string; changefreq: string; priority: number }>> {
  const urls: Array<{ loc: string; changefreq: string; priority: number }> = [];
  let currentPage = 0;
  let totalPages = 1;

  // Build URL prefix from urlEncodingAttributes
  const urlPrefix = buildUrlPrefix(options.baseSiteId, language, currency, urlEncodingAttributes);
  console.log(`[Sitemap] URL prefix for ${language}: ${urlPrefix}`);

  do {
    const params = new URLSearchParams({
      fields: 'products(code,name)',
      pageSize: String(maxPageSize),
      currentPage: String(currentPage),
      lang: language,
      curr: currency,
    });

    const searchUrl = `${options.occBaseUrl}/occ/v2/${options.baseSiteId}/products/search?${params}`;

    try {
      const response = await fetch(searchUrl);

      if (!response.ok) {
        console.error(`[Sitemap] Failed to fetch products: ${response.status}`);
        break;
      }

      const data = await response.json();
      const products = data.products || [];

      for (const product of products) {
        if (product.code) {
          // Use transformRoute with Angular routing config
          const productPath = transformRoute(routingConfig, 'product', {
            code: product.code,
            name: product.name,
          });

          const fullPath = urlPrefix + (productPath || `/product/${product.code}`);

          urls.push({
            loc: `${options.baseUrl}${fullPath}`,
            changefreq: 'daily',
            priority: 0.8,
          });
        }
      }

      totalPages = data.pagination?.totalPages ?? 1;
      currentPage++;

    } catch (error) {
      console.error(`[Sitemap] Error fetching products:`, error);
      break;
    }

  } while (currentPage < totalPages);

  console.log(`[Sitemap] Found ${urls.length} products for ${language}`);
  return urls;
}

/**
 * Builds URL prefix based on urlEncodingAttributes
 */
function buildUrlPrefix(
  baseSiteId: string,
  language: string,
  currency: string,
  urlEncodingAttributes: string[]
): string {
  // Map 'storefront' to 'baseSite'
  const attributes = urlEncodingAttributes.map(attr =>
    attr === 'storefront' ? 'baseSite' : attr
  );

  const values: Record<string, string> = {
    baseSite: baseSiteId,
    language: language,
    currency: currency,
  };

  const prefix = attributes
    .map(attr => values[attr] || '')
    .filter(v => v)
    .join('/');

  return prefix ? `/${prefix}` : '';
}

/**
 * Builds XML content for a sitemap file
 */
function buildSitemapXml(urls: Array<{ loc: string; changefreq?: string; priority?: number }>): string {
  const urlEntries = urls.map(url => {
    const parts = [`  <url>`, `    <loc>${escapeXml(url.loc)}</loc>`];

    if (url.changefreq) {
      parts.push(`    <changefreq>${url.changefreq}</changefreq>`);
    }
    if (url.priority !== undefined) {
      parts.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
    }

    parts.push(`  </url>`);
    return parts.join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Builds sitemap index XML
 */
function buildSitemapIndexXml(sitemapFiles: string[], baseUrl: string): string {
  const today = new Date().toISOString().split('T')[0];

  const sitemapEntries = sitemapFiles.map(file =>
    `  <sitemap>
    <loc>${baseUrl}/sitemaps/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Escapes special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
