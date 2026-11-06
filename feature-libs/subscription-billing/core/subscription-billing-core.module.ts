/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { facadeProviders } from './facade';
import {
  SubscriptionConnector,
  SubscriptionActionsConnector,
  SubscriptionBillingConnector,
} from './connector';

@NgModule({
  imports: [],
  providers: [
    ...facadeProviders,
    SubscriptionConnector,
    SubscriptionActionsConnector,
    SubscriptionBillingConnector,
  ],
})
export class SubscriptionBillingCoreModule {}
