/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SitemapConfig, SitemapLanguageConfig } from '../config/sitemap-config';
import { BaseSiteService } from '../services/base-site.service';
import { UrlPathService } from '../services/url-path.service';
import { LanguageUrls, SitemapUrlEntry, UrlProvider } from './url-provider';

/**
 * OCC product search response structure
 */
interface OccProductSearchResponse {
  products?: Array<{
    code?: string;
    name?: string;
    url?: string;
  }>;
  pagination?: {
    currentPage?: number;
    pageSize?: number;
    totalPages?: number;
    totalResults?: number;
  };
}

/**
 * URL Provider for product detail pages (PDP).
 * Fetches products from OCC API and generates sitemap URLs.
 *
 * Uses paginated search endpoint since OCC limits page size to 100.
 * Generates separate URL lists per language for separate sitemap files.
 *
 * @deprecated Use Angular-based SitemapGeneratorService for correct URL generation
 * that uses SemanticPathService and respects urlEncodingAttributes from config.
 */
export class ProductUrlProvider implements UrlProvider {
  readonly name = 'products';

  /**
   * Maximum page size allowed by OCC API
   */
  protected readonly MAX_PAGE_SIZE = 100;

  protected urlPathService: UrlPathService;
  protected baseSiteService: BaseSiteService | null = null;
  protected urlEncodingAttributes: string[] = [];

  constructor(urlPathService?: UrlPathService) {
    this.urlPathService = urlPathService || new UrlPathService();
  }

  async getUrlsByLanguage(config: SitemapConfig): Promise<LanguageUrls[]> {
    const languages = await this.resolveLanguages(config);

    // Fetch urlEncodingAttributes from basesites API
    await this.loadUrlEncodingAttributes(config);

    console.log(`[Sitemap] ProductUrlProvider: URL encoding attributes: ${this.urlEncodingAttributes.join(', ')}`);
    console.log(`[Sitemap] ProductUrlProvider: Generating URLs for ${languages.length} language(s): ${languages.map(l => l.isocode).join(', ')}`);

    const results: LanguageUrls[] = [];

    for (const lang of languages) {
      const urls = await this.getUrlsForLanguage(config, lang);
      results.push({
        language: lang.isocode,
        urls,
      });
    }

    const totalUrls = results.reduce((sum, r) => sum + r.urls.length, 0);
    console.log(`[Sitemap] ProductUrlProvider: Completed. Total URLs across all languages: ${totalUrls}`);

    return results;
  }

  /**
   * Gets URLs for a specific language
   */
  protected async getUrlsForLanguage(
    config: SitemapConfig,
    language: SitemapLanguageConfig
  ): Promise<SitemapUrlEntry[]> {
    const urls: SitemapUrlEntry[] = [];
    let currentPage = 0;
    let totalPages = 1;

    console.log(`[Sitemap] ProductUrlProvider: Fetching products for language '${language.isocode}'`);

    do {
      const pageUrls = await this.fetchProductPage(config, language, currentPage);

      if (pageUrls.urls.length > 0) {
        urls.push(...pageUrls.urls);
      }

      totalPages = pageUrls.totalPages;
      currentPage++;

    } while (currentPage < totalPages);

    console.log(`[Sitemap] ProductUrlProvider: Found ${urls.length} products for '${language.isocode}'`);

    return urls;
  }

  /**
   * Resolves languages to use for sitemap generation.
   * If autoDiscoverLanguages is enabled, fetches from basesites API.
   */
  protected async resolveLanguages(config: SitemapConfig): Promise<SitemapLanguageConfig[]> {
    // If languages explicitly configured, use them
    if (config.languages && config.languages.length > 0) {
      return config.languages;
    }

    // If auto-discover disabled, use English as default
    if (config.autoDiscoverLanguages === false) {
      return [{ isocode: 'en', isDefault: true }];
    }

    // Auto-discover from basesites API
    return await this.discoverLanguages(config);
  }

  /**
   * Discovers available languages from basesites API
   */
  protected async discoverLanguages(config: SitemapConfig): Promise<SitemapLanguageConfig[]> {
    if (!this.baseSiteService) {
      this.baseSiteService = new BaseSiteService(config.occBaseUrl);
    }

    const languages = await this.baseSiteService.getLanguages(config.baseSiteId);
    const defaultLang = await this.baseSiteService.getDefaultLanguage(config.baseSiteId);

    if (languages.length === 0) {
      console.warn(`[Sitemap] ProductUrlProvider: No languages found, using 'en' as default`);
      return [{ isocode: 'en', isDefault: true }];
    }

    return languages.map((lang) => ({
      isocode: lang.isocode,
      isDefault: lang.isocode === defaultLang,
    }));
  }

