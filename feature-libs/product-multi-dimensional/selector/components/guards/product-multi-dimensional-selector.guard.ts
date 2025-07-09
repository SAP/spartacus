/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, Router } from '@angular/router';
import {
  FeatureToggles,
  isNotUndefined,
  Product,
  ProductAvailabilityAdapter,
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
 * NOTE: While removing the featuretoggle check, do not remove the sapUnit check.
 * The sapUnit is required for productAvailabilities API calls and must be present.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductMultiDimensionalSelectorGuard {
  protected productService = inject(ProductService);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);
  protected featureToggle = inject(FeatureToggles);
  protected availabilityAdapter = inject(ProductAvailabilityAdapter);

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<GuardResult> {
    const productCode = activatedRoute.params?.productCode;

    if (!productCode) {
      // Refuse entry unless it is within a SmartEdit environment
      return of(!!activatedRoute.queryParams?.cmsTicketId);
    }

    const scope = this.featureToggle.showRealTimeStockInPDP
      ? [
          ProductScope.MULTI_DIMENSIONAL_REALTIME_AVAILABILITY,
          ProductScope.UNIT,
        ]
      : ProductScope.MULTI_DIMENSIONAL_AVAILABILITY;

    return this.productService.get(productCode, scope).pipe(
      filter(isNotUndefined),
      switchMap((multiDimensionalProduct: Product) => {
        const isNotPurchasableAndHasVariantOptions =
          !multiDimensionalProduct.purchasable &&
          !!multiDimensionalProduct.variantOptions?.length;
        const useRealTimeStock =
          this.featureToggle.showRealTimeStockInPDP &&
          multiDimensionalProduct.sapUnit?.sapCode;

        return isNotPurchasableAndHasVariantOptions
          ? this.findValidProductCodeAndReturnUrlTree(
              multiDimensionalProduct,
              useRealTimeStock
            )
          : of(!!multiDimensionalProduct.purchasable);
      })
    );
  }

  /**
   * Determines the appropriate variant to redirect to, based on availability.
   */
  protected findValidProductCodeAndReturnUrlTree(
    product: Product,
    useRealTimeStock: string | boolean | undefined
  ): Observable<GuardResult> {
    const fallbackCode = this.getFallbackProductCode(product);

    const variantCode$ = useRealTimeStock
      ? this.getValidVariantCodeAsync(product)
      : of(this.getValidVariantCode(product));

    return variantCode$.pipe(
      switchMap((validVariantCode) => {
        const productCode = validVariantCode ?? fallbackCode;

        if (!productCode) {
          return of(false);
        }

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
      })
    );
  }

  /**
   * Uses  productAvailabilities API to find the first in-stock variant code.
   */
  protected getValidVariantCodeAsync(
    product: Product
  ): Observable<string | undefined> {
    const variantCodes =
      product.variantOptions
        ?.map((variant) => variant.code)
        .filter((code): code is string => !!code) ?? [];

    const unitCode = product.sapUnit?.sapCode;
    if (!variantCodes.length || !unitCode) {
      return of(undefined);
    }

    const productUnitPairs = variantCodes.map((code) => ({
      productCode: code,
      unitCode,
    }));

    return this.availabilityAdapter.loadRealTimeStock(productUnitPairs).pipe(
      take(1),
      map((availability) => {
        const inStockVariant = availability.availabilityItems.find((item) => {
          const unitAvailability = item.unitAvailabilities?.[0];
          return unitAvailability?.quantity;
        });

        return inStockVariant?.productCode;
      })
    );
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
