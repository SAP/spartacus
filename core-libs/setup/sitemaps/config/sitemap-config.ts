/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * Configuration for sitemap generation.
 *
 * ## Usage
 *
 * ```typescript
 * // app.config.ts
 * provideConfig({
 *   sitemap: {
 *     maxUrlsPerSitemap: 50,  // for testing; default is 50000
 *   },
 * } as SitemapConfig),
 * ```
 *
 * ## Default values
 *
 * - `maxUrlsPerSitemap`: 50000 (per sitemaps.org protocol)
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class SitemapConfig {
  sitemap?: {
    /**
     * Maximum number of URLs per sitemap file.
     * Default: 50000 (per sitemaps.org protocol).
     * Sitemap files exceeding this limit will be split into multiple files
     * with numeric suffixes (e.g., sitemap-products-en-1.xml, sitemap-products-en-2.xml).
     */
    maxUrlsPerSitemap?: number;
  };
}

declare module '@spartacus/core' {
  interface Config extends SitemapConfig {}
}

/**
 * Default sitemap configuration values.
 */
export const defaultSitemapConfig: SitemapConfig = {
  sitemap: {
    maxUrlsPerSitemap: 50000,
  },
};

