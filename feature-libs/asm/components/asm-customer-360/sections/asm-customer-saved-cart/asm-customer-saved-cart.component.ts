/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ProductItem } from '../../asm-customer-ui-components/asm-customer-product-listing/product-item.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  selector: 'cx-asm-customer-saved-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './asm-customer-saved-cart.component.html',
})
export class AsmCustomerSavedCartComponent {
  savedCart$: Observable<Cart | undefined>;
  productItems$: Observable<Array<ProductItem>>;

  constructor(protected sectionContext: Customer360SectionContext<void>) {
    this.savedCart$ = this.sectionContext.savedCarts$.pipe(
      map((carts) => carts?.[0])
    );

    this.productItems$ = this.savedCart$.pipe(
      map((cart) => {
        return (
          cart?.entries?.map((entry) => {
            return {
              ...(entry.product ?? {}),
              quantity: entry.quantity,
              price: entry.basePrice,
            };
          }) ?? []
        );
      })
    );
  }

  navigateToSavedCartDetails(): void {
    this.savedCart$.pipe(take(1)).subscribe((savedCart) => {
      this.sectionContext.navigate$.next({
        cxRoute: 'savedCartsDetails',
        params: { savedCartId: savedCart?.code },
      });
    });
  }
}
