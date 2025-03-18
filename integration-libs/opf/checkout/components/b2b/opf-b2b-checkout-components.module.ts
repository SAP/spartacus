/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { OpfB2bCheckoutPaymentTypeModule } from './opf-b2b-checkout-payment-type';
import { OpfB2bCheckoutPurchaseOrderNumberModule } from './opf-b2b-checkout-purchase-order-number/opf-b2b-checkout-purchase-order-number.module';

@NgModule({
  imports: [
    OpfB2bCheckoutPaymentTypeModule,
    OpfB2bCheckoutPurchaseOrderNumberModule,
  ],
})
export class OpfB2bCheckoutComponentsModule {}
