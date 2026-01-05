/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { defaultOccSubscriptionBillingConfig } from './config/default-occ-subscription-billing-config';
import { provideDefaultConfig } from '@spartacus/core';
import {
  OccSubscriptionAdapter,
  OccSubscriptionActionsAdapter,
} from './adapters';
import {
  SubscriptionActionsAdapter,
  SubscriptionAdapter,
} from '@spartacus/subscription-billing/core';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccSubscriptionBillingConfig),
    {
      provide: SubscriptionAdapter,
      useClass: OccSubscriptionAdapter,
    },
    {
      provide: SubscriptionActionsAdapter,
      useClass: OccSubscriptionActionsAdapter,
    },
  ],
})
export class SubscriptionBillingOccModule {}
