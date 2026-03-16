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
import { provideConfig } from '@spartacus/core';
import { defaultSitemapConfig } from '../config/sitemap-config';
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
 * ## With SSR overrides
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator({
 *     baseUrl: 'https://my-storefront.com',  // override public URL
 *     baseSiteFilter: ['electronics-spa', 'powertools-spa'],  // optional filter
 *   }),
 * ]
 * ```
 *
 * ## With sitemap config (Spartacus Config pattern)
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator(),
 *   provideConfig({
 *     sitemap: {
 *       maxUrlsPerSitemap: 50,  // for testing; default is 50000 per sitemaps.org
 *     },
 *   } as SitemapConfig),
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
 * 2. Fetches all baseSites from OCC and iterates over them
 * 3. For each baseSite, resolves context (languages, currencies, urlEncodingAttributes)
 * 4. Runs all registered `SITEMAP_URL_PROVIDERS` (default: ProductSitemapProvider)
 * 5. URLs generated using real SemanticPathService (respects customer's RoutingConfig)
 * 6. OCC endpoint uses `productSearch.sitemap` scope from OccConfig
 * 7. Generated XML stored in shared state → Express serves it
 *
 * ## URL encoding
 *
 * The `urlEncodingAttributes` from each baseSite determines what appears in URLs:
 * - `['storefront', 'language', 'currency']` → `/powertools-spa/en/USD/product/123`
 * - `['storefront', 'language']` → `/electronics-spa/en/product/123`
 * - `['language']` → `/en/product/123`
 *
 * ## Sitemap file limits
 *
 * Per sitemaps.org protocol, each sitemap file can contain max 50,000 URLs.
 * When exceeded, files are split with numeric suffixes:
 * - `sitemap-products-en-1.xml`
 * - `sitemap-products-en-2.xml`
 *
 * @param ssrConfig - Optional SSR-specific overrides for baseUrl/occBaseUrl/baseSiteFilter
 */
export function provideSitemapGenerator(
  ssrConfig?: SitemapSsrConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Default sitemap configuration (can be overridden via provideConfig)
    provideConfig(defaultSitemapConfig),
    // Optional SSR config overrides
    ...(ssrConfig
      ? [{ provide: SITEMAP_SSR_CONFIG, useValue: ssrConfig }]
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

