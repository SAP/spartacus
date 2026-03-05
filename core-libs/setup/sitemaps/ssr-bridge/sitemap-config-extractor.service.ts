/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { RoutingConfig, SiteContextParamsService } from '@spartacus/core';
import { updateSitemapState } from './sitemap-shared-state';

/**
 * Angular service that extracts routing configuration and exports it
 * to the shared state accessible by Express.
 *
 * This service runs in SSR context and bridges the gap between
 * Angular's DI system and the Express server layer.
 *
 * ## How it works
 *
 * 1. This service is instantiated during Angular bootstrap (SSR)
 * 2. It extracts the RoutingConfig from Angular DI
 * 3. It writes the config to a shared state (Node.js global)
 * 4. Express middleware can then read this config for sitemap generation
 *
 * ## Usage
 *
 * Add to your server providers:
 *
 * ```typescript
 * // app.config.server.ts
 * import { provideSitemapConfigExtractor } from '@spartacus/setup/sitemaps/ssr-bridge';
 *
 * export const serverConfig: ApplicationConfig = {
 *   providers: [
 *     provideSitemapConfigExtractor(),
 *     // ... other providers
 *   ],
 * };
 * ```
 */
@Injectable()
export class SitemapConfigExtractorService {
  private platformId = inject(PLATFORM_ID);
  private routingConfig = inject(RoutingConfig);
  private siteContextParamsService = inject(SiteContextParamsService);

  constructor() {
    console.log('[Sitemap] SitemapConfigExtractorService constructor called');
    console.log(`[Sitemap] Platform is server: ${isPlatformServer(this.platformId)}`);

    // Only run on server (SSR)
    if (isPlatformServer(this.platformId)) {
      this.extractAndShareConfig();
    }
  }

  /**
   * Extracts routing configuration and shares it with Express layer.
   */
  private extractAndShareConfig(): void {
    try {
      console.log('[Sitemap] Extracting routing config...');

      const routes = this.routingConfig.routing?.routes;
      const urlEncodingParams = this.siteContextParamsService.getUrlEncodingParameters();

      console.log(`[Sitemap] Found ${routes ? Object.keys(routes).length : 0} routes`);
      console.log(`[Sitemap] URL encoding params: ${urlEncodingParams?.join(', ') ?? 'none'}`);

      if (routes) {
        // Convert to simplified format for Node.js usage
        const simplifiedRoutes: Record<string, { paths: string[]; paramsMapping?: Record<string, string> }> = {};

        for (const [routeName, routeConfig] of Object.entries(routes)) {
          if (routeConfig && routeConfig.paths) {
            simplifiedRoutes[routeName] = {
              paths: routeConfig.paths,
              paramsMapping: routeConfig.paramsMapping,
            };
          }
        }

        console.log(`[Sitemap] Simplified ${Object.keys(simplifiedRoutes).length} routes`);
        updateSitemapState(simplifiedRoutes, urlEncodingParams);
        console.log('[Sitemap] Routing config shared to Express layer');
      } else {
        console.warn('[Sitemap] No routes found in RoutingConfig');
      }
    } catch (error) {
      console.error('[Sitemap] Failed to extract routing config:', error);
    }
  }
}


