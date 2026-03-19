/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import {
  BaseSite,
  BaseSiteService,
  normalizeUrlEncodingParams,
  OccConfig,
  RoutingConfig,
  SiteContextConfig,
} from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { defaultSitemapConfig, SitemapConfig } from '../config/sitemap-config';
import {
  ResolvedSitemapConfig,
  SitemapGenerationContext,
} from '../model/sitemap.model';
import { SitemapGeneratorService } from '../services/sitemap-generator.service';
import {
  markSitemapError,
  markSitemapGenerating,
  SITEMAP_SHARED_STATE,
  updateSitemapState,
} from './sitemap-shared-state';
import { escapeXml } from '../utils/xml-utils';

/**
 * Configuration for sitemap generation in SSR context.
 *
 * The `baseUrls` map determines which baseSites to generate sitemaps for
 * and what storefront URL to use for each. This is the **driving** configuration —
 * only baseSites listed here will be processed. Site context data (languages,
 * currencies, urlEncodingAttributes) is resolved from the OCC baseSites response.
 *
 * This design ensures that when multiple applications/instances share the same
 * OCC backend, each application only generates sitemaps for its own baseSites,
 * avoiding unnecessary iterations and incorrect sitemaps.
 */
export interface SitemapSsrConfig {
  /**
   * Mapping of baseSite UID → storefront base URL.
   *
   * Only baseSites present in this map will have sitemaps generated.
   * The URL is used as the `<loc>` prefix in sitemap entries.
   *
   * Example:
   * ```typescript
   * {
   *   'electronics-spa': 'https://electronics.example.com',
   *   'apparel-uk-spa': 'https://apparel-uk.example.com',
   *   'apparel-de': 'https://apparel-de.example.com',
   * }
   * ```
   */
  baseUrls: Record<string, string>;

  /**
   * Override OCC backend URL.
   * If not set, uses `OccConfig.backend.occ.baseUrl`.
   */
  occBaseUrl?: string;
}

/**
 * Injection token for sitemap SSR configuration.
 */
export const SITEMAP_SSR_CONFIG = new InjectionToken<SitemapSsrConfig>(
  'SITEMAP_SSR_CONFIG',
  {
    factory: () => ({ baseUrls: {} }),
  }
);

/**
 * Main sitemap orchestrator service. Coordinates sitemap generation during SSR bootstrap.
 *
 * This service:
 * 1. Reads configured baseSite → URL mappings from `SitemapSsrConfig.baseUrls`
 * 2. Fetches baseSites from OCC to resolve site context data (languages, currencies, etc.)
 * 3. For each configured baseSite, matches it with OCC data and builds generation context
 * 4. Delegates to SitemapGeneratorService which uses the layered architecture:
 *    - SiteContextAwareRoutesDiscoveryService (iterates site contexts)
 *    - RoutesDiscoveryService (matches routes with enumerators)
 *    - ROUTE_PARAMS_ENUMERATOR[] (provides params for each route type)
 * 5. Generates separate sitemaps per baseSite with proper prefixing
 * 6. Creates a master sitemap index referencing all per-site sitemaps
 */
@Injectable()
export class SitemapConfigExtractorService {
  protected platformId = inject(PLATFORM_ID);
  protected baseSiteService = inject(BaseSiteService);
  protected occConfig = inject(OccConfig);
  protected ssrConfig = inject(SITEMAP_SSR_CONFIG);
  protected sitemapConfig = inject(SitemapConfig);
  protected siteContextConfig = inject(SiteContextConfig);
  protected routingConfig = inject(RoutingConfig);
  protected sitemapGeneratorService = inject(SitemapGeneratorService);

