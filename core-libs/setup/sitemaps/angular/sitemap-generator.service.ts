/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, InjectionToken } from '@angular/core';
import {
  BaseSiteService,
  CurrencyService,
  LanguageService,
  SiteContextParamsService,
} from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { SitemapUrlService } from './sitemap-url.service';

/**
 * Configuration for sitemap generation
 */
export interface SitemapGeneratorConfig {
  /**
   * Base URL for the storefront (e.g., 'https://example.com')
   */
  baseUrl: string;

  /**
   * OCC backend URL for fetching data
   */
  occBaseUrl: string;
}

/**
 * Injection token for sitemap configuration
 */
export const SITEMAP_GENERATOR_CONFIG = new InjectionToken<SitemapGeneratorConfig>(
  'SITEMAP_GENERATOR_CONFIG'
);

/**
 * Single URL entry for sitemap
 */
export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * URLs grouped by language
 */
export interface LanguageSitemapEntries {
  language: string;
  currency: string;
  entries: SitemapEntry[];
}

/**
 * Angular service that generates sitemap data using Spartacus services.
 *
 * This service runs in SSR context and has full access to Angular DI,
 * including SemanticPathService for correct URL generation and
 * SiteContextParamsService for URL encoding attributes.
 */
@Injectable({ providedIn: 'root' })
export class SitemapGeneratorService {
  protected sitemapUrlService = inject(SitemapUrlService);
  protected baseSiteService = inject(BaseSiteService);
  protected languageService = inject(LanguageService);
  protected currencyService = inject(CurrencyService);
  protected siteContextParamsService = inject(SiteContextParamsService);

  /**
   * Maximum page size for OCC API calls
   */
  protected readonly MAX_PAGE_SIZE = 100;

  /**
   * Gets all active languages for the current base site.
   */
  async getActiveLanguages(): Promise<string[]> {
    const languages = await firstValueFrom(
      this.languageService.getAll().pipe(take(1))
    );
    return languages
      .filter(lang => lang.active !== false)
      .map(lang => lang.isocode)
      .filter((code): code is string => !!code);
  }

  /**
   * Gets all active currencies for the current base site.
   */
  async getActiveCurrencies(): Promise<string[]> {
    const currencies = await firstValueFrom(
      this.currencyService.getAll().pipe(take(1))
    );
    return currencies
      .filter(curr => curr.active !== false)
      .map(curr => curr.isocode)
      .filter((code): code is string => !!code);
  }

  /**
   * Gets the current base site ID.
   */
  async getBaseSiteId(): Promise<string> {
    const baseSite = await firstValueFrom(
      this.baseSiteService.getActive().pipe(take(1))
    );
    return baseSite || '';
  }

  /**
   * Gets URL encoding parameters (e.g., ['baseSite', 'language', 'currency'])
   */
  getUrlEncodingParameters(): string[] {
    return this.siteContextParamsService.getUrlEncodingParameters();
  }

  /**
   * Builds the URL prefix based on urlEncodingAttributes.
   * E.g., for ['baseSite', 'language', 'currency'] with values
   * 'electronics-spa', 'en', 'USD' returns '/electronics-spa/en/USD'
   */
  buildUrlPrefix(baseSiteId: string, language: string, currency: string): string {
    const urlParams = this.getUrlEncodingParameters();
    const values: Record<string, string> = {
      baseSite: baseSiteId,
      language: language,
      currency: currency,
    };

    const prefix = urlParams
      .map(param => values[param] || '')
      .filter(v => v)
      .join('/');

    return prefix ? `/${prefix}` : '';
  }

