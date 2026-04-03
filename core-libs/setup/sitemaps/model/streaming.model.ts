/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Result yielded per batch from a streaming route params enumerator.
 * Each batch contains a chunk of parameter objects.
 */
export interface RouteParamsBatch {
  /** Parameter objects for this batch (same shape as RouteParamsEnumeratorResult.params) */
  params: Record<string, unknown>[];
  /** Whether this is the last batch (no more data coming) */
  done: boolean;
  /** Running total of params yielded so far (including this batch) */
  totalSoFar: number;
}

/**
 * Configuration for the standalone sitemap generation CLI.
 */
export interface SitemapFileGenerationConfig {
  /**
   * Mapping of baseSite UID → storefront base URL.
   * Only baseSites present here will have sitemaps generated.
   */
  baseUrls: Record<string, string>;

  /**
   * Override OCC backend URL.
   * If not set, uses `OccConfig.backend.occ.baseUrl`.
   */
  occBaseUrl?: string;

  /**
   * Output directory for generated sitemap XML files.
   * Default: `./dist/sitemaps`
   */
  outputDir?: string;
}

/**
 * Result extracted from the Angular SSR render for sitemap generation.
 * This is serialized as JSON inside a `<script id="cxSitemapData">` tag
 * in the rendered HTML, eliminating any in-memory shared state dependency.
 */
export interface SitemapSerializedData {
  /** Generated sitemap files keyed by relative path → XML content */
  sitemaps: Record<string, string>;
  /** List of generated sitemap file paths */
  files: string[];
  /** Total URLs across all sitemaps */
  totalUrls: number;
  /** URLs per language */
  urlsByLanguage: Record<string, number>;
  /** Error message if generation failed */
  error?: string;
}

