/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfGiftCardApplyComponent, OpfGiftCardApplyModule } from './opf-gift-card-apply';
import {
  OpfGiftCardOrderDetailBillingComponent,
  OpfGiftCardOrderDetailsModule,
  OpfGiftCardPaymentMethodDetailComponent,
} from './opf-gift-card-order-details';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';

import { CartOutlets } from '@spartacus/cart/base/root';
import { NgModule } from '@angular/core';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';
import { OpfGiftCardAppliedModule } from './opf-gift-card-applied';
import { OpfGiftCardCheckoutModule } from './opf-gift-card-checkout';
import { OpfGiftCardOrderConfirmationModule } from './opf-gift-card-order-confirmation';
import {
  OpfGiftCardOrderSummaryModule
} from './opf-gift-card-order-summary';

@NgModule({
  imports: [
    OpfGiftCardAppliedModule,
    OpfGiftCardApplyModule,
    OpfGiftCardOrderSummaryModule,
    OpfGiftCardOrderConfirmationModule,
    OpfGiftCardOrderDetailsModule,
    OpfGiftCardCheckoutModule,

  ],
  providers: [
    provideOutlet({
      // id: OpfCheckoutOutlets.GIFT_CARD,
      id: OpfCheckoutOutlets.OPF_CHECKOUT_BEFORE_PAYMENT_OPTIONS,
      position: OutletPosition.BEFORE,
      component: OpfGiftCardApplyComponent,
    }),
    // provideOutlet({
    //   id: CartOutlets.ORDER_SUMMARY_GIFT_CARD,
    //   component: OpfGiftCardOrderSummaryComponent,
    // }),
    provideOutlet({
      id: CartOutlets.ORDER_DETAILS_PAYMENT_METHOD_DETAILS,
      component: OpfGiftCardOrderDetailBillingComponent,
    }),
    provideOutlet({
      id: OpfCheckoutOutlets.ORDER_DETAILS_AFTER_PAYMENT_METHOD,
      component: OpfGiftCardPaymentMethodDetailComponent,
    }),
  ],
  exports: [
    OpfGiftCardAppliedModule,
    OpfGiftCardApplyModule,
    OpfGiftCardOrderSummaryModule,
    OpfGiftCardOrderConfirmationModule,
    OpfGiftCardOrderDetailsModule,
    OpfGiftCardCheckoutModule,
  ]
})
export class OpfGiftCardComponentsModule {}
