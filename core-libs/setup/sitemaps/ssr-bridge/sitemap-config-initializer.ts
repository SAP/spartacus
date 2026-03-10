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
import { SITEMAP_URL_PROVIDERS } from '../model/sitemap-url-provider';
import { ProductSitemapProvider } from '../providers/product-sitemap-provider';

/**
 * Factory function for APP_INITIALIZER that triggers sitemap generation.
 *
 * IMPORTANT: This blocks the first SSR render until sitemaps are generated.
 * Angular SSR creates a new injector per request, and the injector
 * (with SemanticPathService, etc.) is destroyed after render completes.
 * We must finish generation while the injector is still alive.
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
 * ## Basic usage (zero-config)
 *
 * Uses `OccConfig.backend.occ.baseUrl` automatically:
 *
 * ```typescript
 * // app.config.server.ts
 * providers: [
 *   provideSitemapGenerator(),
 * ]
 * ```
 *
 * ## With overrides
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator({
 *     baseUrl: 'https://my-storefront.com',  // override public URL
 *   }),
 * ]
 * ```
 *
 * ## With custom URL providers
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator(),
 *   { provide: SITEMAP_URL_PROVIDERS, useClass: CategorySitemapProvider, multi: true },
 * ]
 * ```
 *
 * ## How it works
 *
 * 1. First SSR render triggers generation (subsequent renders skip)
 * 2. Resolves site context from Angular DI (baseSite, languages, currencies)
 * 3. Runs all registered `SITEMAP_URL_PROVIDERS` (default: ProductSitemapProvider)
 * 4. URLs generated using real SemanticPathService (respects customer's RoutingConfig)
 * 5. OCC endpoint uses `productSearch.sitemap` scope from OccConfig
 * 6. Generated XML stored in shared state → Express serves it
 *
 * @param config - Optional overrides for baseUrl/occBaseUrl
 */
export function provideSitemapGenerator(
  config?: SitemapSsrConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Optional config overrides
    ...(config
      ? [{ provide: SITEMAP_SSR_CONFIG, useValue: config }]
      : []),
    // Default product URL provider
    {
      provide: SITEMAP_URL_PROVIDERS,
      useClass: ProductSitemapProvider,
      multi: true,
    },
    // Orchestrator service
    SitemapConfigExtractorService,
    // APP_INITIALIZER trigger
    {
      provide: APP_INITIALIZER,
      useFactory: sitemapGeneratorInitializerFactory,
      deps: [PLATFORM_ID, Injector],
      multi: true,
    },
  ]);
}

