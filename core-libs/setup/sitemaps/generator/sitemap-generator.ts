/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_SITEMAP_CONFIG, SitemapConfig } from '../config/sitemap-config';
import {
  SitemapUrlEntry,
  UrlProvider,
} from '../providers/url-provider';

/**
 * Result of sitemap generation
 */
export interface SitemapGenerationResult {
  /**
   * Path to the main sitemap index file
   */
  indexPath: string;

  /**
   * Paths to all generated sitemap files
   */
  sitemapFiles: string[];

  /**
   * Total number of URLs across all sitemaps
   */
  totalUrls: number;

  /**
   * URLs per language statistics
   */
  urlsByLanguage: Record<string, number>;
}

/**
 * Generates XML sitemap files from URL providers.
 *
 * Creates separate sitemap files per provider AND per language:
 * - sitemap-products-en.xml
 * - sitemap-products-de.xml
 * - sitemap-products-ja.xml
 * - etc.
 *
 * And a sitemap index file that references all of them.
 *
 * @example
 * ```typescript
 * const generator = new SitemapGenerator([
 *   createProductUrlProvider(),
 * ]);
 *
 * const result = await generator.generate(config, outputDir);
 * console.log(`Generated ${result.totalUrls} URLs`);
 * ```
 */
export class SitemapGenerator {
  constructor(protected readonly providers: UrlProvider[]) {}

  /**
   * Generates sitemap files for all registered providers
   *
   * @param config - Sitemap configuration
   * @param outputDir - Directory to write sitemap files
   * @returns Generation result with file paths and statistics
   */
  async generate(
    config: SitemapConfig,
    outputDir: string
  ): Promise<SitemapGenerationResult> {
    const mergedConfig = { ...DEFAULT_SITEMAP_CONFIG, ...config };

    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    console.log(`[Sitemap] Generator: Starting sitemap generation to ${outputDir}`);

    const sitemapFiles: string[] = [];
    let totalUrls = 0;
    const urlsByLanguage: Record<string, number> = {};

    // Generate sitemap for each provider
    for (const provider of this.providers) {
      console.log(`[Sitemap] Generator: Processing provider '${provider.name}'`);

      const languageUrls = await provider.getUrlsByLanguage(mergedConfig);

      // Create separate file for each language
      for (const langUrls of languageUrls) {
        if (langUrls.urls.length > 0) {
          const filename = `sitemap-${provider.name}-${langUrls.language}.xml`;
          const filepath = join(outputDir, filename);

          const xml = this.buildSitemapXml(langUrls.urls);
          writeFileSync(filepath, xml, 'utf-8');

          sitemapFiles.push(filename);
          totalUrls += langUrls.urls.length;
          urlsByLanguage[langUrls.language] = (urlsByLanguage[langUrls.language] || 0) + langUrls.urls.length;

          console.log(`[Sitemap] Generator: Created ${filename} with ${langUrls.urls.length} URLs`);
        }
      }
    }

    // Generate sitemap index
    const indexPath = join(outputDir, 'sitemap.xml');
    const indexXml = this.buildSitemapIndexXml(sitemapFiles, mergedConfig.baseUrl);
    writeFileSync(indexPath, indexXml, 'utf-8');

    console.log(`[Sitemap] Generator: Created sitemap index with ${sitemapFiles.length} sitemaps, ${totalUrls} total URLs`);
    console.log(`[Sitemap] Generator: URLs by language:`, urlsByLanguage);

    return {
      indexPath,
      sitemapFiles,
      totalUrls,
      urlsByLanguage,
    };
  }

  /**
   * Builds XML content for a single sitemap file
   */
  protected buildSitemapXml(urls: SitemapUrlEntry[]): string {
    const urlEntries = urls
      .map((url) => this.buildUrlElement(url))
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  }

  /**
   * Builds XML element for a single URL entry
   */
  protected buildUrlElement(entry: SitemapUrlEntry): string {
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
  }

  /**
   * Builds sitemap index XML that references individual sitemaps
   */
  protected buildSitemapIndexXml(sitemapFiles: string[], baseUrl: string): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapEntries = sitemapFiles
      .map(
        (file) => `  <sitemap>
    <loc>${baseUrl}/sitemaps/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
  }

  /**
   * Escapes special XML characters in a string
   */
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
 * Factory function to create a SitemapGenerator with providers
 */
export function createSitemapGenerator(providers: UrlProvider[]): SitemapGenerator {
  return new SitemapGenerator(providers);
}

