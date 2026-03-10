/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Injector,
  makeEnvironmentProviders,
  PLATFORM_ID,
  runInInjectionContext,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import {
  SitemapConfigExtractorService,
  SitemapSsrConfig,
  SITEMAP_SSR_CONFIG,
} from './sitemap-config-extractor.service';

/**
 * Factory function for APP_INITIALIZER that triggers sitemap generation.
 *
 * IMPORTANT: This blocks the first SSR render until sitemaps are generated.
 * This is required because Angular SSR creates a new injector per request,
 * and the injector (with SemanticPathService, BaseSiteService, etc.) is
 * destroyed after the render completes. We must finish generation while
 * the injector is still alive.
 *
 * Subsequent SSR renders skip generation immediately (isReady check).
 */
function sitemapGeneratorInitializerFactory(
  platformId: Object,
  injector: Injector
): () => Promise<void> {
  return async () => {
    if (isPlatformServer(platformId)) {
      await runInInjectionContext(injector, async () => {
        const service = injector.get(SitemapConfigExtractorService);
        // Block until generation completes — we need the injector alive
        await service.generateSitemaps();
      });
    }
  };
}

/**
 * Provides the sitemap generator for SSR.
 *
 * This is the main entry point for sitemap generation.
 * Add to your server configuration to enable automatic sitemap generation
 * using real Angular services (SemanticPathService, BaseSiteService, etc.).
 *
 * ## Usage
 *
 * ```typescript
 * // app.config.server.ts
 * import { provideSitemapGenerator } from '@spartacus/setup/sitemaps';
 *
 * export const serverConfig: ApplicationConfig = {
 *   providers: [
 *     provideSitemapGenerator({
 *       baseUrl: 'https://example.com',
 *       occBaseUrl: 'https://api.example.com',
 *     }),
 *   ],
 * };
 * ```
 *
 * ## How it works
 *
 * 1. During first SSR render, APP_INITIALIZER blocks and generates sitemaps
 *    (subsequent SSR renders skip this — isReady check returns immediately)
 * 2. SitemapConfigExtractorService fetches products from OCC API
 * 3. URLs are generated using the REAL SemanticPathService (respects customer's RoutingConfig)
 * 4. Complete XML sitemaps are stored in shared state (Node.js process memory)
 * 5. Express middleware (setupSitemapServing) serves the pre-generated XML
 *
 * Customer routing customizations are automatically picked up.
 *
 * @param config - Sitemap configuration (baseUrl, occBaseUrl)
 */
export function provideSitemapGenerator(
  config: SitemapSsrConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: SITEMAP_SSR_CONFIG, useValue: config },
    SitemapConfigExtractorService,
    {
      provide: APP_INITIALIZER,
      useFactory: sitemapGeneratorInitializerFactory,
      deps: [PLATFORM_ID, Injector],
      multi: true,
    },
  ]);
}

/**
 * @deprecated Use `provideSitemapGenerator()` instead.
 * This is kept for backward compatibility.
 */
export const provideSitemapConfigExtractor = provideSitemapGenerator;
