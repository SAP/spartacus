/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideEnvironmentInitializer } from '@angular/core';
import { CheckoutScheduledReplenishmentEventListener } from './checkout-scheduled-replenishment-event.listener';

@NgModule({
  providers: [
    provideEnvironmentInitializer(() => {
      inject(CheckoutScheduledReplenishmentEventListener);
    }),
  ],
})
export class CheckoutScheduledReplenishmentEventModule {}
