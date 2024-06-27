/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import {
  isNotUndefined,
  Product,
  ProductScope,
  ProductService,
  SemanticPathService,
  VariantMatrixElement,
  VariantOption,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VariantsMultiDimensionalGuard {
  protected productService: ProductService = inject(ProductService);
  protected semanticPathService: SemanticPathService =
    inject(SemanticPathService);
  protected router: Router = inject(Router);

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const productCode = activatedRoute.params?.productCode;
    if (!productCode) {
      return of(true);
    }

    return this.productService
      .get(productCode, ProductScope.MULTIDIMENSIONAL)
      .pipe(
        filter(isNotUndefined),
        switchMap((product: Product) => {
          if (!product.purchasable && product.variantMatrix?.length) {
            const purchasableCode = this.findPurchasableProductCode(product);
            if (purchasableCode) {
              return this.productService
                .get(purchasableCode, ProductScope.LIST)
                .pipe(
                  filter(isNotUndefined),
                  take(1),
                  map((_product: Product) => {
                    return this.router.createUrlTree(
                      this.semanticPathService.transform({
                        cxRoute: 'product',
                        params: _product,
                      })
                    );
                  })
                );
            }
          }
          return of(true);
        })
      );
  }

  protected findPurchasableProductCode(product: Product): string | undefined {
    if (product.variantMatrix?.length) {
      const results: VariantOption[] = product.variantMatrix
        .map((variantMatrixElement: VariantMatrixElement) => {
          return variantMatrixElement.variantOption;
        })
        .filter(
          (variant: VariantOption) => variant.stock && variant.stock.stockLevel
        );
      return results.length ? results[0]?.code : undefined;
    }
    return undefined;
  }
}
