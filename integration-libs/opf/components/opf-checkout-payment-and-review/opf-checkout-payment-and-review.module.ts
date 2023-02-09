/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPFCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';
import {
  provideDefaultConfig,
  CmsConfig,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CheckoutAuthGuard,
  CartNotEmptyGuard,
} from '@spartacus/checkout/base/components';
import { OpfCheckoutPaymentsModule } from '../opf-checkout-payments/opf-checkout-payments.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OpfCheckoutBillingAddressFormModule } from '../opf-checkout-billing-address-form/opf-checkout-billing-address-form.module';

@NgModule({
  declarations: [OPFCheckoutPaymentAndReviewComponent],
  imports: [
    CommonModule,
    I18nModule,
    OpfCheckoutPaymentsModule,
    UrlModule,
    ReactiveFormsModule,
    RouterModule,
    OpfCheckoutBillingAddressFormModule,
  ],

  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOrder: {
          component: OPFCheckoutPaymentAndReviewComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
})
export class OPFCheckoutPaymentAndReviewModule {}
