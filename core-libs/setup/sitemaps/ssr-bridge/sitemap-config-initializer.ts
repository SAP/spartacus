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
import { SitemapConfigExtractorService } from './sitemap-config-extractor.service';

/**
 * Factory function for APP_INITIALIZER that extracts sitemap config.
 * This ensures the config is extracted during Angular bootstrap.
 */
function sitemapConfigInitializerFactory(
  platformId: Object,
  injector: Injector
): () => Promise<void> {
  return () => {
    // Only run on server
    if (isPlatformServer(platformId)) {
      // Run in injection context to properly instantiate the service
      runInInjectionContext(injector, () => {
        // This will trigger the constructor which extracts the config
        injector.get(SitemapConfigExtractorService);
      });
      console.log('[Sitemap] Config extractor initialized');
    }
    return Promise.resolve();
  };
}

/**
 * Provides the sitemap config extractor for SSR.
 *
 * Add this to your server configuration to enable automatic
 * routing config extraction for sitemap generation.
 *
 * ## Usage
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
 *
 * ## How it works
 *
 * 1. During SSR bootstrap, APP_INITIALIZER triggers the extraction
 * 2. RoutingConfig is read from Angular DI
 * 3. Config is written to shared state (Node.js memory)
 * 4. Express middleware can then use this config for sitemap generation
 *
 * This approach ensures that customer routing customizations are
 * automatically picked up without requiring manual configuration sync.
 */
export function provideSitemapConfigExtractor(): EnvironmentProviders {
  return makeEnvironmentProviders([
    SitemapConfigExtractorService,
    {
      provide: APP_INITIALIZER,
      useFactory: sitemapConfigInitializerFactory,
      deps: [PLATFORM_ID, Injector],
      multi: true,
    },
  ]);
}



