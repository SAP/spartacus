/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { escapeXml } from '../utils/xml-utils';
import {
  SitemapGenerationContext,
  SitemapProviderResult,
  SitemapUrlEntry,
} from './sitemap.model';

/**
 * Abstract base class for sitemap URL providers.
 *
 * Extend this class to add custom URL sources to the sitemap.
 * Each provider generates URLs for a specific content type
 * (products, categories, CMS pages, etc.).
 *
 * Providers are registered via the `SITEMAP_URL_PROVIDERS` multi-token
 * and automatically picked up by the sitemap generator.
 */
export abstract class SitemapUrlProvider {
  /**
   * Unique name for this provider. Used in sitemap filenames:
   * e.g., name='products' → sitemap-products-en-USD.xml
   */
  abstract readonly name: string;

  /**
   * Generates sitemap URLs for all language/currency combinations.
   *
   * @param context - Resolved site context (baseSite, languages, currencies, etc.)
   * @returns Provider result with generated sitemaps
   */
  abstract getUrls(
    context: SitemapGenerationContext
  ): Promise<SitemapProviderResult>;

  // ---- Shared utility methods for subclasses ----

  /**
   * Builds URL prefix based on urlEncodingParams.
   * E.g., for ['baseSite', 'language', 'currency'] → '/electronics-spa/en/USD'
   */
  protected buildUrlPrefix(
    context: SitemapGenerationContext,
    language: string,
    currency: string
  ): string {
    const values: Record<string, string> = {
      baseSite: context.baseSiteId,
      storefront: context.baseSiteId,
      language,
      currency,
    };

    const prefix = context.urlEncodingParams
      .map((param) => values[param] || '')
      .filter((v) => v)
      .join('/');

    return prefix ? `/${prefix}` : '';
  }

  /**
   * Builds filename for sitemap based on language, currency, and page number.
   * Only includes components that are present in urlEncodingParams.
   */
  protected buildFilename(
    language?: string,
    currency?: string,
    pageNumber?: number
  ): string {
    const parts = [`sitemap-${this.name}`];

    if (language) {
      parts.push(language);
    }
    if (currency) {
      parts.push(currency);
    }
    if (pageNumber !== undefined) {
      parts.push(String(pageNumber));
    }

    return parts.join('-') + '.xml';
  }

  /**
   * Splits entries into chunks of maxSize.
   * Per sitemaps.org protocol, each sitemap can have max 50,000 URLs.
   */
  protected chunkEntries(
    entries: SitemapUrlEntry[],
    maxSize: number
  ): SitemapUrlEntry[][] {
    const chunks: SitemapUrlEntry[][] = [];
    for (let i = 0; i < entries.length; i += maxSize) {
      chunks.push(entries.slice(i, i + maxSize));
    }
    return chunks.length > 0 ? chunks : [[]];
  }

  /**
   * Builds sitemap XML content from URL entries.
   */
  protected buildSitemapXml(entries: SitemapUrlEntry[]): string {
    const urlElements = entries
      .map((entry) => {
        const parts = [`  <url>`, `    <loc>${escapeXml(entry.loc)}</loc>`];
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
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }
}

/**
 * Multi-provider injection token for sitemap URL providers.
 *
 * Register custom providers:
 * ```typescript
 * { provide: SITEMAP_URL_PROVIDERS, useClass: MyProvider, multi: true }
 * ```
 */
export const SITEMAP_URL_PROVIDERS = new InjectionToken<SitemapUrlProvider[]>(
  'SITEMAP_URL_PROVIDERS'
);
