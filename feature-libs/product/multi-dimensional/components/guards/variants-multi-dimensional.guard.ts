/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import {
  Product,
  ProductScope,
  ProductService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

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
      .get(productCode, ProductScope.VARIANTS_MULTIDIMENSIONAL)
      .pipe(
        filter((p) => !!p),
        switchMap((product: Product) => {
          // current md example product is not purchasable
          if (!product.purchasable && product.variantMatrix?.length) {
            return of(
              this.router.createUrlTree(
                this.semanticPathService.transform({
                  cxRoute: 'product',
                  params: {
                    code: this.getCode(product),
                    name: product.name,
                  },
                })
              )
            );
          } else {
            return of(true);
          }
        })
      );
  }

  protected getCode(product: Product): string {
    return product.variantMatrix[0].variantOption?.code;
  }
}
