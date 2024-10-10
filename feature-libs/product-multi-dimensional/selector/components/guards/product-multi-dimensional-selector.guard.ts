/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, Router } from '@angular/router';
import {
  isNotUndefined,
  Product,
  ProductScope,
  ProductService,
  SemanticPathService,
  VariantOption,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

/**
 * Guard that ensures a product is valid and navigable within a multi-dimensional context.
 *
 * This guard manages navigation and access control for products in a multi-dimensional product catalog.
 * It verifies that the product specified in the route is valid and has the necessary attributes for display.
 * If the product is not purchasable and has variant options, the guard attempts to find a valid product code
 * from the available variants and redirects to the appropriate variant product URL.
 *
 * Without this guard, users could access a product detail page (PDP) for products that are not available for purchase.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductMultiDimensionalSelectorGuard {
  protected productService: ProductService = inject(ProductService);
  protected semanticPathService: SemanticPathService =
    inject(SemanticPathService);
  protected router: Router = inject(Router);

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<GuardResult> {
    const productCode = activatedRoute.params?.productCode;
    if (!productCode) {
      return of(false);
    }

    return this.productService
      .get(productCode, ProductScope.MULTI_DIMENSIONAL_AVAILABILITY)
      .pipe(
        filter(isNotUndefined),
        switchMap((multiDimensionalProduct: Product) => {
          const isNotPurchasableAndHasVariantOptions =
            !multiDimensionalProduct.purchasable &&
            !!multiDimensionalProduct.variantOptions?.length;

          return isNotPurchasableAndHasVariantOptions
            ? this.findValidProductCodeAndReturnUrlTree(multiDimensionalProduct)
            : of(!!multiDimensionalProduct.purchasable);
        })
      );
  }

  /**
   * Finds a valid product code from variant options and returns a URL tree for redirection.
   *
   * @param {Product} product - The product with variant options.
   * @returns {Observable<GuardResult>} - An observable that resolves to a `UrlTree` for
   * redirection if a valid product code is found, or `false` if no valid code is available.
   *
   * @description
   * This method examines the product's variant options to find one with available stock. If a valid
   * variant is found, it fetches the corresponding product and generates a URL for redirection. If
   * no valid variant code is found, it resolves to `false`.
   */
  protected findValidProductCodeAndReturnUrlTree(
    product: Product
  ): Observable<GuardResult> {
    const validVariantCode = this.getValidVariantCode(product);
    const fallbackProductCode = this.getFallbackProductCode(product);

    const productCode = validVariantCode ?? fallbackProductCode;

    if (productCode) {
      return this.productService.get(productCode, ProductScope.LIST).pipe(
        filter(isNotUndefined),
        take(1),
        map((multiDimensionalProduct: Product) =>
          this.router.createUrlTree(
            this.semanticPathService.transform({
              cxRoute: 'product',
              params: multiDimensionalProduct,
            })
          )
        )
      );
    }
    return of(false);
  }

  protected getValidVariantCode(product: Product): string | undefined {
    return product.variantOptions?.find(
      (variant: VariantOption) => variant.stock && variant.stock.stockLevel
    )?.code;
  }

  protected getFallbackProductCode(product: Product): string | undefined {
    return product.variantOptions?.length
      ? product.variantOptions[0]?.code
      : '';
  }
}
