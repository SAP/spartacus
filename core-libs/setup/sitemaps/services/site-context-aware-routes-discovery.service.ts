/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { RouteParamsEnumeratorContext } from '../model/route-params-enumerator';
import {
  RoutesDiscoveryOptions,
  SiteContextAwareDiscoveryResult,
  SiteContextAwareUrl,
  SitemapGenerationContext,
} from '../model/sitemap.model';
import { RoutesDiscoveryService } from './routes-discovery.service';

/**
 * Service that wraps RoutesDiscoveryService with site context awareness.
 *
 * This service:
 * 1. Iterates over language/currency combinations based on urlEncodingParams
 * 2. Calls RoutesDiscoveryService once per language (data may differ by language)
 * 3. Duplicates results per currency when currency is in URL (prefix differs, data is same)
 * 4. Prepends URL prefix (baseSite/language/currency) to each discovered path
 *
 * ## Why currency doesn't trigger re-enumeration
 *
 * OCC product/category data is currency-independent.
 * Currency only affects the URL prefix (`/en/USD/product/123` vs `/en/EUR/product/123`).
 * So we enumerate once per language and replicate paths for each currency.
 */
@Injectable()
export class SiteContextAwareRoutesDiscoveryService {
  protected routesDiscoveryService = inject(RoutesDiscoveryService);

  /**
   * Discovers all URLs across all site context combinations.
   */
  async discoverUrls(
    context: SitemapGenerationContext,
    options: RoutesDiscoveryOptions = {}
  ): Promise<SiteContextAwareDiscoveryResult> {
    const urlsByLanguageCurrency = new Map<string, SiteContextAwareUrl[]>();
    let totalUrls = 0;

    const hasCurrencyInUrl = context.urlEncodingParams.includes('currency');
    const hasLanguageInUrl = context.urlEncodingParams.includes('language');

    const languagesToIterate = hasLanguageInUrl
      ? context.languages
      : [context.languages[0] || 'en'];

    const currenciesToIterate = hasCurrencyInUrl
      ? context.currencies
      : [context.defaultCurrency];

    console.log(
      `[Sitemap] SiteContextAwareDiscovery: Iterating ${languagesToIterate.length} language(s), ${currenciesToIterate.length} currency(ies)`
    );

    for (const language of languagesToIterate) {
      // Discover routes ONCE per language (OCC data is currency-independent)
      const enumeratorContext: RouteParamsEnumeratorContext = {
        baseSiteId: context.baseSiteId,
        language,
        currency: context.defaultCurrency,
        occBaseUrl: context.occBaseUrl,
      };

      const discoveredRoutes =
        await this.routesDiscoveryService.discoverRoutes(
          enumeratorContext,
          options
        );

      console.log(
        `[Sitemap] SiteContextAwareDiscovery: Discovered ${discoveredRoutes.length} routes for language '${language}'`
      );

      // Duplicate discovered paths for each currency (only prefix differs)
      for (const currency of currenciesToIterate) {
        const key = hasCurrencyInUrl
          ? `${language}-${currency}`
          : language;

        const urlPrefix = this.buildUrlPrefix(context, language, currency);

        const urls: SiteContextAwareUrl[] = discoveredRoutes.map((route) => ({
          cxRoute: route.cxRoute,
          params: route.params,
          fullPath: route.path
            ? `${urlPrefix}/${route.path}`
            : `${urlPrefix}/`,
          language,
          currency,
        }));

        urlsByLanguageCurrency.set(key, urls);
        totalUrls += urls.length;
      }
    }

    console.log(
      `[Sitemap] SiteContextAwareDiscovery: Total ${totalUrls} URLs`
    );

    return { urlsByLanguageCurrency, totalUrls };
  }

  /**
   * Builds URL prefix based on urlEncodingParams.
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
}

