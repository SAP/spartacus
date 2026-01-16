/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import {
  SubscriptionActionsFacade,
  SubscriptionFacade,
} from '@spartacus/subscription-billing/root';
import { SubscriptionActionsService } from './subscription-actions.service';

export const facadeProviders: Provider[] = [
  SubscriptionService,
  {
    provide: SubscriptionFacade,
    useExisting: SubscriptionService,
  },
  SubscriptionActionsService,
  {
    provide: SubscriptionActionsFacade,
    useExisting: SubscriptionActionsService,
  },
];
