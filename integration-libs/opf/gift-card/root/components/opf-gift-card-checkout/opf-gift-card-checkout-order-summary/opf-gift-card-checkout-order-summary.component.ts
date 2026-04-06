/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveCartFacade, Cart, CartOutlets } from '@spartacus/cart/base/root';
import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OpfGiftCardOrderSummaryComponent } from '../../opf-gift-card-order-summary';

@Component({
  selector: 'cx-opf-gift-card-checkout-order-summary',
  templateUrl: './opf-gift-card-checkout-order-summary.component.html',
  imports: [CommonModule, I18nModule, OpfGiftCardOrderSummaryComponent],
})
export class OpfGiftCardCheckoutOrderSummaryComponent implements OnInit {
  protected activeCartFacade = inject(ActiveCartFacade);

  cart$: Observable<Cart>;

  readonly cartOutlets = CartOutlets;

  ngOnInit() {
    this.cart$ = this.activeCartFacade.getActive();
  }
}
