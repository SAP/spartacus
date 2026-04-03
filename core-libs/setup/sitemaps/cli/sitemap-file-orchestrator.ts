/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  Injectable,
  Injector,
  makeEnvironmentProviders,
  PLATFORM_ID,
  runInInjectionContext,
} from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import {
  BaseSite,
  BaseSiteService,
  normalizeUrlEncodingParams,
  OccConfig,
  provideConfig,
  RoutingConfig,
  SiteContextConfig,
} from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { defaultSitemapConfig, SitemapConfig } from '../config/sitemap-config';
import { BrandRouteParamsEnumerator } from '../enumerators/brand-route-params-enumerator';
import { CategoryRouteParamsEnumerator } from '../enumerators/category-route-params-enumerator';
import { ProductRouteParamsEnumerator } from '../enumerators/product-route-params-enumerator';
import { StaticRouteParamsEnumerator } from '../enumerators/static-route-params-enumerator';
import { ROUTE_PARAMS_ENUMERATOR } from '../model/route-params-enumerator';
import {
  ResolvedSitemapConfig,
  SitemapGenerationContext,
} from '../model/sitemap.model';
import { SitemapFileGenerationConfig, SitemapSerializedData } from '../model/streaming.model';
import { CatalogsFetchService } from '../services/catalogs-fetch.service';
import { RoutesDiscoveryService } from '../services/routes-discovery.service';
import { SiteContextAwareRoutesDiscoveryService } from '../services/site-context-aware-routes-discovery.service';
import { StreamingSitemapGeneratorService } from '../services/streaming-sitemap-generator.service';
import { escapeXml } from '../utils/xml-utils';

/**
 * Injection token for the file-based sitemap generation configuration.
 */
import { InjectionToken } from '@angular/core';

export const SITEMAP_FILE_CONFIG = new InjectionToken<SitemapFileGenerationConfig>(
  'SITEMAP_FILE_CONFIG',
  {
    factory: () => ({ baseUrls: {} }),
  }
);

/**
 * Orchestrator service for standalone file-based sitemap generation.
 *
 * This service is designed to run **inside an Angular SSR render** triggered by
 * the standalone CLI script. It performs sitemap generation and serializes
 * results into a `<script id="cxSitemapData">` tag in the HTML output.
 *
 * The CLI script then extracts this JSON from the rendered HTML and writes
 * XML files to disk. This approach:
 *
 * 1. **Re-uses the existing app build** — no separate compilation needed
 * 2. **No shared in-memory state** — data flows via serialized HTML
 * 3. **Works with any SSR bootstrap** — only requires `renderApplication()`
 * 4. **No Express dependency** — runs in a plain Node.js process
 *
 * ## Memory safety for large sites
 *
 * For sites with millions of products, the serialized JSON in HTML can be large.
 * The CLI script processes each baseSite sequentially and writes files to disk
 * immediately. The Angular process for each baseSite's render is short-lived.
 *
 * For extreme scales (20 baseSites × millions of products), consider:
 * - Running the CLI per baseSite (via `--base-site` flag)
 * - Using `maxUrlsPerSitemap` to split into manageable files
 */
@Injectable()
export class SitemapFileOrchestrator {
  protected platformId = inject(PLATFORM_ID);
  protected baseSiteService = inject(BaseSiteService);
  protected occConfig = inject(OccConfig);
  protected fileConfig = inject(SITEMAP_FILE_CONFIG);
  protected sitemapConfig = inject(SitemapConfig);
  protected siteContextConfig = inject(SiteContextConfig);
  protected routingConfig = inject(RoutingConfig);
  protected generatorService = inject(StreamingSitemapGeneratorService);

