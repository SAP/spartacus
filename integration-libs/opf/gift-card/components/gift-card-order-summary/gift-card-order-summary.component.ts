/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, inject } from '@angular/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-opf-gift-card-order-summary',
  templateUrl: './gift-card-order-summary.component.html',
  standalone: false,
})
export class GiftCardOrderSummaryComponent {
  cart$: Observable<Cart>;
  protected activeCartFacade = inject(ActiveCartFacade);

  constructor() {
    this.cart$ = this.activeCartFacade.getActive();
  }
}
