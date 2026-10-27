/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { CheckoutCostCenterEventListener } from './checkout-cost-center-event.listener';
import { CheckoutPaymentTypeEventListener } from './checkout-payment-type-event.listener';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(CheckoutCostCenterEventListener);
      inject(CheckoutPaymentTypeEventListener);
    }),
  ],
})
export class CheckoutB2BEventModule {}
