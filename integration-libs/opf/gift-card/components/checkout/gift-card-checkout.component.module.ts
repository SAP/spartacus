/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  DIALOG_TYPE,
  LayoutConfig,
  SpinnerComponent,
} from '@spartacus/storefront';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';

import { CommonModule } from '@angular/common';
import { GiftCardCheckoutComponent } from './gift-card-checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule, I18nModule, GiftCardCheckoutComponent],
  providers: [provideDefaultConfig(defaultPlaceOrderSpinnerLayoutConfig)],
  exports: [GiftCardCheckoutComponent],
})
export class GiftCardCheckoutComponentModule {}
