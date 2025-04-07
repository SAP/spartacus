/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCheckoutBillingAddressFormModule } from './opf-checkout-billing-address-form/opf-checkout-billing-address-form.module';
import { OpfCheckoutEmailUpdateModule } from './opf-checkout-email-update/opf-checkout-email-update.module';
import { OpfCheckoutPaymentAndReviewModule } from './opf-checkout-payment-and-review/opf-checkout-payment-and-review.module';
import { OpfCheckoutPaymentWrapperModule } from './opf-checkout-payment-wrapper/opf-checkout-payment-wrapper.module';
import { OpfCheckoutPaymentsModule } from './opf-checkout-payments/opf-checkout-payments.module';

@NgModule({
  imports: [
    OpfCheckoutPaymentAndReviewModule,
    OpfCheckoutPaymentsModule,
    OpfCheckoutBillingAddressFormModule,
    OpfCheckoutPaymentWrapperModule,
    OpfCheckoutEmailUpdateModule,
  ],
})
export class OpfCheckoutComponentsModule {}
