/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { OccEndpointsService, ProductNameNormalizer } from '@spartacus/core';
import {
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
  RouteParamsEnumeratorResult,
} from '../model/route-params-enumerator';

/**
 * Route parameter enumerator for product detail pages (PDP).
 *
 * Fetches products from OCC product search API and returns
 * parameter objects for SemanticPathService.
 *
 * ## Language dependency
 *
 * Product names may vary by language, so this enumerator is marked
 * as language-dependent. It will be called once per language.
 *
 * ## Customization
 *
 * Override `maxPageSize` to change pagination size:
 *
 * ```typescript
 * @Injectable()
 * export class MyProductEnumerator extends ProductRouteParamsEnumerator {
 *   protected override maxPageSize = 200;
 * }
 * ```
 */
@Injectable()
export class ProductRouteParamsEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'product';
  override readonly languageDependent = true;

  protected occEndpointsService = inject(OccEndpointsService);
  protected productNameNormalizer = inject(ProductNameNormalizer);

  /**
   * Maximum page size for OCC API pagination.
   */
  protected maxPageSize = 100;

  async enumerate(
    context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    const products = await this.fetchAllProducts(context);

    return {
      params: products.map((product) => {
        const normalized = this.productNameNormalizer.convert({
          code: product.code,
          name: product.name,
        });
        return {
          code: normalized.code,
          name: normalized.name,
          slug: normalized.slug,
        };
      }),
    };
  }

  /**
   * Fetches all products from OCC.
   */
  protected async fetchAllProducts(
    context: RouteParamsEnumeratorContext
  ): Promise<Array<{ code: string; name?: string }>> {
    const products: Array<{ code: string; name?: string }> = [];
    let currentPage = 0;
    let totalPages = 1;

    do {
      const searchUrl = this.buildSearchUrl(context.language, currentPage);

      try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
          console.error(
            `[Sitemap] ProductEnumerator: OCC error ${response.status} for ${searchUrl}`
          );
          break;
        }

        const data = await response.json();
        const pageProducts = data.products || [];

        for (const product of pageProducts) {
          if (product.code) {
            products.push({
              code: product.code,
              name: product.name,
            });
          }
        }

        totalPages = data.pagination?.totalPages ?? 1;
        currentPage++;
      } catch (error) {
        console.error(
          `[Sitemap] ProductEnumerator: Error fetching page ${currentPage}:`,
          error
        );
        break;
      }
    } while (currentPage < totalPages);

    console.log(
      `[Sitemap] ProductEnumerator: Found ${products.length} products for language '${context.language}'`
    );

    return products;
  }

  /**
   * Builds the OCC search URL using `OccEndpointsService.buildUrl()` with 'sitemap' scope.
   */
  protected buildSearchUrl(language: string, page: number): string {
    return this.occEndpointsService.buildUrl('productSearch', {
      queryParams: {
        pageSize: this.maxPageSize,
        currentPage: page,
        lang: language,
      },
      scope: 'sitemap',
    });
  }
}

