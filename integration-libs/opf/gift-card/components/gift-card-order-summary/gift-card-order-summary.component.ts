/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit, Optional, inject } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { OutletContextData, OutletModule } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { GiftCardService } from '../../core/services';
import { environment } from 'projects/storefrontapp/src/environments/environment';

@Component({
  selector: 'cx-opf-gift-card-order-summary',
  templateUrl: './gift-card-order-summary.component.html',
  imports: [CommonModule, OutletModule, NgIf, TranslatePipe],
})
export class GiftCardOrderSummaryComponent implements OnInit {
  @Input()
  cart: Cart;
  environment = environment;
  protected activeCartFacade = inject(ActiveCartFacade);
  protected giftCardService = inject(GiftCardService);
  protected isGiftCardEnabled$: Observable<boolean>;
  constructor(@Optional() protected outlet?: OutletContextData<any>) {}
  ngOnInit() {
    if (this.outlet?.context$) {
      this.outlet.context$.subscribe((context) => {
        this.cart = context;
      });
    }
  }
}
