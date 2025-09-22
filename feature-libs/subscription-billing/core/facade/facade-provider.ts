/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { SubscriptionBillingService } from './subscription-billing.service';
import { CancelSubscriptionFacade, SubscriptionBillingFacade } from '@spartacus/subscription-billing/root';
import { SubscriptionBillingCancelService } from './subscription-billing-cancel.service';

export const facadeProviders: Provider[] = [
  SubscriptionBillingService,
  {
    provide: SubscriptionBillingFacade,
    useExisting: SubscriptionBillingService,
  },
  SubscriptionBillingCancelService,
  {
    provide: CancelSubscriptionFacade,
    useExisting: SubscriptionBillingCancelService,
  },
];
