/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { OpfB2bCheckoutPaymentTypeModule } from './opf-b2b-checkout-payment-type';
import { OpfB2bCheckoutReviewModule } from './opf-b2b-checkout-review';
import { OpfB2bCheckoutDeliveryAddressModule } from './opf-b2b-checkout-delivery-address';
import { OpfB2bCheckoutCostCenterModule } from './opf-b2b-checkout-cost-center';
import { OpfB2bCheckoutPlaceOrderModule } from './opf-b2b-checkout-place-order';
import { OpfB2bCheckoutPaymentAndReviewModule } from './opf-b2b-checkout-payment-and-review';
@NgModule({
  imports: [
    OpfB2bCheckoutPaymentTypeModule,
    OpfB2bCheckoutReviewModule,
    OpfB2bCheckoutPaymentAndReviewModule,
    OpfB2bCheckoutDeliveryAddressModule,
    OpfB2bCheckoutCostCenterModule,
    OpfB2bCheckoutPlaceOrderModule,
  ],
})
export class OpfB2bCheckoutComponentsModule {}
