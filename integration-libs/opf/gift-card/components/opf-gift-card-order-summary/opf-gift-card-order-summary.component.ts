/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppliedCouponsComponent } from '@spartacus/cart/base/components';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { I18nModule, RoutingService, TranslatePipe } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { map, Subscription } from 'rxjs';
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
export class OpfGiftCardOrderSummaryComponent implements OnInit, OnDestroy {
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

  constructor(@Optional() protected outlet?: OutletContextData<any>) {}

  ngOnInit(): void {
    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          this.cart = context;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get giftCardCartTotal() {
    return Math.abs(
      (this.cart?.totalPriceWithTax?.value ?? 0) -
        (this.cart?.sapGiftCardSummary?.totalAppliedAmount?.value ?? 0)
    );
  }
}
