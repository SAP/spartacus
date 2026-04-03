/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Occ } from '@spartacus/core';
import {
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
  RouteParamsEnumeratorResult,
} from '../model/route-params-enumerator';
import { CatalogsFetchService } from '../services/catalogs-fetch.service';

/**
 * Route parameter enumerator for brand pages.
 *
 * Fetches brand categories from the OCC catalogs API (via shared
 * {@link CatalogsFetchService}) and returns parameter objects
 * for the `brand` semantic route.
 *
 * The brand route pattern is: `Brands/:brandName/c/:brandCode`
 *
 * Brands are identified as subcategories of the top-level category
 * with `id === 'brands'` in the Online catalog version.
 *
 * ## Language dependency
 *
 * Brand names may vary by language, so this enumerator is marked
 * as language-dependent. It will be called once per language.
 *
 * ## Shared data source
 *
 * This enumerator shares the same OCC catalogs data with
 * {@link CategoryRouteParamsEnumerator} via {@link CatalogsFetchService}.
 * The service caches the response per language, so the `/catalogs`
 * endpoint is called at most once per language even when both
 * enumerators are active.
 *
 * ## Customization
 *
 * Override `brandCategoryId` to change which top-level category holds brands:
 *
 * ```typescript
 * @Injectable()
 * export class MyBrandEnumerator extends BrandRouteParamsEnumerator {
 *   protected override brandCategoryId = 'my-brands';
 * }
 * ```
 */
@Injectable()
export class BrandRouteParamsEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'brand';
  override readonly languageDependent = true;

  protected catalogsFetchService = inject(CatalogsFetchService);

  /**
   * The top-level category ID that contains brand categories.
   */
  protected brandCategoryId = 'brands';

  async enumerate(
    context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    const catalogs = await this.catalogsFetchService.getCatalogs(
      context.language
    );
    const brands = this.collectBrands(catalogs);

    console.log(
      `[Sitemap] BrandEnumerator: Found ${brands.length} brands for language '${context.language}'`
    );

    return {
      params: brands.map((brand) => ({
        brandName: brand.name,
        brandCode: brand.id,
      })),
    };
  }

  /**
   * Collects brand categories from catalogs.
   * Brands are subcategories of the top-level category with id matching `brandCategoryId`.
   */
  protected collectBrands(
    catalogs: Occ.Catalog[]
  ): Array<{ id: string; name: string }> {
    const results: Array<{ id: string; name: string }> = [];

    for (const catalog of catalogs) {
      const onlineVersion = catalog.catalogVersions?.find(
        (v) => v.id === 'Online'
      );

      if (!onlineVersion?.categories) {
        continue;
      }

      const brandsCategory = onlineVersion.categories.find(
        (c) => c.id === this.brandCategoryId
      );

      if (!brandsCategory?.subcategories) {
        continue;
      }

      for (const brand of brandsCategory.subcategories) {
        if (brand.id && brand.name) {
          results.push({ id: brand.id, name: brand.name });
        }
      }
    }

    return results;
  }
}
