/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SitemapConfig } from '../config/sitemap-config';

/**
 * Represents a single URL entry in the sitemap
 */
export interface SitemapUrlEntry {
  /**
   * Full URL location (required by sitemap protocol)
   */
  loc: string;

  /**
   * Last modification date (ISO 8601 format, e.g., '2026-02-26')
   */
  lastmod?: string;

  /**
   * Change frequency hint for crawlers
   */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

  /**
   * Priority relative to other URLs (0.0 to 1.0)
   */
  priority?: number;
}

/**
 * Result of URL generation grouped by language.
 * Used for creating separate sitemap files per language.
 */
export interface LanguageUrls {
  /**
   * Language ISO code (e.g., 'en', 'de', 'ja')
   */
  language: string;

  /**
   * URLs for this language
   */
  urls: SitemapUrlEntry[];
}

/**
 * Interface for URL providers that supply URLs for sitemap generation.
 * This is the main extension point - implement this interface to add
 * custom URL sources to the sitemap.
 *
 * @example
 * ```typescript
 * const productProvider: UrlProvider = {
 *   name: 'products',
 *   getUrlsByLanguage: async (config) => {
 *     return [
 *       { language: 'en', urls: [...] },
 *       { language: 'de', urls: [...] },
 *     ];
 *   }
 * };
 * ```
 */
export interface UrlProvider {
  /**
   * Unique name for this provider (used for sitemap file naming)
   */
  readonly name: string;

  /**
   * Fetches URLs grouped by language.
   * Each language will result in a separate sitemap file.
   *
   * @param config - Sitemap configuration
   * @returns Promise resolving to array of language-grouped URLs
   */
  getUrlsByLanguage(config: SitemapConfig): Promise<LanguageUrls[]>;
}

