/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionBillingComponentsModule } from './components/subscription-billing-components.module';
import { SubscriptionBillingCoreModule } from './core/subscription-billing-core.module';
import { SubscriptionBillingRootModule } from './root/subscription-billing-root.module';

@NgModule({
  imports: [
    SubscriptionBillingComponentsModule,
    SubscriptionBillingCoreModule,
    SubscriptionBillingRootModule,
  ],
})
export class SubscriptionBillingModule {}
