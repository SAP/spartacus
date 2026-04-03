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
 * Streaming sitemap generator that yields sitemap file content per-chunk.
 *
 * Unlike {@link SitemapGeneratorService} which accumulates all XML in memory,
 * this service calls a callback for each generated sitemap file, allowing the
 * caller to write to disk immediately and free memory.
 *
 * This is critical for large-scale sites (millions of products, 20+ baseSites)
 * to avoid out-of-memory errors.
 *
 * ## Memory model
 *
 * At any point in time, only ONE sitemap file's worth of URLs (up to
 * `maxUrlsPerSitemap`, default 50,000) is held in memory. As soon as a
 * file is yielded, its URLs can be garbage-collected.
 *
 * ## Usage
 *
 * ```typescript
 * const generator = inject(StreamingSitemapGeneratorService);
 * const result = await generator.generateSitemaps(context, {}, async (filename, xml) => {
 *   await fs.promises.writeFile(`/output/${filename}`, xml);
 * });
 * ```
 */
@Injectable()
export class StreamingSitemapGeneratorService {
  protected discoveryService = inject(SiteContextAwareRoutesDiscoveryService);
  protected sitemapConfig = inject(SitemapConfig);

  /**
   * Generates sitemaps and yields each file via callback.
   *
   * @param context - Generation context for the baseSite
   * @param options - Discovery filtering options
   * @param onFile - Callback invoked for each generated sitemap file.
   *                 Receives (filename, xmlContent). Must return a Promise.
   * @returns Summary result (without the XML content itself).
   */
  async generateSitemaps(
    context: SitemapGenerationContext,
    options: RoutesDiscoveryOptions = {},
    onFile?: (filename: string, xml: string) => Promise<void>
  ): Promise<SitemapGenerationResult> {
    const files: string[] = [];
    const sitemaps: Record<string, string> = {};
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

    for (const [, urls] of discoveryResult.urlsByLanguageCurrency) {
      const language = urls[0]?.language;
      const currency = urls[0]?.currency;

      // Process in chunks to bound memory
      for (let offset = 0; offset < urls.length; offset += maxUrlsPerSitemap) {
        const chunk = urls.slice(offset, offset + maxUrlsPerSitemap);
        if (chunk.length === 0) continue;

        const chunkIndex = Math.floor(offset / maxUrlsPerSitemap);
        const totalChunks = Math.ceil(urls.length / maxUrlsPerSitemap);

        const filename = this.buildFilename(
          hasLanguageInUrl ? language : undefined,
          hasCurrencyInUrl ? currency : undefined,
          totalChunks > 1 ? chunkIndex + 1 : undefined
        );

        const entries = chunk.map((url) =>
          this.buildSitemapEntry(url, context.baseUrl)
        );
        const xml = this.buildSitemapXml(entries);

        // Yield to caller (e.g. write to disk) immediately
        if (onFile) {
          await onFile(filename, xml);
        } else {
          // Fallback: accumulate in memory (backward compat)
          sitemaps[filename] = xml;
        }

        files.push(filename);
        totalUrls += chunk.length;

        if (language) {
          urlsByLanguageCount[language] =
            (urlsByLanguageCount[language] || 0) + chunk.length;
        }

        console.log(
          `[Sitemap] StreamingGenerator: Generated ${filename}: ${chunk.length} URLs`
        );
      }
    }

    return {
      sitemaps: onFile ? {} : sitemaps,
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
    if (language) parts.push(language);
    if (currency) parts.push(currency);
    if (pageNumber !== undefined) parts.push(String(pageNumber));
    return parts.join('-') + '.xml';
  }

  protected buildSitemapXml(entries: SitemapUrlEntry[]): string {
    const urlElements = entries
      .map((entry) => {
        const parts = [`  <url>`, `    <loc>${escapeXml(entry.loc)}</loc>`];
        if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
        if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
        if (entry.priority !== undefined) parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
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

