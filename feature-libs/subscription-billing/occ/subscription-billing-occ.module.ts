/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { defaultOccSubscriptionBillingConfig } from './config/default-occ-subscription-billing-config';
import { provideDefaultConfig } from '@spartacus/core';
import { SubscriptionBillingAdapter } from '../core/connector';
import { OccSubscriptionBillingAdapter } from './adapters';

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
