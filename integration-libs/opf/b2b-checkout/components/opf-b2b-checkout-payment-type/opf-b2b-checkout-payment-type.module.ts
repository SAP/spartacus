/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfCheckoutPaymentsModule } from '@spartacus/opf/checkout/components';
import { OpfB2bCheckoutPaymentTypeComponent } from './opf-b2b-checkout-payment-type.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    FeaturesConfigModule,
    OpfCheckoutPaymentsModule,
    ReactiveFormsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutPaymentType: {
          component: OpfB2bCheckoutPaymentTypeComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [OpfB2bCheckoutPaymentTypeComponent],
  exports: [OpfB2bCheckoutPaymentTypeComponent],
})
export class OpfB2bCheckoutPaymentTypeModule {}
