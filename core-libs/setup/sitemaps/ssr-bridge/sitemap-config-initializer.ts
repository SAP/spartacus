/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
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
import { ROUTE_PARAMS_ENUMERATOR } from '../model/route-params-enumerator';
import { ProductRouteParamsEnumerator } from '../enumerators/product-route-params-enumerator';
import { StaticRouteParamsEnumerator } from '../enumerators/static-route-params-enumerator';
import { RoutesDiscoveryService } from '../services/routes-discovery.service';
import { SiteContextAwareRoutesDiscoveryService } from '../services/site-context-aware-routes-discovery.service';
import { SitemapGeneratorService } from '../services/sitemap-generator.service';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';

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
 * ## Basic usage
 *
 * ```typescript
 * // app.config.server.ts
 * providers: [
 *   provideSitemapGenerator({
 *     baseUrls: {
 *       'electronics-spa': 'https://electronics.example.com',
 *       'apparel-uk-spa': 'https://apparel-uk.example.com',
 *     },
 *   }),
 * ]
 * ```
 *
 * ## With SSR overrides
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator({
 *     baseUrls: {
 *       'electronics-spa': 'https://electronics.example.com',
 *     },
 *     occBaseUrl: 'https://internal-api.example.com',
 *   }),
 * ]
 * ```
 *
 * ## With custom route parameter enumerators
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator({
 *     baseUrls: { 'electronics-spa': 'https://electronics.example.com' },
 *   }),
 *   { provide: ROUTE_PARAMS_ENUMERATOR, useClass: CategoryRouteParamsEnumerator, multi: true },
 * ]
 * ```
 *
 * ## Default enumerators
 *
 * 1. `StaticRouteParamsEnumerator` - Fallback for routes without parameters
 * 2. `ProductRouteParamsEnumerator` - Products from OCC
 *
 * ## Architecture
 *
 * ```
 * SitemapConfigExtractorService (orchestrator)
 *     └─► SitemapGeneratorService
 *         └─► SiteContextAwareRoutesDiscoveryService
 *             └─► RoutesDiscoveryService
 *                 └─► ROUTE_PARAMS_ENUMERATOR[]
 *                     ├─ StaticRouteParamsEnumerator
 *                     └─ ProductRouteParamsEnumerator
 * ```
 *
 * @param ssrConfig - SSR configuration with baseSite → URL mappings (required)
 */
export function provideSitemapGenerator(
  ssrConfig: SitemapSsrConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Default sitemap configuration (can be overridden via provideConfig)
    provideConfig(defaultSitemapConfig),

    // SSR config with baseSite → URL mappings
    { provide: SITEMAP_SSR_CONFIG, useValue: ssrConfig },

    // Route Parameter Enumerators
    {
      provide: ROUTE_PARAMS_ENUMERATOR,
      useClass: StaticRouteParamsEnumerator,
      multi: true,
    },
    {
      provide: ROUTE_PARAMS_ENUMERATOR,
      useClass: ProductRouteParamsEnumerator,
      multi: true,
    },

    // Discovery & Generation Services
    RoutesDiscoveryService,
    SiteContextAwareRoutesDiscoveryService,
    SitemapGeneratorService,

    // Orchestrator
    SitemapConfigExtractorService,

    // APP_INITIALIZER trigger
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: sitemapGeneratorInitializerFactory,
      deps: [PLATFORM_ID, Injector],
      multi: true,
    },
  ]);
}

