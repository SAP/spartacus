/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, filter, map, take } from 'rxjs/operators';
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
  activeCart$: Observable<Customer360ActiveCart>;

  constructor(
    public sectionContext: Customer360SectionContext<Customer360ActiveCart>,
    protected productService: ProductService
  ) {
    this.activeCart$ = this.sectionContext.data$;
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
