/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';
import {
  BaseSite,
  BaseSiteService,
  OccConfig,
  RoutingConfig,
  SiteContextConfig,
} from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  defaultSitemapConfig,
  SitemapConfig,
} from '../config/sitemap-config';
import {
  SITEMAP_URL_PROVIDERS,
  SitemapUrlProvider,
} from '../model/sitemap-url-provider';
import {
  ResolvedSitemapConfig,
  SitemapGenerationContext,
} from '../model/sitemap.model';
import {
  markSitemapError,
  markSitemapGenerating,
  SITEMAP_SHARED_STATE,
  updateSitemapState,
} from './sitemap-shared-state';

/**
 * Optional overrides for sitemap generation.
 *
 * By default, baseUrl and occBaseUrl are resolved from OccConfig.
 * Use this token only when you need to override them
 * (e.g., different public URL vs. internal OCC URL).
 */
export interface SitemapSsrConfig {
  /**
   * Override storefront base URL.
   * If not set, derived from the request or falls back to 'http://localhost:4000'.
   */
  baseUrl?: string;

  /**
   * Override OCC backend URL.
   * If not set, uses `OccConfig.backend.occ.baseUrl`.
   */
  occBaseUrl?: string;

  /**
   * Filter which baseSites to generate sitemaps for.
   * If not set, generates for all baseSites.
   * Can be an array of baseSite UIDs or a filter function.
   */
  baseSiteFilter?: string[] | ((baseSite: BaseSite) => boolean);
}

/**
 * Injection token for optional sitemap SSR configuration overrides.
 */
export const SITEMAP_SSR_CONFIG = new InjectionToken<SitemapSsrConfig>(
  'SITEMAP_SSR_CONFIG',
  {
    factory: () => ({}),
  }
);

/**
 * Main sitemap generator service. Orchestrates URL providers during SSR bootstrap.
 *
 * This service:
 * 1. Fetches all baseSites from OCC
 * 2. For each baseSite, resolves context (languages, currencies, urlEncodingAttributes)
 * 3. Delegates URL generation to registered `SitemapUrlProvider` instances
 * 4. Generates separate sitemaps per baseSite with proper prefixing
 * 5. Creates a master sitemap index referencing all per-site sitemaps
 *
 * ## URL Encoding Parameters Resolution
 *
 * The `urlEncodingParams` (which control language/currency in URLs) are resolved:
 * 1. From `SiteContextConfig.context.urlParameters` (frontend override) - takes precedence
 * 2. From baseSite's `urlEncodingAttributes` (OCC backend) - fallback
 *
 * This allows customers to override URL encoding via frontend config while
 * maintaining compatibility with backend-defined defaults.
 *
 * ## Multi-site support
 *
 * Each baseSite gets its own set of sitemaps:
 * - `/sitemaps/electronics-spa/sitemap-products-en.xml`
 * - `/sitemaps/electronics-spa/sitemap-products-de.xml`
 * - `/sitemaps/powertools-spa/sitemap-products-en-USD.xml`
 *
 * The main sitemap index (`/sitemap.xml`) references all of them.
 *
 * ## Extensibility
 *
 * Register custom URL providers via `SITEMAP_URL_PROVIDERS`:
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator(),
 *   { provide: SITEMAP_URL_PROVIDERS, useClass: CategorySitemapProvider, multi: true },
 * ]
 * ```
 *
 * ## Configuration
 *
 * By default, reads `backend.occ.baseUrl` from `OccConfig` (no duplication).
 * Optional overrides via `provideSitemapGenerator({ baseUrl: '...' })`.
 */
@Injectable()
export class SitemapConfigExtractorService {
  private platformId = inject(PLATFORM_ID);
  private baseSiteService = inject(BaseSiteService);
  private occConfig = inject(OccConfig);
  private ssrConfig = inject(SITEMAP_SSR_CONFIG);
  private sitemapConfig = inject(SitemapConfig);
  private siteContextConfig = inject(SiteContextConfig);
  private routingConfig = inject(RoutingConfig);

