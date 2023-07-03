/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutCostCenterEventListener } from './checkout-cost-center-event.listener';
import { CheckoutPaymentTypeEventListener } from './checkout-payment-type-event.listener';

@NgModule({})
export class CheckoutB2BEventModule {
  constructor(
    _checkoutCostCenterEventListener: CheckoutCostCenterEventListener,
    _checkoutPaymentTypeEventListener: CheckoutPaymentTypeEventListener
  ) {
    // Intentional empty constructor
  }
}
