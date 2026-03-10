/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BaseSiteService,
  CurrencyService,
  LanguageService,
  SemanticPathService,
  SiteContextParamsService,
} from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { take, map } from 'rxjs/operators';
import {
  markSitemapError,
  markSitemapGenerating,
  SITEMAP_SHARED_STATE,
  updateSitemapState,
} from './sitemap-shared-state';

/**
 * Configuration for the sitemap generator.
 * Provided via SITEMAP_SSR_CONFIG injection token.
 */
export interface SitemapSsrConfig {
  /**
   * Base URL for the storefront (e.g., 'https://localhost:4000')
   */
  baseUrl: string;

  /**
   * OCC backend URL (e.g., 'https://40.76.109.9:9002')
   */
  occBaseUrl: string;

  /**
   * Maximum products per page for OCC API (default: 100)
   */
  maxPageSize?: number;
}

import { InjectionToken } from '@angular/core';

/**
 * Injection token for sitemap SSR configuration.
 */
export const SITEMAP_SSR_CONFIG = new InjectionToken<SitemapSsrConfig>(
  'SITEMAP_SSR_CONFIG'
);

/**
 * Angular service that generates complete sitemap XML files during SSR bootstrap.
 *
 * This service has full access to Angular DI — it uses the real
 * SemanticPathService, BaseSiteService, LanguageService, and CurrencyService.
 * No clones, no duplicated logic. URLs in sitemaps match the application's routing exactly.
 *
 * ## How it works
 *
 * 1. During SSR bootstrap, APP_INITIALIZER triggers this service
 * 2. It fetches products from OCC API
 * 3. It generates URLs using SemanticPathService (respecting customer's RoutingConfig)
 * 4. It builds sitemap XML files and stores them in shared state
 * 5. Express middleware serves the pre-generated XML content
 *
 * ## Usage
 *
 * ```typescript
 * // app.config.server.ts
 * import { provideSitemapGenerator } from '@spartacus/setup/sitemaps';
 *
 * export const serverConfig: ApplicationConfig = {
 *   providers: [
 *     provideSitemapGenerator({
 *       baseUrl: 'https://example.com',
 *       occBaseUrl: 'https://api.example.com',
 *     }),
 *   ],
 * };
 * ```
 */
@Injectable()
export class SitemapConfigExtractorService {
  private platformId = inject(PLATFORM_ID);
  private semanticPathService = inject(SemanticPathService);
  private baseSiteService = inject(BaseSiteService);
  private languageService = inject(LanguageService);
  private currencyService = inject(CurrencyService);
  private siteContextParamsService = inject(SiteContextParamsService);
  private config = inject(SITEMAP_SSR_CONFIG);

  private readonly maxPageSize: number;

  constructor() {
    this.maxPageSize = this.config.maxPageSize ?? 100;
  }

