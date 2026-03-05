/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview
 * Example of integrating sitemap SSR-Bridge with Spartacus.
 *
 * This example shows how to:
 * 1. Add provideSitemapConfigExtractor() to server config
 * 2. Configure setupSsrBridgeSitemaps() in server.ts
 *
 * The result: Generated sitemap URLs will automatically match
 * your application's routing configuration, including any
 * customer customizations.
 */

// =============================================================================
// STEP 1: app.config.server.ts
// =============================================================================

/*
import {
  ApplicationConfig,
  mergeApplicationConfig,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideSitemapConfigExtractor } from '@spartacus/setup/sitemaps';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),

    // Add this line to extract routing config for sitemaps
    provideSitemapConfigExtractor(),

    // ... other providers
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
*/

// =============================================================================
// STEP 2: server.ts
// =============================================================================

/*
import { setupSsrBridgeSitemaps } from '@spartacus/setup/sitemaps';
import express from 'express';
import { join, resolve } from 'path';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  // SSR-Bridge Sitemaps - uses Angular routing config!
  setupSsrBridgeSitemaps(server, {
    baseUrl: process.env['SITEMAP_BASE_URL'] || 'https://localhost:4000',
    occBaseUrl: process.env['SITEMAP_OCC_URL'] || 'https://your-occ-backend.com',
    baseSiteId: process.env['SITEMAP_BASE_SITE'] || 'electronics-spa',
    outputDir: join(browserDistFolder, 'sitemaps'),
  });

  // ... rest of server setup (ngExpressEngine, routes, etc.)

  return server;
}
*/

// =============================================================================
// HOW IT WORKS
// =============================================================================

/**
 * 1. When Angular bootstraps during SSR, provideSitemapConfigExtractor()
 *    triggers an APP_INITIALIZER that:
 *    - Injects RoutingConfig from Angular DI
 *    - Extracts routes configuration (paths, paramsMapping)
 *    - Writes to SITEMAP_SHARED_STATE (Node.js global)
 *
 * 2. Express middleware (setupSsrBridgeSitemaps) waits for the state
 *    to be ready via waitForSitemapState()
 *
 * 3. When /sitemap.xml is requested:
 *    - If state is ready, uses transformRoute() with real config
 *    - URLs are generated exactly as Angular would generate them
 *    - slugify() ensures URL-safe product names (matches ProductNameNormalizer)
 *
 * BENEFIT: Customer routing customizations work automatically!
 *
 * Example: If customer configured:
 *   provideConfig({
 *     routing: {
 *       routes: {
 *         product: { paths: ['p/:productCode'] }  // Custom short path
 *       }
 *     }
 *   });
 *
 * Then sitemap will generate: /p/12345 (not /product/12345/name)
 */

// =============================================================================
// TESTING
// =============================================================================

/*
# After server starts and first SSR request completes:

# 1. Check if Angular config was extracted
curl http://localhost:4000/sitemap-status
# Expected: { "ready": true, "routes": ["home", "product", ...] }

# 2. Verify URL generation works
curl -X POST http://localhost:4000/sitemap-generate
# Expected: { "testProductUrl": "/electronics-spa/en/USD/product/300938/..." }

# 3. Get sitemap
curl http://localhost:4000/sitemap.xml
*/

export {};


