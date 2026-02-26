/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GiftCardOrderSummaryComponent,
  GiftCardOrderSummaryModule,
} from './gift-card-order-summary';
import {
  OpfGiftCardPaymentComponent,
  OpfGiftCardPaymentModule,
} from './gift-card-payment-method-details';

import { AppliedGiftCardModule } from './applied-gift-card/applied-gift-card.module';
import { CartOutlets } from '@spartacus/cart/base/root';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { GiftCardModule } from './gift-card/gift-card.module';
import { GiftCardOrderDetailBillingComponent } from './gift-card-order-detail-billing';
import { NgModule } from '@angular/core';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';
import { provideOutlet } from '@spartacus/storefront';

@NgModule({
  imports: [
    GiftCardModule,
    AppliedGiftCardModule,
    GiftCardOrderSummaryModule,
    OpfGiftCardPaymentModule,
  ],
  providers: [
    provideOutlet({
      id: OpfCheckoutOutlets.GIFT_CARD,
      component: GiftCardComponent,
    }),
    provideOutlet({
      id: CartOutlets.ORDER_SUMMARY_GIFT_CARD,
      component: GiftCardOrderSummaryComponent,
    }),
    provideOutlet({
      id: CartOutlets.ORDER_BILLING_INFO_GIFT_CARD,
      component: GiftCardOrderDetailBillingComponent,
    }),
    provideOutlet({
      id: OpfCheckoutOutlets.ORDER_OVERVIEW_GIFT_CARD,
      component: OpfGiftCardPaymentComponent,
    }),
  ],
})
export class OpfGiftCardComponentModule {}
