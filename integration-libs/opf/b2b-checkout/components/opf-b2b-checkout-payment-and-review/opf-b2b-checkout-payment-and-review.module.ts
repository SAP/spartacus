/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';
import { OpfB2bCheckoutPaymentAndReviewComponent } from './opf-b2b-checkout-payment-and-review.component';
import { AddressFormModule } from '@spartacus/user/profile/components';
import {
  OpfCheckoutBillingAddressFormModule,
  OpfCheckoutPaymentWrapperModule,
  OpfCheckoutPaymentsModule,
  OpfCheckoutReviewCardModule,
  OpfCheckoutReviewCartDetailsModule,
  OpfCheckoutTermsAndConditionsAlertModule,
} from '@spartacus/opf/checkout/components';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/base/components';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    OpfCheckoutPaymentsModule,
    UrlModule,
    ReactiveFormsModule,
    RouterModule,
    OpfCheckoutBillingAddressFormModule,
    AddressFormModule,
    OutletModule,
    PromotionsModule,
    IconModule,
    CardModule,
    OpfCheckoutTermsAndConditionsAlertModule,
    OpfCheckoutPaymentWrapperModule,
    OpfCheckoutReviewCardModule,
    OpfCheckoutReviewCartDetailsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfB2bCheckoutPaymentAndReview: {
          component: OpfB2bCheckoutPaymentAndReviewComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [OpfB2bCheckoutPaymentAndReviewComponent],
  exports: [OpfB2bCheckoutPaymentAndReviewComponent],
})
export class OpfB2bCheckoutPaymentAndReviewModule {}
