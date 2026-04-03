/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Occ, OccEndpointsService } from '@spartacus/core';

/**
 * Service for fetching OCC catalogs data with in-memory caching.
 *
 * Both `CategoryRouteParamsEnumerator` and `BrandRouteParamsEnumerator`
 * need the same catalogs data. This service ensures the OCC `/catalogs`
 * endpoint is called only **once per language** during sitemap generation,
 * avoiding duplicate network requests.
 *
 * The cache lives for the lifetime of the injector (i.e., one SSR request).
 *
 * ## Customization
 *
 * Override `fetchCatalogs()` to change how catalogs are fetched,
 * or `buildCatalogsUrl()` to adjust the URL.
 */
@Injectable()
export class CatalogsFetchService {
  protected occEndpointsService = inject(OccEndpointsService);

  /** In-memory cache: language → catalogs promise */
  protected cache = new Map<string, Promise<Occ.Catalog[]>>();

  /**
   * Returns catalogs for the given language.
   * Uses cached result if the same language was already requested.
   */
  getCatalogs(language: string): Promise<Occ.Catalog[]> {
    const cached = this.cache.get(language);
    if (cached) {
      return cached;
    }

    const promise = this.fetchCatalogs(language);
    this.cache.set(language, promise);
    return promise;
  }

  /**
   * Fetches catalogs from the OCC API.
   */
  protected async fetchCatalogs(language: string): Promise<Occ.Catalog[]> {
    const url = this.buildCatalogsUrl(language);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(
          `[Sitemap] CatalogsFetchService: OCC error ${response.status} for ${url}`
        );
        return [];
      }

      const data = await response.json();
      return data.catalogs ?? [];
    } catch (error) {
      console.error(
        '[Sitemap] CatalogsFetchService: Error fetching catalogs:',
        error
      );
      return [];
    }
  }

  /**
   * Builds the OCC catalogs URL using `OccEndpointsService.buildUrl()` with 'sitemap' scope.
   */
  protected buildCatalogsUrl(language: string): string {
    return this.occEndpointsService.buildUrl('catalogs', {
      queryParams: {
        lang: language,
      },
      scope: 'sitemap',
    });
  }
}

