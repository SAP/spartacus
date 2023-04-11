/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductScope, ProductService } from '@spartacus/core';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, filter, map, take, tap } from 'rxjs/operators';
import { ProductItem } from '../../asm-customer-product-listing/product-item.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { Customer360ActiveCart } from '@spartacus/asm/customer-360/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-active-cart',
  templateUrl: './asm-customer-active-cart.component.html',
})
export class AsmCustomerActiveCartComponent {
  productItems$: Observable<Array<ProductItem>>;
  activeCart: Customer360ActiveCart;

  constructor(
    public sectionContext: Customer360SectionContext<Customer360ActiveCart>,
    protected productService: ProductService
  ) {
    this.productItems$ = this.sectionContext.data$.pipe(
      tap((cart) => {
        this.activeCart = cart;
      }),
      concatMap((cart) => {
        if (!cart?.entries?.length) {
          return of([]);
        } else {
          return forkJoin(
            cart.entries.map((entry) => {
              return this.productService
                .get(entry.productCode, ProductScope.DETAILS)
                .pipe(
                  filter((product) => Boolean(product)),
                  map((product) => {
                    return {
                      ...product,
                      quantity: entry.quantity,
                      basePrice: entry.basePrice,
                      totalPrice: entry.totalPrice,
                    };
                  }),
                  take(1)
                );
            })
          ) as Observable<Array<ProductItem>>;
        }
      })
    );
  }
}
