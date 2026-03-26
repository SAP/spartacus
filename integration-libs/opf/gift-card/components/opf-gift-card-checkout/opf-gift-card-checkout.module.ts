/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  CmsConfig,
  provideConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  DIALOG_TYPE,
  LayoutConfig,
  SpinnerComponent,
} from '@spartacus/storefront';

import { NgModule } from '@angular/core';
import { OpfGiftCardCheckoutOrderSummaryComponent } from './opf-gift-card-checkout-order-summary/opf-gift-card-checkout-order-summary.component';
import { OpfGiftCardCheckoutPlaceOrderComponent } from './opf-gift-card-checkout-place-order/opf-gift-card-checkout-place-order.component';

export const defaultPlaceOrderSpinnerLayoutConfig: LayoutConfig = {
  launch: {
    PLACE_ORDER_SPINNER: {
      inline: true,
      component: SpinnerComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
};

@NgModule({
  imports: [
    OpfGiftCardCheckoutPlaceOrderComponent,
    OpfGiftCardCheckoutOrderSummaryComponent,
  ],
  providers: [
    provideDefaultConfig(defaultPlaceOrderSpinnerLayoutConfig),

    provideConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrderSummary: {
          component: OpfGiftCardCheckoutOrderSummaryComponent,
        },
      },
    }),
  ],
  exports: [OpfGiftCardCheckoutPlaceOrderComponent],
})
export class OpfGiftCardCheckoutModule {}
