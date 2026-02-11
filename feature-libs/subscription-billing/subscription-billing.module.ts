/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionBillingComponentsModule } from '@spartacus/subscription-billing/components';
import { SubscriptionBillingCoreModule } from '@spartacus/subscription-billing/core';
import { SubscriptionBillingOccModule } from '@spartacus/subscription-billing/occ';
@NgModule({
  imports: [
    SubscriptionBillingComponentsModule,
    SubscriptionBillingCoreModule,
    SubscriptionBillingOccModule,
  ],
})
export class SubscriptionBillingModule {}