  private providers: SitemapUrlProvider[] =
    inject(SITEMAP_URL_PROVIDERS, { optional: true }) ?? [];

  /**
   * Main entry point — orchestrates all registered URL providers for all baseSites.
   * Called from APP_INITIALIZER during SSR bootstrap.
   */
  async generateSitemaps(): Promise<void> {
    if (!isPlatformServer(this.platformId)) {
      return;
    }

    // Skip if already generated or in progress
    if (SITEMAP_SHARED_STATE.isReady || SITEMAP_SHARED_STATE.isGenerating) {
      console.log(
        '[Sitemap] Sitemaps already generated or in progress. Skipping.'
      );
      return;
    }

    markSitemapGenerating();
    console.log('[Sitemap] Starting generation in Angular SSR context...');

    try {
      const baseSites = await this.getAllBaseSites();
      const filteredBaseSites = this.filterBaseSites(baseSites);

      console.log(
        `[Sitemap] Found ${baseSites.length} baseSites, processing ${filteredBaseSites.length} after filtering`
      );

      const allSitemaps: Record<string, string> = {};
      const allFiles: string[] = [];
      let totalUrls = 0;
      const urlsByLanguage: Record<string, number> = {};

      // Process each baseSite
      for (const baseSite of filteredBaseSites) {
        const siteUid = baseSite.uid;
        if (!siteUid) {
          console.warn('[Sitemap] Skipping baseSite without uid');
          continue;
        }

        console.log(`[Sitemap] Processing baseSite: ${siteUid}`);

        const context = this.buildContextForBaseSite(baseSite);
        console.log(`[Sitemap] Context for ${siteUid}:`);
        console.log(`  Base URL: ${context.baseUrl}`);
        console.log(`  Languages: ${context.languages.join(', ')}`);
        console.log(`  Currencies: ${context.currencies.join(', ')}`);
        console.log(`  Default currency: ${context.defaultCurrency}`);
        console.log(
          `  URL encoding params: ${context.urlEncodingParams.join(', ')}`
        );
        console.log(
          `  Global routing protected: ${context.globalRoutingProtected}`
        );

        // Run each provider for this baseSite
        for (const provider of this.providers) {
          console.log(
            `[Sitemap] Running provider '${provider.name}' for ${siteUid}...`
          );

          const result = await provider.getUrls(context);

          // Prefix filenames with baseSiteUid for multi-site support
          for (const [filename, xml] of Object.entries(result.sitemaps)) {
            const prefixedFilename = `${siteUid}/${filename}`;
            allSitemaps[prefixedFilename] = xml;
            allFiles.push(prefixedFilename);
          }

          totalUrls += result.totalUrls;
          for (const [lang, count] of Object.entries(result.urlsByLanguage)) {
            urlsByLanguage[lang] = (urlsByLanguage[lang] || 0) + count;
          }
        }
      }

      // Generate master sitemap index
      const baseUrl = this.ssrConfig.baseUrl || 'http://localhost:4000';
      const indexXml = this.buildSitemapIndexXml(allFiles, baseUrl);
      allSitemaps['sitemap.xml'] = indexXml;

      // Store in shared state for Express
      updateSitemapState(allSitemaps, allFiles, totalUrls, urlsByLanguage);

      console.log(
        `[Sitemap] Generation complete! ${allFiles.length} file(s), ${totalUrls} total URLs`
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[Sitemap] Generation failed:`, error);
      markSitemapError(msg);
    }
  }

  /**
   * Fetches all baseSites from OCC.
   */
  private async getAllBaseSites(): Promise<BaseSite[]> {
    return await firstValueFrom(
      this.baseSiteService.getAll().pipe(take(1))
    );
  }

  /**
   * Filters baseSites based on configuration.
   */
  private filterBaseSites(baseSites: BaseSite[]): BaseSite[] {
    const filter = this.ssrConfig.baseSiteFilter;

    if (!filter) {
      return baseSites;
    }

    if (Array.isArray(filter)) {
      return baseSites.filter((site) => filter.includes(site.uid || ''));
    }

    return baseSites.filter(filter);
  }

  /**
   * Builds the generation context for a specific baseSite.
   *
   * URL encoding parameters are resolved with priority:
   * 1. Frontend config (SiteContextConfig.context.urlParameters) - if defined
   * 2. Backend config (baseSite.urlEncodingAttributes) - fallback
   *
   * This allows customers to override URL encoding via their Spartacus config
   * (e.g., in spartacus-b2c-configuration.providers.ts) while maintaining
   * compatibility with backend-defined defaults.
   */
  private buildContextForBaseSite(baseSite: BaseSite): SitemapGenerationContext {
    const baseSiteId = baseSite.uid || '';
    const store = baseSite.stores?.[0] || baseSite.baseStore;

    // Extract languages from store
    const languages = (store?.languages || [])
      .filter((lang) => lang.active !== false)
      .map((lang) => lang.isocode)
      .filter((code): code is string => !!code);

    // Extract currencies from store
    const currencies = (store?.currencies || [])
      .filter((curr) => curr.active !== false)
      .map((curr) => curr.isocode)
      .filter((code): code is string => !!code);

    const defaultCurrency = store?.defaultCurrency?.isocode || 'USD';

    // Resolve urlEncodingParams with priority:
    // 1. Frontend SiteContextConfig.context.urlParameters (if defined)
    // 2. Backend baseSite.urlEncodingAttributes (fallback)
    //
    // Note: Frontend config maps 'storefront' -> 'baseSite', but we need to
    // handle both for URL building (they're semantically equivalent).
    const frontendUrlParams = this.siteContextConfig.context?.urlParameters;
    const urlEncodingParams = frontendUrlParams?.length
      ? this.normalizeUrlParams(frontendUrlParams)
      : this.normalizeUrlParams(baseSite.urlEncodingAttributes || []);

    // Resolve baseUrl and occBaseUrl
    const baseUrl = this.ssrConfig.baseUrl || 'http://localhost:4000';
    const occBaseUrl =
      this.ssrConfig.occBaseUrl ||
      this.occConfig.backend?.occ?.baseUrl ||
      '';

    // Build resolved sitemap config from injected Spartacus config
    const sitemapRoutesCfg = this.sitemapConfig.sitemap?.routes;
    const defaultRoutesCfg = defaultSitemapConfig.sitemap!.routes!;

    const resolvedConfig: ResolvedSitemapConfig = {
      maxUrlsPerSitemap:
        this.sitemapConfig.sitemap?.maxUrlsPerSitemap ??
        defaultSitemapConfig.sitemap!.maxUrlsPerSitemap!,
      routes: {
        includeAuthFlowRoutes:
          sitemapRoutesCfg?.includeAuthFlowRoutes ??
          defaultRoutesCfg.includeAuthFlowRoutes!,
        includeProtectedRoutes:
          sitemapRoutesCfg?.includeProtectedRoutes ??
          defaultRoutesCfg.includeProtectedRoutes!,
        excludes: sitemapRoutesCfg?.excludes ?? defaultRoutesCfg.excludes!,
      },
    };

    // Get global routing.protected flag
    const globalRoutingProtected = this.routingConfig.routing?.protected ?? false;

    return {
      baseSiteId,
      baseUrl,
      occBaseUrl,
      languages: languages.length > 0 ? languages : ['en'],
      currencies: currencies.length > 0 ? currencies : ['USD'],
      defaultCurrency,
      urlEncodingParams,
      config: resolvedConfig,
      globalRoutingProtected,
    };
  }

  /**
   * Normalizes URL parameters, converting 'storefront' to 'baseSite' for consistency.
   * Both are semantically equivalent - 'storefront' is OCC terminology,
   * 'baseSite' is Spartacus terminology.
   */
  private normalizeUrlParams(params: string[]): string[] {
    return params.map((param) =>
      param === 'storefront' ? 'baseSite' : param
    );
  }

  private buildSitemapIndexXml(
    sitemapFiles: string[],
    baseUrl: string
  ): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = sitemapFiles
      .map(
        (file) =>
          `  <sitemap>
    <loc>${this.escapeXml(baseUrl)}/sitemaps/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
