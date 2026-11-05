/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideEnvironmentInitializer } from '@angular/core';
import { SubscriptionBillingEventListener } from './subscription-billing-event.listener';

@NgModule({
  providers: [
    provideEnvironmentInitializer(() => {
      inject(SubscriptionBillingEventListener);
    }),
  ],
})
export class SubscriptionBillingEventModule {}
