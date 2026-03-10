/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
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
 *
 * ## Creating a custom provider
 *
 * ```typescript
 * @Injectable()
 * export class CategorySitemapProvider extends SitemapUrlProvider {
 *   readonly name = 'categories';
 *
 *   async getUrls(context: SitemapGenerationContext): Promise<SitemapProviderResult> {
 *     // Fetch categories and generate URLs...
 *   }
 * }
 * ```
 *
 * ## Registering a custom provider
 *
 * ```typescript
 * // app.config.server.ts
 * providers: [
 *   provideSitemapGenerator(),
 *   { provide: SITEMAP_URL_PROVIDERS, useClass: CategorySitemapProvider, multi: true },
 * ]
 * ```
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
   * Builds URL prefix based on urlEncodingAttributes.
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
   * Builds sitemap XML content from URL entries.
   */
  protected buildSitemapXml(entries: SitemapUrlEntry[]): string {
    const urlElements = entries
      .map((entry) => {
        const parts = [
          `  <url>`,
          `    <loc>${this.escapeXml(entry.loc)}</loc>`,
        ];
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

  protected escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
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

