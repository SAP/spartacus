/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { defaultOccSubscriptionBillingConfig } from './config/default-occ-subscription-billing-config';
import { provideDefaultConfig } from '@spartacus/core';
import { OccSubscriptionBillingAdapter } from './adapters';
import { SubscriptionBillingAdapter } from '@spartacus/subscription-billing/core';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccSubscriptionBillingConfig),
    {
      provide: SubscriptionBillingAdapter,
      useClass: OccSubscriptionBillingAdapter,
    },
  ],
})
export class SubscriptionBillingOccModule {}
