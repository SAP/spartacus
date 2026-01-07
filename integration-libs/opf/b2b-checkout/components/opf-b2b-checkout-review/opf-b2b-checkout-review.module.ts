/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckoutPlaceOrderModule } from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  OpfCheckoutBillingAddressFormModule,
  OpfCheckoutPaymentsModule,
  OpfCheckoutReviewCardModule,
  OpfCheckoutReviewCartDetailsModule,
  OpfCheckoutTermsAndConditionsAlertModule,
} from '@spartacus/opf/checkout/components';
import { OpfB2bCheckoutReviewComponent } from './opf-b2b-checkout-review.component';

import { OpfB2bCheckoutPlaceOrderModule } from '../opf-b2b-checkout-place-order/opf-b2b-checkout-place-order.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    I18nModule,
    UrlModule,
    OpfCheckoutReviewCardModule,
    OpfCheckoutTermsAndConditionsAlertModule,
    OpfCheckoutBillingAddressFormModule,
    OpfCheckoutPaymentsModule,
    OpfCheckoutReviewCartDetailsModule,
    OpfB2bCheckoutPlaceOrderModule,
    CheckoutPlaceOrderModule,
    OpfB2bCheckoutReviewComponent,
  ],
  exports: [OpfB2bCheckoutReviewComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutReview: {
          component: OpfB2bCheckoutReviewComponent,
        },
      },
    }),
  ],
})
export class OpfB2bCheckoutReviewModule {}
