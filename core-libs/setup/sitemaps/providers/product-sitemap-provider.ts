/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { OccEndpointsService, SemanticPathService } from '@spartacus/core';
import { SitemapUrlProvider } from '../model/sitemap-url-provider';
import {
  SitemapGenerationContext,
  SitemapProviderResult,
  SitemapUrlEntry,
} from '../model/sitemap.model';

/**
 * Default sitemap URL provider for product detail pages (PDP).
 *
 * Fetches products from OCC product search API using the `sitemap` scope
 * (configured in `defaultOccProductConfig.productSearch.sitemap`),
 * and generates URLs using the real `SemanticPathService`.
 *
 * ## Currency in sitemap filenames
 *
 * Files are named per language AND currency (e.g., `sitemap-products-en-USD.xml`)
 * even though OCC product search results are typically currency-independent.
 * This ensures that when urlEncodingAttributes include 'currency', each
 * language/currency combination has its own prefix in URLs.
 *
 * ## Customization
 *
 * Customers can override this provider by providing their own implementation:
 *
 * ```typescript
 * { provide: SITEMAP_URL_PROVIDERS, useClass: MyProductProvider, multi: true }
 * ```
 *
 * Or extend it:
 *
 * ```typescript
 * @Injectable()
 * export class MyProductProvider extends ProductSitemapProvider {
 *   protected override maxPageSize = 200;
 *
 *   protected override buildProductEntry(
 *     product: any, baseUrl: string, urlPrefix: string
 *   ): SitemapUrlEntry | null {
 *     // Custom logic...
 *   }
 * }
 * ```
 */
@Injectable()
export class ProductSitemapProvider extends SitemapUrlProvider {
  readonly name = 'products';

  protected semanticPathService = inject(SemanticPathService);
  protected occEndpointsService = inject(OccEndpointsService);

  /**
   * Maximum page size for OCC API pagination.
   * Override in subclass to change.
   */
  protected maxPageSize = 100;

  async getUrls(
    context: SitemapGenerationContext
  ): Promise<SitemapProviderResult> {
    const sitemaps: Record<string, string> = {};
    const files: string[] = [];
    let totalUrls = 0;
    const urlsByLanguage: Record<string, number> = {};

    const hasCurrencyInUrl = context.urlEncodingParams.includes('currency');
    const hasLanguageInUrl = context.urlEncodingParams.includes('language');

    // If language is part of URL encoding, generate per-language.
    // Otherwise, generate only for default language.
    const languagesToIterate = hasLanguageInUrl
      ? context.languages
      : [context.languages[0] || 'en'];

    // If currency is part of URL encoding, generate per-language-per-currency.
    // Otherwise, generate per-language with default currency.
    const currenciesToIterate = hasCurrencyInUrl
      ? context.currencies
      : [context.defaultCurrency];

    for (const language of languagesToIterate) {
      for (const currency of currenciesToIterate) {
        const urlPrefix = this.buildUrlPrefix(context, language, currency);

        console.log(
          `[Sitemap] ProductProvider: Fetching products for ${language}/${currency}, prefix: ${urlPrefix}`
        );

        const entries = await this.fetchProducts(context, language, urlPrefix);

        if (entries.length > 0) {
          // Split into multiple files if exceeding maxUrlsPerSitemap
          const chunks = this.chunkEntries(entries, context.config.maxUrlsPerSitemap);

          for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const filename = this.buildFilename(
              hasLanguageInUrl ? language : undefined,
              hasCurrencyInUrl ? currency : undefined,
              chunks.length > 1 ? i + 1 : undefined
            );

            sitemaps[filename] = this.buildSitemapXml(chunk);
            files.push(filename);
            totalUrls += chunk.length;
            urlsByLanguage[language] =
              (urlsByLanguage[language] || 0) + chunk.length;

            console.log(
              `[Sitemap] ProductProvider: Generated ${filename}: ${chunk.length} URLs`
            );
          }
        }
      }
    }

    return {
      providerName: this.name,
      sitemaps,
      files,
      totalUrls,
      urlsByLanguage,
    };
  }


  /**
   * Fetches all products from OCC and builds URL entries.
   */
  protected async fetchProducts(
    context: SitemapGenerationContext,
    language: string,
    urlPrefix: string
  ): Promise<SitemapUrlEntry[]> {
    const entries: SitemapUrlEntry[] = [];
    let currentPage = 0;
    let totalPages = 1;

    do {
      const searchUrl = this.buildSearchUrl(language, currentPage);

      try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
          console.error(
            `[Sitemap] ProductProvider: OCC error ${response.status} for ${searchUrl}`
          );
          break;
        }

        const data = await response.json();
        const products = data.products || [];

        for (const product of products) {
          const entry = this.buildProductEntry(
            product,
            context.baseUrl,
            urlPrefix
          );
          if (entry) {
            entries.push(entry);
          }
        }

        totalPages = data.pagination?.totalPages ?? 1;
        currentPage++;
      } catch (error) {
        console.error(
          `[Sitemap] ProductProvider: Error fetching page ${currentPage}:`,
          error
        );
        break;
      }
    } while (currentPage < totalPages);

    return entries;
  }

  /**
   * Builds the OCC search URL using `OccEndpointsService.buildUrl()` with 'sitemap' scope.
   *
   * This respects customer's OCC endpoint configuration and uses the
   * `productSearch.sitemap` scope which defaults to `'products(code,name)'`.
   */
  protected buildSearchUrl(
    language: string,
    page: number
  ): string {
    return this.occEndpointsService.buildUrl('productSearch', {
      queryParams: {
        pageSize: this.maxPageSize,
        currentPage: page,
        lang: language,
      },
      scope: 'sitemap',
    });
  }

  /**
   * Builds a single sitemap URL entry for a product.
   * Override in subclass to customize URL generation or add metadata.
   *
   * @param product - Product data from OCC (code, name)
   * @param baseUrl - Storefront base URL
   * @param urlPrefix - URL prefix (baseSite/language/currency)
   * @returns SitemapUrlEntry or null to skip this product
   */
  protected buildProductEntry(
    product: { code?: string; name?: string },
    baseUrl: string,
    urlPrefix: string
  ): SitemapUrlEntry | null {
    if (!product.code) {
      return null;
    }

    // Use the REAL SemanticPathService — respects customer's RoutingConfig
    const urlSegments = this.semanticPathService.transform({
      cxRoute: 'product',
      params: { code: product.code, name: product.name },
    });

    // SemanticPathService.transform() returns string[] like ['/', 'product', '123', 'camera']
    const productPath = (urlSegments as string[])
      .filter((s) => s !== '/')
      .join('/');

    return {
      loc: `${baseUrl}${urlPrefix}/${productPath}`,
      changefreq: 'daily',
      priority: 0.8,
    };
  }
}

