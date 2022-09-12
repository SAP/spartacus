/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@commerce-storefront-toolset/checkout/base/components';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@commerce-storefront-toolset/core';
import { AtMessageModule } from '@commerce-storefront-toolset/storefront';
import { CheckoutScheduledReplenishmentPlaceOrderComponent } from './checkout-place-order.component';

@NgModule({
  imports: [
    AtMessageModule,
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPlaceOrder: {
          component: CheckoutScheduledReplenishmentPlaceOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutScheduledReplenishmentPlaceOrderComponent],
  exports: [CheckoutScheduledReplenishmentPlaceOrderComponent],
})
export class CheckoutScheduledReplenishmentPlaceOrderModule {}
