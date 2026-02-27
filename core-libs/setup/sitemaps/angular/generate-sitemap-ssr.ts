/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injector, runInInjectionContext } from '@angular/core';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  // LanguageSitemapEntries,
  SitemapGeneratorService } from './sitemap-generator.service';

/**
 * Configuration for sitemap generation
 */
export interface SitemapGenerationConfig {
  /**
   * Base URL for the storefront
   */
  baseUrl: string;

  /**
   * OCC backend URL
   */
  occBaseUrl: string;

  /**
   * Output directory for sitemap files
   */
  outputDir: string;
}

/**
 * Result of sitemap generation
 */
export interface SitemapGenerationResult {
  /**
   * Generated sitemap filenames
   */
  files: string[];

  /**
   * Total URL count across all sitemaps
   */
  totalUrls: number;

  /**
   * URLs per language
   */
  urlsByLanguage: Record<string, number>;
}

/**
 * Generates sitemaps using Angular's Injector context.
 * This function should be called from within Angular's DI context (e.g., during SSR rendering).
 *
 * Uses SitemapGeneratorService which internally uses SemanticPathService
 * for correct URL generation matching the application's routing.
 *
 * @param injector - Angular Injector (from SSR context)
 * @param config - Sitemap generation configuration
 * @returns Promise with generation result
 *
 * @example
 * ```typescript
 * // In a server-side service or component
 * const injector = inject(Injector);
 * const result = await generateSitemapFromInjector(injector, {
 *   baseUrl: 'https://example.com',
 *   occBaseUrl: 'https://api.example.com',
 *   outputDir: './sitemaps',
 * });
 * ```
 */
export async function generateSitemapFromInjector(
  injector: Injector,
  config: SitemapGenerationConfig
): Promise<SitemapGenerationResult> {
  console.log('[Sitemap] Starting sitemap generation with Angular DI...');

  return runInInjectionContext(injector, async () => {
    const sitemapService = injector.get(SitemapGeneratorService);

    // Generate URLs for all languages
    const entriesByLanguage = await sitemapService.generateProductUrls(
      config.baseUrl,
      config.occBaseUrl
    );

    // Ensure output directory exists
    if (!existsSync(config.outputDir)) {
      mkdirSync(config.outputDir, { recursive: true });
    }

    // Write sitemap files
    const files: string[] = [];
    const urlsByLanguage: Record<string, number> = {};
    let totalUrls = 0;

    for (const langEntries of entriesByLanguage) {
      const filename = `sitemap-products-${langEntries.language}.xml`;
      const filepath = join(config.outputDir, filename);
      const xml = sitemapService.generateSitemapXml(langEntries.entries);

      writeFileSync(filepath, xml, 'utf-8');
      files.push(filename);
      urlsByLanguage[langEntries.language] = langEntries.entries.length;
      totalUrls += langEntries.entries.length;

      console.log(`[Sitemap] Created ${filename} with ${langEntries.entries.length} URLs`);
    }

    // Write sitemap index
    const indexXml = sitemapService.generateSitemapIndexXml(files, config.baseUrl);
    const indexPath = join(config.outputDir, 'sitemap.xml');
    writeFileSync(indexPath, indexXml, 'utf-8');

    console.log(`[Sitemap] Created sitemap.xml index with ${files.length} sitemap(s)`);
    console.log(`[Sitemap] Total URLs: ${totalUrls}`);

    return {
      files,
      totalUrls,
      urlsByLanguage,
    };
  });
}

/**
 * Holder for sitemap generation result.
 * Used to communicate results from SSR context to Express.
 */
export class SitemapGenerationHolder {
  protected static result: SitemapGenerationResult | null = null;
  protected static error: Error | null = null;
  protected static pending: Promise<SitemapGenerationResult> | null = null;

  static setResult(result: SitemapGenerationResult): void {
    this.result = result;
    this.error = null;
  }

  static setError(error: Error): void {
    this.error = error;
    this.result = null;
  }

  static getResult(): SitemapGenerationResult | null {
    return this.result;
  }

  static getError(): Error | null {
    return this.error;
  }

  static setPending(promise: Promise<SitemapGenerationResult>): void {
    this.pending = promise;
  }

  static getPending(): Promise<SitemapGenerationResult> | null {
    return this.pending;
  }

  static clear(): void {
    this.result = null;
    this.error = null;
    this.pending = null;
  }
}


