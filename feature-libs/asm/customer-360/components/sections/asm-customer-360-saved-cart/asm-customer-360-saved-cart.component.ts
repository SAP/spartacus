/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { concatMap, filter, map, take } from 'rxjs/operators';

import { ProductItem } from '../../asm-customer-360-product-listing/product-item.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import {
  AsmCustomer360SavedCart,
  CustomerCart,
} from '@spartacus/asm/customer-360/root';
import { Product, ProductScope, ProductService } from '@spartacus/core';

@Component({
  selector: 'cx-asm-customer-360-saved-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './asm-customer-360-saved-cart.component.html',
})
export class AsmCustomer360SavedCartComponent {
  savedCart$: Observable<CustomerCart | undefined>;
  productItems$: Observable<Array<ProductItem>>;

  constructor(
    protected sectionContext: AsmCustomer360SectionContext<AsmCustomer360SavedCart>,
    protected productService: ProductService
  ) {
    this.savedCart$ = this.sectionContext.data$.pipe(
      map((cart) => {
        return cart.savedCart;
      })
    );
    this.productItems$ = this.savedCart$.pipe(
      concatMap((cart) => {
        if (!cart?.entries?.length) {
          return of([]);
        } else {
          return forkJoin(
            cart.entries.map((entry) => {
              return this.productService
                .get(entry.productCode, ProductScope.DETAILS)
                .pipe(
                  filter((product): product is Product => Boolean(product)),
                  map((product) => {
                    return {
                      ...product,
                      quantity: entry.quantity,
                      basePrice: entry.basePrice,
                      totalPrice: entry.totalPrice,
                    } as ProductItem;
                  }),
                  take(1)
                );
            })
          );
        }
      })
    );
  }
}
