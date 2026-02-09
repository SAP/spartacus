import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { CommonModule, NgIf } from '@angular/common';
/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit, inject } from '@angular/core';

import { GiftCardService } from '../../core/services';
import { Observable } from 'rxjs';
import { OutletModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-gift-card-order-summary',
  templateUrl: './gift-card-order-summary.component.html',
  imports: [CommonModule, OutletModule, NgIf],
})
export class GiftCardOrderSummaryComponent implements OnInit {
  cart$: Observable<Cart>;
  protected activeCartFacade = inject(ActiveCartFacade);
  protected giftCardService = inject(GiftCardService);
  protected isGiftCardEnabled$: Observable<boolean>;

  ngOnInit() {
    this.isGiftCardEnabled$ = this.giftCardService.isGiftCardEnabled();
    this.cart$ = this.activeCartFacade.getActive();
  }
}
