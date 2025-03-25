/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CurrentSubscriptionProductService, facadeProviders } from './facade';
import { CurrentProductService } from '@spartacus/storefront';
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