  /**
   * Generates product URLs for all language/currency combinations.
   *
   * @param baseUrl - Base URL for the storefront
   * @param occBaseUrl - OCC backend URL
   * @returns Promise with sitemap entries grouped by language
   */
  async generateProductUrls(
    baseUrl: string,
    occBaseUrl: string
  ): Promise<LanguageSitemapEntries[]> {
    const languages = await this.getActiveLanguages();
    const currencies = await this.getActiveCurrencies();
    const baseSiteId = await this.getBaseSiteId();

    console.log(`[Sitemap] Base site: ${baseSiteId}`);
    console.log(`[Sitemap] URL encoding params: ${this.getUrlEncodingParameters().join(', ')}`);
    console.log(`[Sitemap] Languages: ${languages.join(', ')}`);
    console.log(`[Sitemap] Currencies: ${currencies.join(', ')}`);

    const results: LanguageSitemapEntries[] = [];

    // For sitemap, we typically generate for each language with default currency
    // But if needed, we could iterate over all combinations
    const defaultCurrency = currencies[0] || 'USD';

    for (const language of languages) {
      const entries = await this.fetchProductsForLanguage(
        baseUrl,
        occBaseUrl,
        baseSiteId,
        language,
        defaultCurrency
      );
      results.push({ language, currency: defaultCurrency, entries });
    }

    return results;
  }

  /**
   * Fetches products and generates URLs for a specific language.
   */
  protected async fetchProductsForLanguage(
    baseUrl: string,
    occBaseUrl: string,
    baseSiteId: string,
    language: string,
    currency: string
  ): Promise<SitemapEntry[]> {
    const entries: SitemapEntry[] = [];
    let currentPage = 0;
    let totalPages = 1;

    // Build URL prefix from urlEncodingAttributes
    const urlPrefix = this.buildUrlPrefix(baseSiteId, language, currency);
    console.log(`[Sitemap] URL prefix for ${language}/${currency}: ${urlPrefix}`);

    do {
      const result = await this.fetchProductPage(
        occBaseUrl,
        baseSiteId,
        language,
        currentPage
      );

      for (const product of result.products) {
        if (product.code) {
          // Use SemanticPathService via SitemapUrlService
          const urlSegments = this.sitemapUrlService.getProductUrl(
            product.code,
            product.name
          );

          // Build full path with context prefix
          const productPath = this.sitemapUrlService.segmentsToPath(urlSegments);
          const fullPath = urlPrefix + productPath;

          entries.push({
            loc: `${baseUrl}${fullPath}`,
            changefreq: 'daily',
            priority: 0.8,
          });
        }
      }

      totalPages = result.totalPages;
      currentPage++;

    } while (currentPage < totalPages);

    console.log(`[Sitemap] Found ${entries.length} products for ${language}/${currency}`);

    return entries;
  }

  /**
   * Fetches a page of products from OCC API.
   */
  protected async fetchProductPage(
    occBaseUrl: string,
    baseSiteId: string,
    language: string,
    page: number
  ): Promise<{ products: Array<{ code?: string; name?: string }>; totalPages: number }> {
    const params = new URLSearchParams({
      fields: 'products(code,name)',
      pageSize: String(this.MAX_PAGE_SIZE),
      currentPage: String(page),
      lang: language,
    });

    const url = `${occBaseUrl}/occ/v2/${baseSiteId}/products/search?${params}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`[Sitemap] Failed to fetch products: ${response.status}`);
        return { products: [], totalPages: 0 };
      }

      const data = await response.json();
      return {
        products: data.products || [],
        totalPages: data.pagination?.totalPages ?? 1,
      };
    } catch (error) {
      console.error(`[Sitemap] Error fetching products:`, error);
      return { products: [], totalPages: 0 };
    }
  }

  /**
   * Generates XML sitemap content from entries.
   */
  generateSitemapXml(entries: SitemapEntry[]): string {
    const urlElements = entries.map(entry => {
      const parts = [`  <url>`, `    <loc>${this.escapeXml(entry.loc)}</loc>`];

      if (entry.lastmod) {
        parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      }
      if (entry.changefreq) {
        parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }
      if (entry.priority !== undefined) {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }

      parts.push(`  </url>`);
      return parts.join('\n');
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  /**
   * Generates sitemap index XML.
   */
  generateSitemapIndexXml(sitemapFiles: string[], baseUrl: string): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = sitemapFiles.map(file =>
      `  <sitemap>
    <loc>${baseUrl}/sitemaps/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
  }

  protected escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}


