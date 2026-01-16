/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
} from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  I18nModule,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';

import { AddressFormModule } from '@spartacus/user/profile/components';
import { OpfCheckoutBillingAddressFormModule } from '../opf-checkout-billing-address-form/opf-checkout-billing-address-form.module';
import { OpfCheckoutPaymentWrapperModule } from '../opf-checkout-payment-wrapper';
import { OpfCheckoutPaymentsModule } from '../opf-checkout-payments/opf-checkout-payments.module';
import { OpfCheckoutReviewCardModule } from '../opf-checkout-review-card/opf-checkout-review-card.module';
import { OpfCheckoutReviewCartDetailsModule } from '../opf-checkout-review-cart-details/opf-checkout-review-cart-details.module';
import { OpfCheckoutTermsAndConditionsAlertModule } from '../opf-checkout-terms-and-conditions-alert/opf-checkout-terms-and-conditions-alert.module';
import { OpfCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';

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
    OpfCheckoutPaymentAndReviewComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutPaymentAndReview: {
          component: OpfCheckoutPaymentAndReviewComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  exports: [OpfCheckoutPaymentAndReviewComponent],
})
export class OpfCheckoutPaymentAndReviewModule {}
