/*
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
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { OpfCheckoutPaymentsModule } from '@spartacus/opf/checkout/components';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfB2bCheckoutPaymentTypeComponent } from './opf-b2b-checkout-payment-type.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    FeaturesConfigModule,
    OpfCheckoutPaymentsModule,
    ReactiveFormsModule,
    OpfB2bCheckoutPaymentTypeComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutPaymentType: {
          component: OpfB2bCheckoutPaymentTypeComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  exports: [OpfB2bCheckoutPaymentTypeComponent],
})
export class OpfB2bCheckoutPaymentTypeModule {}
