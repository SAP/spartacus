/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CurrentSubscriptionProductService } from './facade';
import { CurrentProductService } from '@spartacus/storefront';
import { facadeProviders } from '@spartacus/pickup-in-store/core';
import { SubscriptionBillingConnector } from './connector';

@NgModule({
  imports: [],
  providers: [
    ...facadeProviders,
    SubscriptionBillingConnector,
    {
      provide: CurrentProductService,
      useExisting: CurrentSubscriptionProductService,
    },
  ],
})
export class SubscriptionBillingCoreModule {}
