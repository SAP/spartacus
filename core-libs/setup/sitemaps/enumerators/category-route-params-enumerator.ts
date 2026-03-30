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
 * Route parameter enumerator for category listing pages (PLP).
 *
 * Fetches category hierarchies from the OCC catalogs API (via shared
 * {@link CatalogsFetchService}) and returns parameter objects
 * for the `category` semantic route.
 *
 * The top-level "brands" category is excluded — it is handled
 * by {@link BrandRouteParamsEnumerator}.
 *
 * Categories with invalid URLs (e.g. `//c/configurations`) are also
 * filtered out. These typically represent configurable product
 * placeholders that should not appear in a sitemap.
 *
 * ## Language dependency
 *
 * Category names may vary by language. Although the `category` route
 * only uses `categoryCode` (the `id`), we mark this enumerator as
 * language-dependent so that the catalogs API is called with the
 * correct `lang` parameter and the fetched data stays consistent
 * with the current language context.
 *
 * ## Customization
 *
 * Override `brandCategoryId` to change which top-level category
 * is treated as brands:
 *
 * ```typescript
 * @Injectable()
 * export class MyCategoryEnumerator extends CategoryRouteParamsEnumerator {
 *   protected override brandCategoryId = 'my-brands';
 * }
 * ```
 */
@Injectable()
export class CategoryRouteParamsEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'category';
  override readonly languageDependent = true;

  protected catalogsFetchService = inject(CatalogsFetchService);

  /**
   * The top-level category ID that contains brand categories.
   * Categories under this ID are excluded from the category enumerator.
   */
  protected brandCategoryId = 'brands';

  async enumerate(
    context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    const catalogs = await this.catalogsFetchService.getCatalogs(
      context.language
    );
    const categories = this.collectCategories(catalogs);

    console.log(
      `[Sitemap] CategoryEnumerator: Found ${categories.length} categories for language '${context.language}'`
    );

    return {
      params: categories.map((category) => ({
        code: category.id,
      })),
    };
  }

  /**
   * Collects all non-brand categories from catalogs, filtering to Online version only.
   * Filters out categories with empty or slash-only URLs (e.g. configurations categories).
   */
  protected collectCategories(
    catalogs: Occ.Catalog[]
  ): Array<{ id: string; name?: string }> {
    const results: Array<{ id: string; name?: string }> = [];

    for (const catalog of catalogs) {
      const onlineVersion = catalog.catalogVersions?.find(
        (v) => v.id === 'Online'
      );

      if (!onlineVersion?.categories) {
        continue;
      }

      for (const topCategory of onlineVersion.categories) {
        // Skip the brands top-level category — handled by BrandRouteParamsEnumerator
        if (topCategory.id === this.brandCategoryId) {
          continue;
        }
        this.collectCategoryTree(topCategory, results);
      }
    }

    return results;
  }

  /**
   * Recursively collects categories from a category tree.
   * Filters out categories with invalid URLs (empty, or consisting only of slashes).
   */
  protected collectCategoryTree(
    category: Occ.CategoryHierarchy,
    results: Array<{ id: string; name?: string }>
  ): void {
    if (category.id && this.isValidCategoryUrl(category.url)) {
      results.push({ id: category.id, name: category.name });
    }

    if (category.subcategories) {
      for (const sub of category.subcategories) {
        this.collectCategoryTree(sub, results);
      }
    }
  }

  /**
   * Checks whether a category URL is valid (not empty and not consisting of only slashes).
   * Categories with URLs like `//c/configurations` or `///c/engraving` are considered invalid.
   */
  protected isValidCategoryUrl(url?: string): boolean {
    if (!url) {
      return false;
    }
    // A valid category URL should start with a single slash followed by a non-slash character
    return /^\/[^/]/.test(url);
  }
}