  /**
   * Main entry point — orchestrates sitemap generation for configured baseSites.
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
      const configuredSites = this.ssrConfig.baseUrls;
      const configuredSiteIds = Object.keys(configuredSites);

      if (configuredSiteIds.length === 0) {
        console.warn('[Sitemap] No baseSites configured in baseUrls. Nothing to generate.');
        updateSitemapState({}, [], 0, {});
        return;
      }

      // Fetch all baseSites from OCC to get site context data
      const allBaseSites = await this.getAllBaseSites();
      const baseSiteMap = new Map<string, BaseSite>(
        allBaseSites.map((site) => [site.uid || '', site])
      );

      console.log(
        `[Sitemap] Configured ${configuredSiteIds.length} baseSite(s): ${configuredSiteIds.join(', ')}`
      );
      console.log(
        `[Sitemap] OCC returned ${allBaseSites.length} baseSite(s): ${allBaseSites.map((s) => s.uid).join(', ')}`
      );

      const allSitemaps: Record<string, string> = {};
      const allFiles: string[] = [];
      let totalUrls = 0;
      const urlsByLanguage: Record<string, number> = {};

      // Process only baseSites listed in baseUrls config
      for (const baseSiteId of configuredSiteIds) {
        const baseUrl = configuredSites[baseSiteId];
        const baseSite = baseSiteMap.get(baseSiteId);

        if (!baseSite) {
          console.warn(
            `[Sitemap] BaseSite '${baseSiteId}' configured in baseUrls but not found in OCC response. Skipping.`
          );
          continue;
        }

        console.log(`[Sitemap] Processing baseSite: ${baseSiteId} → ${baseUrl}`);

        const context = this.buildContextForBaseSite(baseSite, baseUrl);
        console.log(`[Sitemap] Context for ${baseSiteId}:`);
        console.log(`  Base URL: ${context.baseUrl}`);
        console.log(`  Languages: ${context.languages.join(', ')}`);
        console.log(`  Currencies: ${context.currencies.join(', ')}`);
        console.log(`  Default currency: ${context.defaultCurrency}`);
        console.log(
          `  URL encoding params: ${context.urlEncodingParams.join(', ')}`
        );

        // Use new architecture: SitemapGeneratorService
        const result = await this.sitemapGeneratorService.generateSitemaps(context);

        // Prefix filenames with baseSiteUid for multi-site support
        for (const [filename, xml] of Object.entries(result.sitemaps)) {
          const prefixedFilename = `${baseSiteId}/${filename}`;
          allSitemaps[prefixedFilename] = xml;
          allFiles.push(prefixedFilename);
        }

        totalUrls += result.totalUrls;
        for (const [lang, count] of Object.entries(result.urlsByLanguage)) {
          urlsByLanguage[lang] = (urlsByLanguage[lang] || 0) + count;
        }
      }

      // Generate master sitemap index with per-baseSite URLs
      allSitemaps['sitemap.xml'] = this.buildSitemapIndexXml(
        allFiles,
        configuredSites
      );

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
  protected async getAllBaseSites(): Promise<BaseSite[]> {
    return await firstValueFrom(this.baseSiteService.getAll().pipe(take(1)));
  }

  /**
   * Builds the generation context for a specific baseSite.
   * @param baseSite - BaseSite data from OCC response
   * @param baseUrl - Storefront base URL for this baseSite (from SitemapSsrConfig.baseUrls)
   */
  protected buildContextForBaseSite(
    baseSite: BaseSite,
    baseUrl: string
  ): SitemapGenerationContext {
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
    // 1. Static config from provideConfig({ context: { urlParameters } })
    // 2. Per-baseSite urlEncodingAttributes from OCC (fallback)
    //
    // We can trust siteContextConfig.context.urlParameters only when
    // context.baseSite was provided statically — because in that case
    // SiteContextConfigInitializer does NOT run (see initSiteContextConfig
    // in SiteContextModule), so urlParameters retains the customer's value.
    // Otherwise, the initializer overwrites it with the active baseSite's
    // data, which is unreliable when iterating over multiple baseSites.
    const staticUrlParams = this.getStaticUrlParameters();
    const urlEncodingParams = staticUrlParams?.length
      ? staticUrlParams
      : normalizeUrlEncodingParams(baseSite.urlEncodingAttributes);

    // Resolve occBaseUrl
    const occBaseUrl =
      this.ssrConfig.occBaseUrl || this.occConfig.backend?.occ?.baseUrl || '';

    // Build resolved sitemap config
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
    const globalRoutingProtected =
      this.routingConfig.routing?.protected ?? false;

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
   * Returns the customer's static `context.urlParameters` if it can be trusted.
   *
   * When `context.baseSite` is provided via `provideConfig()`,
   * `SiteContextConfigInitializer` does NOT run (see `initSiteContextConfig`
   * in `SiteContextModule`). In that case `context.urlParameters` is the
   * customer's own static value — or `undefined` if they didn't set it.
   *
   * When `context.baseSite` is NOT provided, the initializer runs and
   * overwrites `context.urlParameters` with data from a single baseSite
   * matched by URL pattern. That value cannot be used for other baseSites,
   * so we return `undefined` to signal "use per-baseSite OCC fallback".
   */
  protected getStaticUrlParameters(): string[] | undefined {
    const hasStaticBaseSiteConfig =
      !!this.siteContextConfig.context?.['baseSite']?.length;
    if (!hasStaticBaseSiteConfig) {
      return undefined;
    }
    return this.siteContextConfig.context?.urlParameters;
  }

  /**
   * Builds sitemap index XML referencing all per-baseSite sitemap files.
   * Each sitemap file's `<loc>` uses the baseUrl configured for its baseSite.
   *
   * @param sitemapFiles - List of sitemap file paths (e.g., 'electronics-spa/sitemap-en.xml')
   * @param baseUrls - Mapping of baseSite UID → storefront URL
   */
  protected buildSitemapIndexXml(
    sitemapFiles: string[],
    baseUrls: Record<string, string>
  ): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = sitemapFiles
      .map((file) => {
        // Extract baseSiteId from the file path (e.g., 'electronics-spa/sitemap-en.xml' → 'electronics-spa')
        const baseSiteId = file.split('/')[0];
        const baseUrl = baseUrls[baseSiteId] || '';

        return `  <sitemap>
    <loc>${escapeXml(baseUrl)}/sitemaps/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
  }
}
