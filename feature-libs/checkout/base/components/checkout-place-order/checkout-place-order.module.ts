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
  CmsConfig,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@commerce-storefront-toolset/core';
import { AtMessageModule } from '@commerce-storefront-toolset/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutPlaceOrderComponent } from './checkout-place-order.component';
import { defaultPlaceOrderSpinnerLayoutConfig } from './default-place-order-spinner-layout.config';

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
    provideConfig(defaultPlaceOrderSpinnerLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPlaceOrder: {
          component: CheckoutPlaceOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutPlaceOrderComponent],
  exports: [CheckoutPlaceOrderComponent],
})
export class CheckoutPlaceOrderModule {}
