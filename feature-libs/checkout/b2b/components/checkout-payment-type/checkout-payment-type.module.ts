/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartValidationGuard } from '@commerce-storefront-toolset/cart/base/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@commerce-storefront-toolset/checkout/base/components';
import { CmsConfig, ConfigModule, I18nModule } from '@commerce-storefront-toolset/core';
import { SpinnerModule } from '@commerce-storefront-toolset/storefront';
import { CheckoutPaymentTypeComponent } from './checkout-payment-type.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentType: {
          component: CheckoutPaymentTypeComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutPaymentTypeComponent],
  exports: [CheckoutPaymentTypeComponent],
})
export class CheckoutPaymentTypeModule {}