  /**
   * Loads urlEncodingAttributes from basesites API
   */
  protected async loadUrlEncodingAttributes(config: SitemapConfig): Promise<void> {
    if (!this.baseSiteService) {
      this.baseSiteService = new BaseSiteService(config.occBaseUrl);
    }

    this.urlEncodingAttributes = await this.baseSiteService.getUrlEncodingAttributes(config.baseSiteId);

    // Map 'storefront' to 'baseSite' (OCC uses 'storefront', Spartacus uses 'baseSite')
    this.urlEncodingAttributes = this.urlEncodingAttributes.map(attr =>
      attr === 'storefront' ? 'baseSite' : attr
    );
  }

  /**
   * Builds URL prefix based on urlEncodingAttributes.
   * E.g., for ['baseSite', 'language', 'currency'] returns '/electronics-spa/en/USD'
   */
  protected buildUrlPrefix(
    config: SitemapConfig,
    language: SitemapLanguageConfig
  ): string {
    const values: Record<string, string> = {
      baseSite: config.baseSiteId,
      language: language.isocode,
      currency: config.currency || 'USD',
    };

    const prefix = this.urlEncodingAttributes
      .map(attr => values[attr] || '')
      .filter(v => v)
      .join('/');

    return prefix ? `/${prefix}` : '';
  }

  /**
   * Fetches a single page of products from OCC API
   */
  protected async fetchProductPage(
    config: SitemapConfig,
    language: SitemapLanguageConfig,
    page: number
  ): Promise<{ urls: SitemapUrlEntry[]; totalPages: number }> {
    const searchUrl = this.buildSearchUrl(config, language.isocode, page);

    try {
      const response = await fetch(searchUrl);

      if (!response.ok) {
        console.error(`[Sitemap] ProductUrlProvider: Failed to fetch products. Status: ${response.status}`);
        return { urls: [], totalPages: 0 };
      }

      const data: OccProductSearchResponse = await response.json();

      const urls = this.transformProductsToUrls(data.products || [], config, language);
      const totalPages = data.pagination?.totalPages ?? 1;

      return { urls, totalPages };

    } catch (error) {
      console.error(`[Sitemap] ProductUrlProvider: Error fetching products:`, error);
      return { urls: [], totalPages: 0 };
    }
  }

  /**
   * Builds OCC search API URL with pagination
   */
  protected buildSearchUrl(config: SitemapConfig, language: string, page: number): string {
    const params = new URLSearchParams({
      fields: 'products(code,name,url)',
      pageSize: String(this.MAX_PAGE_SIZE),
      currentPage: String(page),
      lang: language,
      curr: config.currency || 'USD',
    });

    return `${config.occBaseUrl}/occ/v2/${config.baseSiteId}/products/search?${params.toString()}`;
  }

  /**
   * Transforms OCC product data to sitemap URL entries
   */
  protected transformProductsToUrls(
    products: Array<{ code?: string; name?: string; url?: string }>,
    config: SitemapConfig,
    language: SitemapLanguageConfig
  ): SitemapUrlEntry[] {
    // Apply custom routes if provided
    if (config.routes) {
      this.urlPathService.setRoutes(config.routes);
    }

    // Build URL prefix from urlEncodingAttributes
    const urlPrefix = this.buildUrlPrefix(config, language);

    return products
      .filter((product) => product.code)
      .map((product) => {
        const productPath = this.urlPathService.transform('product', {
          productCode: product.code,
          code: product.code,
          name: product.name,
        });

        // Build full URL with context prefix (baseSite/language/currency)
        const fullPath = urlPrefix + (productPath || `/product/${product.code}`);

        return {
          loc: `${config.baseUrl}${fullPath}`,
          changefreq: 'daily' as const,
          priority: 0.8,
        };
      });
  }

}

/**
 * Factory function to create ProductUrlProvider
 */
export function createProductUrlProvider(urlPathService?: UrlPathService): UrlProvider {
  return new ProductUrlProvider(urlPathService);
}

