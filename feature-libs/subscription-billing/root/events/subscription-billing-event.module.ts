/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionBillingEventListener } from './subscription-billing-event.listener';

@NgModule({})
export class SubscriptionBillingEventModule {
  constructor(
    _subscriptionBillingEventListener: SubscriptionBillingEventListener
  ) {
    // Intentional empty constructor
  }
}
