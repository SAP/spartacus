/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutScheduledReplenishmentEventListener } from './checkout-scheduled-replenishment-event.listener';

@NgModule({})
export class CheckoutScheduledReplenishmentEventModule {
  constructor(
    _checkoutScheduledReplenishmentEventListener: CheckoutScheduledReplenishmentEventListener
  ) {
    // Intentional empty constructor
  }
}