  /**
   * Performs sitemap generation for all configured baseSites.
   * Returns the serialized data to be embedded in HTML.
   */
  async generateAll(): Promise<SitemapSerializedData> {
    if (!isPlatformServer(this.platformId)) {
      return { sitemaps: {}, files: [], totalUrls: 0, urlsByLanguage: {} };
    }

    const configuredSites = this.fileConfig.baseUrls;
    const configuredSiteIds = Object.keys(configuredSites);

    if (configuredSiteIds.length === 0) {
      console.warn('[Sitemap] No baseSites configured. Nothing to generate.');
      return { sitemaps: {}, files: [], totalUrls: 0, urlsByLanguage: {} };
    }

    const allBaseSites = await this.getAllBaseSites();
    const baseSiteMap = new Map<string, BaseSite>(
      allBaseSites.map((site) => [site.uid || '', site])
    );

    console.log(
      `[Sitemap] File generator: Processing ${configuredSiteIds.length} baseSite(s)`
    );

    const allSitemaps: Record<string, string> = {};
    const allFiles: string[] = [];
    let totalUrls = 0;
    const urlsByLanguage: Record<string, number> = {};

    for (const baseSiteId of configuredSiteIds) {
      const baseUrl = configuredSites[baseSiteId];
      const baseSite = baseSiteMap.get(baseSiteId);

      if (!baseSite) {
        console.warn(`[Sitemap] BaseSite '${baseSiteId}' not found in OCC response. Skipping.`);
        continue;
      }

      console.log(`[Sitemap] Processing baseSite: ${baseSiteId} → ${baseUrl}`);

      const context = this.buildContext(baseSite, baseUrl);

      // Generate sitemaps — each file's XML is returned (will be serialized to HTML)
      const result = await this.generatorService.generateSitemaps(context);

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

    // Generate sitemap index
    allSitemaps['sitemap.xml'] = this.buildSitemapIndexXml(allFiles, configuredSites);

    console.log(
      `[Sitemap] File generator: Complete — ${allFiles.length} file(s), ${totalUrls} URLs`
    );

    return { sitemaps: allSitemaps, files: allFiles, totalUrls, urlsByLanguage };
  }

  protected async getAllBaseSites(): Promise<BaseSite[]> {
    return await firstValueFrom(this.baseSiteService.getAll().pipe(take(1)));
  }

  protected buildContext(baseSite: BaseSite, baseUrl: string): SitemapGenerationContext {
    const baseSiteId = baseSite.uid || '';
    const store = baseSite.stores?.[0] || baseSite.baseStore;

    const languages = (store?.languages || [])
      .filter((lang) => lang.active !== false)
      .map((lang) => lang.isocode)
      .filter((code): code is string => !!code);

    const currencies = (store?.currencies || [])
      .filter((curr) => curr.active !== false)
      .map((curr) => curr.isocode)
      .filter((code): code is string => !!code);

    const defaultCurrency = store?.defaultCurrency?.isocode || 'USD';

    const staticUrlParams = this.getStaticUrlParameters();
    const urlEncodingParams = staticUrlParams?.length
      ? staticUrlParams
      : normalizeUrlEncodingParams(baseSite.urlEncodingAttributes);

    const occBaseUrl =
      this.fileConfig.occBaseUrl || this.occConfig.backend?.occ?.baseUrl || '';

    const sitemapRoutesCfg = this.sitemapConfig.sitemap?.routes;
    const defaultRoutesCfg = defaultSitemapConfig.sitemap!.routes!;

    const resolvedConfig: ResolvedSitemapConfig = {
      maxUrlsPerSitemap:
        this.sitemapConfig.sitemap?.maxUrlsPerSitemap ??
        defaultSitemapConfig.sitemap!.maxUrlsPerSitemap!,
      routes: {
        includeAuthFlowRoutes:
          sitemapRoutesCfg?.includeAuthFlowRoutes ?? defaultRoutesCfg.includeAuthFlowRoutes!,
        includeProtectedRoutes:
          sitemapRoutesCfg?.includeProtectedRoutes ?? defaultRoutesCfg.includeProtectedRoutes!,
        excludes: sitemapRoutesCfg?.excludes ?? defaultRoutesCfg.excludes!,
      },
    };

    return {
      baseSiteId,
      baseUrl,
      occBaseUrl,
      languages: languages.length > 0 ? languages : ['en'],
      currencies: currencies.length > 0 ? currencies : ['USD'],
      defaultCurrency,
      urlEncodingParams,
      config: resolvedConfig,
      globalRoutingProtected: this.routingConfig.routing?.protected ?? false,
    };
  }

  protected getStaticUrlParameters(): string[] | undefined {
    const hasStaticBaseSiteConfig =
      !!this.siteContextConfig.context?.['baseSite']?.length;
    if (!hasStaticBaseSiteConfig) {
      return undefined;
    }
    return this.siteContextConfig.context?.urlParameters;
  }

  protected buildSitemapIndexXml(
    sitemapFiles: string[],
    baseUrls: Record<string, string>
  ): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = sitemapFiles
      .map((file) => {
        const baseSiteId = file.split('/')[0];
        const baseUrl = baseUrls[baseSiteId] || '';
        return `  <sitemap>\n    <loc>${escapeXml(baseUrl)}/sitemaps/${file}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapElements}\n</sitemapindex>`;
  }
}

// ──────────────────────────────────────────────────────────────────────
// BEFORE_APP_SERIALIZED hook: embeds sitemap data into rendered HTML
// ──────────────────────────────────────────────────────────────────────

/**
 * Factory for BEFORE_APP_SERIALIZED that triggers sitemap generation
 * and serializes results into a `<script>` tag inside the rendered HTML.
 *
 * The CLI script extracts this JSON after `renderApplication()` completes.
 * This removes any dependency on Node.js global / shared state.
 */
function sitemapFileGeneratorHookFactory(
  platformId: Object,
  injector: Injector
): () => Promise<void> {
  return async () => {
    if (!isPlatformServer(platformId)) {
      return;
    }

    await runInInjectionContext(injector, async () => {
      const document = injector.get(DOCUMENT);
      const orchestrator = injector.get(SitemapFileOrchestrator);

      let data: SitemapSerializedData;
      try {
        data = await orchestrator.generateAll();
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error(`[Sitemap] File generator failed:`, error);
        data = {
          sitemaps: {},
          files: [],
          totalUrls: 0,
          urlsByLanguage: {},
          error: msg,
        };
      }

      // Embed the result as JSON in a <script> tag.
      // The CLI reads it from the HTML — zero shared state.
      const serialized = JSON.stringify(data).replace(/</g, '\\u003C');
      const script = document.createElement('script');
      script.id = 'cxSitemapData';
      script.setAttribute('type', 'application/json');
      script.textContent = serialized;
      document.body.appendChild(script);
    });
  };
}

// ──────────────────────────────────────────────────────────────────────
// Provider function
// ──────────────────────────────────────────────────────────────────────

/**
 * Provides the file-based sitemap generator for standalone CLI usage.
 *
 * Use this when:
 *
 * - You want to generate sitemaps as **static files** on disk
 * - You want to run generation in a **cron job** (decoupled from live SSR)
 * - You have a **CDN** that serves static XML files
 * - You want to avoid memory pressure on live SSR pods
 *
 * ## Usage in app.config.server.ts
 *
 * ```typescript
 * import { provideSitemapFileGenerator } from '@spartacus/setup/sitemaps';
 *
 * providers: [
 *   provideSitemapFileGenerator({
 *     baseUrls: {
 *       'electronics-spa': 'https://electronics.example.com',
 *     },
 *     outputDir: './dist/sitemaps', // used by CLI script
 *   }),
 * ]
 * ```
 *
 * ## Then run the CLI
 *
 * ```bash
 * node dist/storefrontapp/server/generate-sitemaps.mjs
 * # or:
 * node dist/storefrontapp/server/generate-sitemaps.mjs --output ./dist/sitemaps --base-site electronics-spa
 * ```
 *
 * @param config - File generation config (baseSite → URL mapping + output dir)
 */
export function provideSitemapFileGenerator(
  config: SitemapFileGenerationConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Default sitemap configuration
    provideConfig(defaultSitemapConfig as SitemapConfig),

    // If occBaseUrl is provided, configure the OCC backend URL globally.
    // This ensures that all OCC services (including BaseSiteService) know
    // where to make requests — critical for standalone CLI usage where
    // the HTML meta tag may not be read correctly.
    ...(config.occBaseUrl
      ? [provideConfig({ backend: { occ: { baseUrl: config.occBaseUrl } } } as OccConfig)]
      : []),

    // File-based config
    { provide: SITEMAP_FILE_CONFIG, useValue: config },

    // Route Parameter Enumerators
    { provide: ROUTE_PARAMS_ENUMERATOR, useClass: StaticRouteParamsEnumerator, multi: true },
    { provide: ROUTE_PARAMS_ENUMERATOR, useClass: ProductRouteParamsEnumerator, multi: true },
    { provide: ROUTE_PARAMS_ENUMERATOR, useClass: CategoryRouteParamsEnumerator, multi: true },
    { provide: ROUTE_PARAMS_ENUMERATOR, useClass: BrandRouteParamsEnumerator, multi: true },

    // Discovery & Generation Services
    CatalogsFetchService,
    RoutesDiscoveryService,
    SiteContextAwareRoutesDiscoveryService,
    StreamingSitemapGeneratorService,

    // Orchestrator
    SitemapFileOrchestrator,

    // BEFORE_APP_SERIALIZED hook — embeds sitemap data in HTML
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: sitemapFileGeneratorHookFactory,
      deps: [PLATFORM_ID, Injector],
      multi: true,
    },
  ]);
}


