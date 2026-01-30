/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import {
  SubscriptionActionsFacade,
  SubscriptionBillingFacade,
  SubscriptionFacade,
} from '@spartacus/subscription-billing/root';
import { SubscriptionActionsService } from './subscription-actions.service';
import { SubscriptionBillingService } from './subscription-billing.service';
import { PageMetaResolver } from '@spartacus/core';
import { SubscriptionDetailsPageMetaResolver } from '../services/subscription-details-page-meta.resolver';
import { SubscriptionBillingDetailsPageMetaResolver } from '../services/subscription-billing-details-page-meta.resolver';

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
  SubscriptionBillingService,
  {
    provide: SubscriptionBillingFacade,
    useExisting: SubscriptionBillingService,
  },
  {
    provide: PageMetaResolver,
    useExisting: SubscriptionDetailsPageMetaResolver,
    multi: true,
  },
  {
    provide: PageMetaResolver,
    useExisting: SubscriptionBillingDetailsPageMetaResolver,
    multi: true,
  }
];
