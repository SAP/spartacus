/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {
  isNotUndefined,
  Product,
  ProductScope,
  ProductService,
  SemanticPathService,
  VariantOption,
} from '@spartacus/core';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductMultiDimensionalGuard {
  protected productService: ProductService = inject(ProductService);
  protected semanticPathService: SemanticPathService =
    inject(SemanticPathService);
  protected router: Router = inject(Router);

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const productCode = activatedRoute.params?.productCode;
    if (!productCode) {
      return of(false);
    }

    return this.productService
      .get(productCode, ProductScope.MULTIDIMENSIONAL)
      .pipe(
        filter(isNotUndefined),
        switchMap((multiDimensionalProduct: Product) => {
          const isPurchasableAndHasVariantOptions = !multiDimensionalProduct.purchasable &&
            !!multiDimensionalProduct.variantOptions?.length;
          return isPurchasableAndHasVariantOptions ?
            this.findPValidProductCodeAndReturnUrlTree(
              multiDimensionalProduct
            )
            : of(true);
        })
      );
  }

  protected findPValidProductCodeAndReturnUrlTree(product: Product): Observable<boolean | UrlTree> {
    const variantOptions = product.variantOptions ?? [];
    const results: VariantOption | undefined = variantOptions.find(
      (variant: VariantOption) => variant.stock && variant.stock.stockLevel
    );
    const productCode = results ? results.code : variantOptions[0].code;
    return productCode ?
      this.productService
        .get(productCode, ProductScope.LIST)
        .pipe(
          filter(isNotUndefined),
          take(1),
          map((product: Product) => {
            return this.router.createUrlTree(
              this.semanticPathService.transform({
                cxRoute: 'product',
                params: product,
              })
            );
          })
        )
      :
      of(false);
  }
}
