/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { OpfB2bCheckoutReviewComponent } from './opf-b2b-checkout-review.component';
import { OpfCheckoutReviewCardModule } from '../../opf-checkout-review-card/opf-checkout-review-card.module';
import { OpfCheckoutTermsAndConditionsAlertModule } from '../../opf-checkout-terms-and-conditions-alert/opf-checkout-terms-and-conditions-alert.module';
import { OpfCheckoutBillingAddressFormModule } from '../../opf-checkout-billing-address-form/opf-checkout-billing-address-form.module';
import { OpfCheckoutPaymentsModule } from '../../opf-checkout-payments/opf-checkout-payments.module';
import { OpfCheckoutReviewCartDetailsModule } from '../../opf-checkout-review-cart-details/opf-checkout-review-cart-details.module';
import { CheckoutPlaceOrderModule } from '../../../../../../feature-libs/checkout/base/components/checkout-place-order/checkout-place-order.module';

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
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutReview: {
          component: OpfB2bCheckoutReviewComponent,
        },
      },
    }),
    CheckoutPlaceOrderModule,
  ],
  declarations: [OpfB2bCheckoutReviewComponent],
  exports: [OpfB2bCheckoutReviewComponent],
})
export class OpfB2bCheckoutReviewModule {}
