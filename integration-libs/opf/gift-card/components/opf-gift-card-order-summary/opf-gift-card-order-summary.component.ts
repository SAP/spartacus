/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  Input,
  inject
} from '@angular/core';
import { I18nModule, RoutingService, TranslatePipe } from '@spartacus/core';
import { Subscription, map } from 'rxjs';

import { AppliedCouponsComponent } from '@spartacus/cart/base/components';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { Order } from '@spartacus/order/root';
import { Router } from '@angular/router';
@Component({
  selector: 'cx-opf-gift-card-order-summary',
  templateUrl: './opf-gift-card-order-summary.component.html',
  imports: [
    CommonModule,
    NgIf,
    TranslatePipe,
    I18nModule,
    AppliedCouponsComponent,
  ],
})
export class OpfGiftCardOrderSummaryComponent {
  @Input() cart: Cart | Order;
  protected checkoutStepService = inject(CheckoutStepService);
  protected router = inject(Router);
  protected subscription = new Subscription();
  protected routingService = inject(RoutingService);

  isPaymentAndReviewStep$ = this.routingService
    .getRouterState()
    .pipe(
      map(
        ({ state }) =>
          !['checkoutDeliveryAddress', 'checkoutDeliveryMode'].includes(
            state?.semanticRoute ?? ''
          )
      )
    );

  get giftCardCartTotal() {
    return Math.abs(
      (this.cart?.totalPriceWithTax?.value ?? 0) -
        (this.cart?.sapGiftCardSummary?.totalAppliedAmount?.value ?? 0)
    );
  }
}
