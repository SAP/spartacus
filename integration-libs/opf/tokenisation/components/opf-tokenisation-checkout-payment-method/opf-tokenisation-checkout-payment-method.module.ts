/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { OpfTokenisationCheckoutPaymentMethodComponent } from './opf-tokenisation-checkout-payment-method.component';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
  CheckoutPaymentFormModule,
} from '@spartacus/checkout/base/components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CheckoutPaymentFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    FeaturesConfigModule,
    OpfTokenisationCheckoutPaymentMethodComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: OpfTokenisationCheckoutPaymentMethodComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  exports: [OpfTokenisationCheckoutPaymentMethodComponent],
})
export class OpfTokenisationCheckoutPaymentMethodModule {}
