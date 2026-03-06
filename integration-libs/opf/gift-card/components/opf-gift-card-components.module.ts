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
import {
  OpfGiftCardOrderSummaryComponent,
  OpfGiftCardOrderSummaryModule,
} from './opf-gift-card-order-summary';

import { CartOutlets } from '@spartacus/cart/base/root';
import { NgModule } from '@angular/core';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';
import { OpfGiftCardAppliedModule } from './opf-gift-card-applied';
import { OpfGiftCardCheckoutModule } from './opf-gift-card-checkout';
import { OpfGiftCardOrderConfirmationModule } from './opf-gift-card-order-confirmation';
import { provideOutlet } from '@spartacus/storefront';

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
      id: OpfCheckoutOutlets.GIFT_CARD,
      component: OpfGiftCardApplyComponent,
    }),
    provideOutlet({
      id: CartOutlets.ORDER_SUMMARY_GIFT_CARD,
      component: OpfGiftCardOrderSummaryComponent,
    }),
    provideOutlet({
      id: CartOutlets.ORDER_BILLING_INFO_GIFT_CARD,
      component: OpfGiftCardOrderDetailBillingComponent,
    }),
    provideOutlet({
      id: OpfCheckoutOutlets.ORDER_OVERVIEW_GIFT_CARD,
      component: OpfGiftCardPaymentMethodDetailComponent,
    }),
  ],
})
export class OpfGiftCardComponentsModule {}
