/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';
import {
  BaseSiteService,
  CurrencyService,
  LanguageService,
  OccConfig,
  SiteContextParamsService,
} from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  SITEMAP_URL_PROVIDERS,
  SitemapUrlProvider,
} from '../model/sitemap-url-provider';
import { SitemapGenerationContext } from '../model/sitemap.model';
import {
  markSitemapError,
  markSitemapGenerating,
  SITEMAP_SHARED_STATE,
  updateSitemapState,
} from './sitemap-shared-state';

/**
 * Optional overrides for sitemap generation.
 *
 * By default, baseUrl and occBaseUrl are resolved from OccConfig.
 * Use this token only when you need to override them
 * (e.g., different public URL vs. internal OCC URL).
 */
export interface SitemapSsrConfig {
  /**
   * Override storefront base URL.
   * If not set, derived from the request or falls back to 'http://localhost:4000'.
   */
  baseUrl?: string;

  /**
   * Override OCC backend URL.
   * If not set, uses `OccConfig.backend.occ.baseUrl`.
   */
  occBaseUrl?: string;
}

/**
 * Injection token for optional sitemap SSR configuration overrides.
 */
export const SITEMAP_SSR_CONFIG = new InjectionToken<SitemapSsrConfig>(
  'SITEMAP_SSR_CONFIG',
  {
    factory: () => ({}),
  }
);

/**
 * Main sitemap generator service. Orchestrates URL providers during SSR bootstrap.
 *
 * This service:
 * 1. Resolves site context (baseSite, languages, currencies) from Angular DI
 * 2. Delegates URL generation to registered `SitemapUrlProvider` instances
 * 3. Stores generated XML sitemaps in shared state for Express to serve
 *
 * ## Extensibility
 *
 * Register custom URL providers via `SITEMAP_URL_PROVIDERS`:
 *
 * ```typescript
 * providers: [
 *   provideSitemapGenerator(),
 *   { provide: SITEMAP_URL_PROVIDERS, useClass: CategorySitemapProvider, multi: true },
 * ]
 * ```
 *
 * ## Configuration
 *
 * By default, reads `backend.occ.baseUrl` from `OccConfig` (no duplication).
 * Optional overrides via `provideSitemapGenerator({ baseUrl: '...' })`.
 */
@Injectable()
export class SitemapConfigExtractorService {
  private platformId = inject(PLATFORM_ID);
  private baseSiteService = inject(BaseSiteService);
  private languageService = inject(LanguageService);
  private currencyService = inject(CurrencyService);
  private siteContextParamsService = inject(SiteContextParamsService);
  private occConfig = inject(OccConfig);
  private config = inject(SITEMAP_SSR_CONFIG);

  private providers: SitemapUrlProvider[] =
    inject(SITEMAP_URL_PROVIDERS, { optional: true }) ?? [];

  /**
   * Main entry point — orchestrates all registered URL providers.
   * Called from APP_INITIALIZER during SSR bootstrap.
   */
  async generateSitemaps(): Promise<void> {
    if (!isPlatformServer(this.platformId)) {
      return;
    }

    // Skip if already generated or in progress
    if (SITEMAP_SHARED_STATE.isReady || SITEMAP_SHARED_STATE.isGenerating) {
      console.log(
        '[Sitemap] Sitemaps already generated or in progress. Skipping.'
      );
      return;
    }

    markSitemapGenerating();
    console.log('[Sitemap] Starting generation in Angular SSR context...');

    try {
      const context = await this.buildContext();

      console.log(`[Sitemap] Context resolved:`);
      console.log(`  Base site: ${context.baseSiteId}`);
      console.log(`  Base URL: ${context.baseUrl}`);
      console.log(`  OCC URL: ${context.occBaseUrl}`);
      console.log(`  Languages: ${context.languages.join(', ')}`);
      console.log(`  Currencies: ${context.currencies.join(', ')}`);
      console.log(`  Default currency: ${context.defaultCurrency}`);
      console.log(
        `  URL encoding params: ${context.urlEncodingParams.join(', ')}`
      );
      console.log(`  Providers: ${this.providers.map((p) => p.name).join(', ')}`);

      const allSitemaps: Record<string, string> = {};
      const allFiles: string[] = [];
      let totalUrls = 0;
      const urlsByLanguage: Record<string, number> = {};

      // Run each provider
      for (const provider of this.providers) {
        console.log(`[Sitemap] Running provider '${provider.name}'...`);

        const result = await provider.getUrls(context);

        // Merge results
        Object.assign(allSitemaps, result.sitemaps);
        allFiles.push(...result.files);
        totalUrls += result.totalUrls;
        for (const [lang, count] of Object.entries(result.urlsByLanguage)) {
          urlsByLanguage[lang] = (urlsByLanguage[lang] || 0) + count;
        }
      }

      // Generate sitemap index
      const indexXml = this.buildSitemapIndexXml(allFiles, context.baseUrl);
      allSitemaps['sitemap.xml'] = indexXml;

      // Store in shared state for Express
      updateSitemapState(allSitemaps, allFiles, totalUrls, urlsByLanguage);

      console.log(
        `[Sitemap] Generation complete! ${allFiles.length} file(s), ${totalUrls} total URLs`
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[Sitemap] Generation failed:`, error);
      markSitemapError(msg);
    }
  }

  /**
   * Builds the generation context from Angular DI services.
   */
  private async buildContext(): Promise<SitemapGenerationContext> {
    const baseSiteId = await this.getBaseSiteId();
    const languages = await this.getActiveLanguages();
    const currencies = await this.getActiveCurrencies();
    const defaultCurrency = await this.getDefaultCurrency();
    const urlEncodingParams =
      this.siteContextParamsService.getUrlEncodingParameters();

    // Resolve baseUrl: override > fallback
    const baseUrl =
      this.config.baseUrl || 'http://localhost:4000';

    // Resolve occBaseUrl: override > OccConfig > fallback
    const occBaseUrl =
      this.config.occBaseUrl ||
      this.occConfig.backend?.occ?.baseUrl ||
      '';

    return {
      baseSiteId,
      baseUrl,
      occBaseUrl,
      languages,
      currencies,
      defaultCurrency,
      urlEncodingParams,
    };
  }

  private buildSitemapIndexXml(
    sitemapFiles: string[],
    baseUrl: string
  ): string {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = sitemapFiles
      .map(
        (file) =>
          `  <sitemap>
    <loc>${this.escapeXml(baseUrl)}/sitemaps/${file}</loc>
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

  // ---- Site context helpers ----

  private async getBaseSiteId(): Promise<string> {
    return (
      (await firstValueFrom(
        this.baseSiteService.getActive().pipe(take(1))
      )) || ''
    );
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
        map(
          (baseSite) =>
            baseSite?.stores?.[0]?.defaultCurrency?.isocode ?? 'USD'
        )
      )
    );
  }
}
