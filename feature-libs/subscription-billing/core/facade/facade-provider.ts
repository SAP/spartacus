/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { SubscriptionBillingService } from './subscription-billing.service';
import {
  SubscriptionActionsFacade,
  SubscriptionBillingFacade,
} from '@spartacus/subscription-billing/root';
import { SubscriptionActionService } from './subscription-billing-action.service';

export const facadeProviders: Provider[] = [
  SubscriptionBillingService,
  {
    provide: SubscriptionBillingFacade,
    useExisting: SubscriptionBillingService,
  },
  SubscriptionActionService,
  {
    provide: SubscriptionActionsFacade,
    useExisting: SubscriptionActionService,
  },
];
