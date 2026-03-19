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

// ---- Sitemap Configuration ----

/**
 * Resolved routes configuration (all values filled in).
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
 * Resolved sitemap configuration (all values filled in).
 */
export interface ResolvedSitemapConfig {
  maxUrlsPerSitemap: number;
  routes: ResolvedRoutesConfig;
}

// ---- Generation Context ----

/**
 * Context information passed during sitemap generation.
 * Built from baseSite data by the orchestrator.
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

// ---- Discovery Results ----

/**
 * A discovered route with its concrete URL path.
 */
export interface DiscoveredRoute {
  /** Semantic route name (e.g., 'product', 'home') */
  cxRoute: string;
  /** Parameters used to generate this URL */
  params: Record<string, unknown>;
  /** Concrete URL path without base URL or prefix (e.g., 'product/123/camera') */
  path: string;
}

/**
 * A discovered URL with full site context information.
 */
export interface SiteContextAwareUrl {
  cxRoute: string;
  params: Record<string, unknown>;
  /** Full URL path with site context prefix (e.g., '/electronics-spa/en/USD/product/123') */
  fullPath: string;
  language: string;
  currency: string;
}

/**
 * Result of site-context-aware route discovery.
 */
export interface SiteContextAwareDiscoveryResult {
  /** Discovered URLs keyed by language (or language-currency) */
  urlsByLanguageCurrency: Map<string, SiteContextAwareUrl[]>;
  totalUrls: number;
}

// ---- Generation Results ----

/**
 * Result of sitemap generation for a single baseSite.
 */
export interface SitemapGenerationResult {
  /** Generated sitemap files keyed by filename → XML content */
  sitemaps: Record<string, string>;
  files: string[];
  totalUrls: number;
  urlsByLanguage: Record<string, number>;
}

// ---- Discovery Options ----

/**
 * Options for route discovery filtering.
 */
export interface RoutesDiscoveryOptions {
  /** Only include these semantic route names. */
  include?: string[];
  /** Exclude these semantic route names. */
  exclude?: string[];
  /** Include routes marked with `authFlow: true`. Default: false */
  includeAuthFlowRoutes?: boolean;
  /** Include protected routes. Default: false */
  includeProtectedRoutes?: boolean;
}
