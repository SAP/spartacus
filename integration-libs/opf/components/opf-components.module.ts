/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OPFCheckoutPaymentAndReviewModule } from './opf-checkout-payment-and-review/opf-checkout-payment-and-review.module';
import { OpfCheckoutPaymentsModule } from './opf-checkout-payments/opf-checkout-payments.module';

@NgModule({
  imports: [OPFCheckoutPaymentAndReviewModule, OpfCheckoutPaymentsModule],
})
export class OpfComponentsModule {}
