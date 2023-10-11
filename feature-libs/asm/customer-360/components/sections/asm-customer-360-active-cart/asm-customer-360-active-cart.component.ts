/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, filter, map, take } from 'rxjs/operators';
import { ProductItem } from '../../asm-customer-360-product-listing/product-item.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import {
  AsmCustomer360ActiveCart,
  CustomerCart,
} from '@spartacus/asm/customer-360/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-active-cart',
  templateUrl: './asm-customer-360-active-cart.component.html',
})
export class AsmCustomer360ActiveCartComponent {
  productItems$: Observable<Array<ProductItem>>;
  activeCart$: Observable<CustomerCart | undefined>;

  constructor(
    public sectionContext: AsmCustomer360SectionContext<AsmCustomer360ActiveCart>,
    protected productService: ProductService
  ) {
    this.activeCart$ = this.sectionContext.data$.pipe(
      map((activeCart) => {
        return activeCart.cart;
      })
    );
    this.productItems$ = this.activeCart$.pipe(
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
