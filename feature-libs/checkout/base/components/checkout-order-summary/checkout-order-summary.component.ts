/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, Cart, CartOutlets } from '@spartacus/cart/base/root';
import { OutletDirective } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OutletDirective, AsyncPipe],
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  readonly cartOutlets = CartOutlets;

  constructor(protected activeCartFacade: ActiveCartFacade) {
    this.cart$ = this.activeCartFacade.getActive();
  }
}