  /**
   * Main entry point — generates all sitemap XML files.
   * Called from APP_INITIALIZER during SSR bootstrap.
   * Runs as fire-and-forget to not block the first SSR render.
   */
  async generateSitemaps(): Promise<void> {
    if (!isPlatformServer(this.platformId)) {
      return;
    }

    // Skip if already generated or in progress
    if (SITEMAP_SHARED_STATE.isReady || SITEMAP_SHARED_STATE.isGenerating) {
      console.log(
        '[Sitemap] Sitemaps already generated or generation in progress. Skipping.'
      );
      return;
    }

    markSitemapGenerating();
    console.log(
      '[Sitemap] Starting sitemap generation in Angular SSR context...'
    );

    try {
      const baseSiteId = await this.getBaseSiteId();
      const languages = await this.getActiveLanguages();
      const currencies = await this.getActiveCurrencies();
      const urlEncodingParams =
        this.siteContextParamsService.getUrlEncodingParameters();

      console.log(`[Sitemap] Base site: ${baseSiteId}`);
      console.log(`[Sitemap] Languages: ${languages.join(', ')}`);
      console.log(`[Sitemap] Currencies: ${currencies.join(', ')}`);
      console.log(
        `[Sitemap] URL encoding params: ${urlEncodingParams.join(', ')}`
      );

      const defaultCurrency = await this.getDefaultCurrency();
      const sitemaps: Record<string, string> = {};
      const sitemapFiles: string[] = [];
      let totalUrls = 0;
      const urlsByLanguage: Record<string, number> = {};

      // Generate sitemap for each language
      for (const language of languages) {
        const urlPrefix = this.buildUrlPrefix(
          baseSiteId,
          language,
          defaultCurrency,
          urlEncodingParams
        );
        console.log(`[Sitemap] URL prefix for ${language}: ${urlPrefix}`);

        const entries = await this.fetchAndBuildProductUrls(
          baseSiteId,
          language,
          urlPrefix
        );

        if (entries.length > 0) {
          const filename = `sitemap-products-${language}.xml`;
          const xml = this.buildSitemapXml(entries);

          sitemaps[filename] = xml;
          sitemapFiles.push(filename);
          totalUrls += entries.length;
          urlsByLanguage[language] = entries.length;

          console.log(
            `[Sitemap] Generated ${filename}: ${entries.length} URLs`
          );
        }
      }

      // Generate sitemap index
      const indexXml = this.buildSitemapIndexXml(sitemapFiles);
      sitemaps['sitemap.xml'] = indexXml;

      // Store everything in shared state for Express to serve
      updateSitemapState(sitemaps, sitemapFiles, totalUrls, urlsByLanguage);

      console.log(
        `[Sitemap] Generation complete! ${sitemapFiles.length} file(s), ${totalUrls} total URLs`
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[Sitemap] Generation failed:`, error);
      markSitemapError(msg);
    }
  }

  /**
   * Fetches products from OCC and builds sitemap URL entries using SemanticPathService.
   */
  private async fetchAndBuildProductUrls(
    baseSiteId: string,
    language: string,
    urlPrefix: string
  ): Promise<Array<{ loc: string; changefreq: string; priority: number }>> {
    const entries: Array<{
      loc: string;
      changefreq: string;
      priority: number;
    }> = [];
    let currentPage = 0;
    let totalPages = 1;

    do {
      const params = new URLSearchParams({
        fields: 'products(code,name)',
        pageSize: String(this.maxPageSize),
        currentPage: String(currentPage),
        lang: language,
      });

      const searchUrl = `${this.config.occBaseUrl}/occ/v2/${baseSiteId}/products/search?${params}`;

      try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
          console.error(
            `[Sitemap] OCC API error: ${response.status} for ${searchUrl}`
          );
          break;
        }

        const data = await response.json();
        const products = data.products || [];

        for (const product of products) {
          if (product.code) {
            // Use the REAL SemanticPathService — respects customer's RoutingConfig
            const urlSegments = this.semanticPathService.transform({
              cxRoute: 'product',
              params: { code: product.code, name: product.name },
            });

            // SemanticPathService.transform() returns string[] like ['/', 'product', '123', 'camera']
            const productPath = urlSegments
              .filter((s: string) => s !== '/')
              .join('/');
            const fullUrl = `${this.config.baseUrl}${urlPrefix}/${productPath}`;

            entries.push({
              loc: fullUrl,
              changefreq: 'daily',
              priority: 0.8,
            });
          }
        }

        totalPages = data.pagination?.totalPages ?? 1;
        currentPage++;
      } catch (error) {
        console.error(
          `[Sitemap] Error fetching products page ${currentPage}:`,
          error
        );
        break;
      }
    } while (currentPage < totalPages);

    return entries;
  }

  /**
   * Builds URL prefix based on urlEncodingAttributes.
   * E.g., for ['baseSite', 'language', 'currency'] → '/electronics-spa/en/USD'
   */
  private buildUrlPrefix(
    baseSiteId: string,
    language: string,
    currency: string,
    urlEncodingParams: string[]
  ): string {
    const values: Record<string, string> = {
      baseSite: baseSiteId,
      storefront: baseSiteId,
      language,
      currency,
    };

    const prefix = urlEncodingParams
      .map((param) => values[param] || '')
      .filter((v) => v)
      .join('/');

    return prefix ? `/${prefix}` : '';
  }

  private async getBaseSiteId(): Promise<string> {
    const baseSite = await firstValueFrom(
      this.baseSiteService.getActive().pipe(take(1))
    );
    return baseSite || '';
  }

  private async getActiveLanguages(): Promise<string[]> {
    const languages = await firstValueFrom(
      this.languageService.getAll().pipe(take(1))
    );
    return languages
      .filter((lang) => lang.active !== false)
      .map((lang) => lang.isocode)
      .filter((code): code is string => !!code);
  }

  // private async getDefaultLanguage(): Promise<string> {
  //   return await firstValueFrom(
  //     this.baseSiteService.get().pipe(
  //       take(1),
  //       map((baseSite) => baseSite?.defaultLanguage?.isocode ?? 'en')
  //     )
  //   );
  // }

  private async getActiveCurrencies(): Promise<string[]> {
    const currencies = await firstValueFrom(
      this.currencyService.getAll().pipe(take(1))
    );
    return currencies
      .filter((curr) => curr.active !== false)
      .map((curr) => curr.isocode)
      .filter((code): code is string => !!code);
  }

  private async getDefaultCurrency(): Promise<string> {
    return await firstValueFrom(
      this.baseSiteService.get().pipe(
        take(1),
        map((baseSite) => baseSite?.stores?.[0]?.defaultCurrency.isocode ?? 'USD')
      )
    );
  }

  // ---- XML builders ----

  private buildSitemapXml(
    entries: Array<{ loc: string; changefreq?: string; priority?: number }>
  ): string {
    const urlElements = entries
      .map((entry) => {
        const parts = [
          `  <url>`,
          `    <loc>${this.escapeXml(entry.loc)}</loc>`,
        ];
        if (entry.changefreq) {
          parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
        }
        if (entry.priority !== undefined) {
          parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
        }
        parts.push(`  </url>`);
        return parts.join('\n');
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  private buildSitemapIndexXml(sitemapFiles: string[]): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = sitemapFiles
      .map(
        (file) =>
          `  <sitemap>
    <loc>${this.config.baseUrl}/sitemaps/${file}</loc>
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
