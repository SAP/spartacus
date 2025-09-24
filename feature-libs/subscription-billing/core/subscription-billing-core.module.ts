/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { facadeProviders } from './facade';
import {
  SubscriptionBillingConnector,
  CancelSubscriptionOrderConnector,
} from './connector';

@NgModule({
  imports: [],
  providers: [
    ...facadeProviders,
    SubscriptionBillingConnector,
    CancelSubscriptionOrderConnector,
  ],
})
export class SubscriptionBillingCoreModule {}
