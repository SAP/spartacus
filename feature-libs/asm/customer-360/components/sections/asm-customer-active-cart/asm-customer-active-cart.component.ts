/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductItem } from '../../asm-customer-product-listing/product-item.model';

import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-active-cart',
  templateUrl: './asm-customer-active-cart.component.html',
})
export class AsmCustomerActiveCartComponent {
  activeCart$: Observable<Cart>;
  productItems$: Observable<Array<ProductItem>>;

  constructor(public sectionContext: Customer360SectionContext<void>) {
    this.activeCart$ = this.sectionContext.activeCart$;

    this.productItems$ = this.activeCart$.pipe(
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
}
