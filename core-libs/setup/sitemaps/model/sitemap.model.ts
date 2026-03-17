/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Represents a single URL entry in the sitemap.
 */
export interface SitemapUrlEntry {
  /** Full URL location (required by sitemap protocol) */
  loc: string;
  /** Last modification date (ISO 8601 format) */
  lastmod?: string;
  /** Change frequency hint for crawlers */
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Priority relative to other URLs (0.0 to 1.0) */
  priority?: number;
}

/**
 * Configuration for routes sitemap provider.
 */
export interface ResolvedRoutesConfig {
  /** Whether to include auth flow routes (login, register, etc.) */
  includeAuthFlowRoutes: boolean;
  /** Whether to include protected routes */
  includeProtectedRoutes: boolean;
  /** Route names to explicitly exclude */
  excludes: string[];
}

/**
 * Resolved sitemap configuration with all values filled in.
 */
export interface ResolvedSitemapConfig {
  maxUrlsPerSitemap: number;
  routes: ResolvedRoutesConfig;
}

/**
 * Context information passed to URL providers during generation.
 * Contains all resolved site context values so providers don't need
 * to resolve them independently.
 */
export interface SitemapGenerationContext {
  /** Resolved base site UID (e.g., 'electronics-spa') */
  baseSiteId: string;
  /** Storefront base URL (e.g., 'https://example.com') */
  baseUrl: string;
  /** OCC backend base URL (e.g., 'https://api.example.com') */
  occBaseUrl: string;
  /** Active language isocodes */
  languages: string[];
  /** Active currency isocodes */
  currencies: string[];
  /** Default currency isocode */
  defaultCurrency: string;
  /** URL encoding parameters (e.g., ['storefront', 'language', 'currency']) */
  urlEncodingParams: string[];
  /** Resolved sitemap configuration (limits, etc.) */
  config: ResolvedSitemapConfig;
  /** Whether global routing.protected flag is set */
  globalRoutingProtected?: boolean;
}

/**
 * Result of a single URL provider's generation, grouped by language and currency.
 */
export interface SitemapProviderResult {
  /** Provider name (used in sitemap filenames) */
  providerName: string;
  /** Generated sitemap files keyed by filename → XML content */
  sitemaps: Record<string, string>;
  /** Filenames of generated sitemaps */
  files: string[];
  /** Total URLs across all files */
  totalUrls: number;
  /** URLs per language */
  urlsByLanguage: Record<string, number>;
}
