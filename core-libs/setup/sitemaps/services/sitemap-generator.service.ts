/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { SitemapConfig, defaultSitemapConfig } from '../config/sitemap-config';
import {
  RoutesDiscoveryOptions,
  SiteContextAwareUrl,
  SitemapGenerationContext,
  SitemapGenerationResult,
  SitemapUrlEntry,
} from '../model/sitemap.model';
import { escapeXml } from '../utils/xml-utils';
import { SiteContextAwareRoutesDiscoveryService } from './site-context-aware-routes-discovery.service';

/**
 * Service for generating sitemap XML files from discovered routes.
 *
 * Responsibilities:
 * - Calls discovery service to get all URLs
 * - Splits URLs into files based on maxUrlsPerSitemap limit
 * - Generates XML content for each file
 * - Returns file map for serving via Express
 */
@Injectable()
export class SitemapGeneratorService {
  protected discoveryService = inject(SiteContextAwareRoutesDiscoveryService);
  protected sitemapConfig = inject(SitemapConfig);

  /**
   * Generates all sitemap files for a baseSite.
   */
  async generateSitemaps(
    context: SitemapGenerationContext,
    options: RoutesDiscoveryOptions = {}
  ): Promise<SitemapGenerationResult> {
    const sitemaps: Record<string, string> = {};
    const files: string[] = [];
    const urlsByLanguageCount: Record<string, number> = {};
    let totalUrls = 0;

    const maxUrlsPerSitemap =
      this.sitemapConfig.sitemap?.maxUrlsPerSitemap ??
      defaultSitemapConfig.sitemap!.maxUrlsPerSitemap!;

    const hasCurrencyInUrl = context.urlEncodingParams.includes('currency');
    const hasLanguageInUrl = context.urlEncodingParams.includes('language');

    const discoveryResult = await this.discoveryService.discoverUrls(
      context,
      options
    );

    // Each key is either "language" or "language-currency"
    for (const [, urls] of discoveryResult.urlsByLanguageCurrency) {
      const entries = urls.map((url) =>
        this.buildSitemapEntry(url, context.baseUrl)
      );

      const chunks = this.chunkEntries(entries, maxUrlsPerSitemap);

      // Extract language/currency from the first URL in the group
      const language = urls[0]?.language;
      const currency = urls[0]?.currency;

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        if (chunk.length === 0) {
          continue;
        }

        const filename = this.buildFilename(
          hasLanguageInUrl ? language : undefined,
          hasCurrencyInUrl ? currency : undefined,
          chunks.length > 1 ? i + 1 : undefined
        );

        sitemaps[filename] = this.buildSitemapXml(chunk);
        files.push(filename);
        totalUrls += chunk.length;

        if (language) {
          urlsByLanguageCount[language] =
            (urlsByLanguageCount[language] || 0) + chunk.length;
        }

        console.log(
          `[Sitemap] SitemapGenerator: Generated ${filename}: ${chunk.length} URLs`
        );
      }
    }

    return {
      sitemaps,
      files,
      totalUrls,
      urlsByLanguage: urlsByLanguageCount,
    };
  }

  protected buildSitemapEntry(
    url: SiteContextAwareUrl,
    baseUrl: string
  ): SitemapUrlEntry {
    return {
      loc: `${baseUrl}${url.fullPath}`,
      changefreq: this.getChangeFrequency(url.cxRoute),
      priority: this.getPriority(url.cxRoute),
    };
  }

  protected getChangeFrequency(cxRoute: string): SitemapUrlEntry['changefreq'] {
    switch (cxRoute) {
      case 'home':
      case 'product':
        return 'daily';
      default:
        return 'monthly';
    }
  }

  protected getPriority(cxRoute: string): number {
    switch (cxRoute) {
      case 'home':
        return 1.0;
      case 'product':
        return 0.8;
      default:
        return 0.5;
    }
  }

  protected buildFilename(
    language?: string,
    currency?: string,
    pageNumber?: number
  ): string {
    const parts = ['sitemap'];
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

  protected chunkEntries(
    entries: SitemapUrlEntry[],
    maxSize: number
  ): SitemapUrlEntry[][] {
    if (entries.length === 0) {
      return [];
    }
    const chunks: SitemapUrlEntry[][] = [];
    for (let i = 0; i < entries.length; i += maxSize) {
      chunks.push(entries.slice(i, i + maxSize));
    }
    return chunks;
  }

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


