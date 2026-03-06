import { ActiveCartFacade, Cart, CartOutlets } from '@spartacus/cart/base/root';
import { Component, OnInit, inject } from '@angular/core';

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OutletModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-gift-card-checkout-order-summary',
  templateUrl: './opf-gift-card-checkout-order-summary.component.html',
  imports: [CommonModule, I18nModule, OutletModule],
})
export class OpfGiftCardCheckoutOrderSummaryComponent implements OnInit {
  protected activeCartFacade = inject(ActiveCartFacade);

  cart$: Observable<Cart>;

  readonly cartOutlets = CartOutlets;

  ngOnInit() {
    this.cart$ = this.activeCartFacade.getActive();
    console.log('Cart in order summary component: ', this.cart$);
  }
}
