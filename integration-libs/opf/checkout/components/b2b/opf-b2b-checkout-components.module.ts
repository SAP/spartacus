/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { OpfB2bCheckoutPaymentTypeModule } from './opf-b2b-checkout-payment-type';
import { OpfB2bCheckoutReviewModule } from './opf-b2b-checkout-review';

@NgModule({
  imports: [OpfB2bCheckoutPaymentTypeModule, OpfB2bCheckoutReviewModule],
})
export class OpfB2bCheckoutComponentsModule {}
