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
 *     routes: {
 *       includeAuthFlowRoutes: false,  // exclude login, register, etc.
 *       includeProtectedRoutes: false, // exclude routes requiring auth
 *       excludes: ['cart', 'checkout'], // custom routes to exclude
 *     },
 *   },
 * } as SitemapConfig),
 * ```
 *
 * ## Default values
 *
 * - `maxUrlsPerSitemap`: 50000 (per sitemaps.org protocol)
 * - `routes.includeAuthFlowRoutes`: false
 * - `routes.includeProtectedRoutes`: false
 * - `routes.excludes`: []
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

    /**
     * Output directory for file-based sitemap generation (CLI mode).
     * Only used by `provideSitemapFileGenerator()`.
     * Default: `./dist/sitemaps`
     */
    outputDir?: string;

    /**
     * Configuration for static routes sitemap generation.
     */
    routes?: {
      /**
       * Whether to include routes marked with `authFlow: true` in the sitemap.
       * These are routes related to login, register, forgot-password, etc.
       * Default: false (exclude auth flow routes).
       */
      includeAuthFlowRoutes?: boolean;

      /**
       * Whether to include protected routes in the sitemap.
       * Protected routes require authentication and are typically user-specific.
       * This respects both global `routing.protected` and per-route `protected` flag.
       * Default: false (exclude protected routes).
       */
      includeProtectedRoutes?: boolean;

      /**
       * Array of route names (cxRoute keys) to explicitly exclude from the sitemap.
       * Example: ['cart', 'checkout', 'myAccount']
       */
      excludes?: string[];

      /**
       * CMS content page labels to include in the sitemap.
       *
       * OCC does not provide a "list all content pages" API.
       * Use this configuration to explicitly list CMS content page labels
       * that should appear in the sitemap.
       *
       * Each label should match the CMS page `label` field (e.g., '/faq', '/about').
       *
       * Example: ['/faq', '/about', '/contact', '/terms']
       */
      cmsContentPageLabels?: string[];
    };
    catalogs: {
      excludes: string[];
      versionId: 'Online' | 'Staged' | (string & {});
    };
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
    outputDir: './dist/sitemaps',
    routes: {
      includeAuthFlowRoutes: false,
      includeProtectedRoutes: false,
      excludes: [],
      cmsContentPageLabels: [],
    },
    catalogs: {
      excludes: [],
      versionId: '',
    }
  },
};
