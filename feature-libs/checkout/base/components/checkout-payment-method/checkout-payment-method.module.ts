/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  FeaturesConfigModule,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutPaymentFormModule } from './checkout-payment-form/checkout-payment-form.module';
import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CheckoutPaymentFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: CheckoutPaymentMethodComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutPaymentMethodComponent],
  exports: [CheckoutPaymentMethodComponent],
})
export class CheckoutPaymentMethodModule {}
