/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutesConfig } from '../services/url-path.service';

/**
 * Configuration for multi-language sitemap generation
 */
export interface SitemapLanguageConfig {
  /**
   * Language ISO code (e.g., 'en', 'de', 'ja')
   */
  isocode: string;

  /**
   * URL prefix for this language (e.g., '/en', '/de')
   * If not specified, uses isocode as prefix
   */
  urlPrefix?: string;

  /**
   * Whether this is the default language (no prefix in URL)
   */
  isDefault?: boolean;
}

/**
 * Multi-language sitemap strategy
 */
export type LanguageUrlStrategy =
  /**
   * Separate sitemap files per language (e.g., sitemap-products-en.xml, sitemap-products-de.xml)
   * Best for: Large catalogs, different products per language
   */
  | 'separate-files'
  /**
   * Single sitemap with hreflang annotations
   * Best for: Same content across languages, SEO for alternates
   */
  | 'hreflang'
  /**
   * Language prefix in URL path (e.g., /en/product/123, /de/product/123)
   * Best for: Sites with language in URL structure
   */
  | 'url-prefix';

/**
 * Configuration options for sitemap generation
 */
export interface SitemapConfig {
  /**
   * Base URL for the storefront (e.g., 'https://example.com')
   */
  baseUrl: string;

  /**
   * OCC backend URL for fetching data
   */
  occBaseUrl: string;

  /**
   * Base site ID (e.g., 'electronics-spa')
   */
  baseSiteId: string;

  /**
   * Languages to generate sitemaps for.
   * If not specified, fetches from basesites API automatically.
   */
  languages?: SitemapLanguageConfig[];

  /**
   * Strategy for handling multiple languages in sitemaps.
   * Default: 'separate-files'
   */
  languageStrategy?: LanguageUrlStrategy;

  /**
   * Whether to automatically discover languages from basesites API.
   * Default: true
   */
  autoDiscoverLanguages?: boolean;

  /**
   * Currency code for API calls (default: 'USD')
   * Note: Currency typically doesn't affect sitemap URLs
   */
  currency?: string;

  /**
   * Output directory for generated sitemap files
   */
  outputDir?: string;

  /**
   * Maximum URLs per sitemap file (protocol limit: 50,000)
   */
  maxUrlsPerFile?: number;

  /**
   * Custom routes configuration.
   * Overrides default Spartacus routes for URL generation.
   */
  routes?: Partial<RoutesConfig>;
}

export const DEFAULT_SITEMAP_CONFIG: Partial<SitemapConfig> = {
  currency: 'USD',
  outputDir: 'sitemaps',
  maxUrlsPerFile: 50000,
  languageStrategy: 'separate-files',
  autoDiscoverLanguages: true,
};

