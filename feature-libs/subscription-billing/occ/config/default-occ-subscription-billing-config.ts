/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { SubscriptionBillingOccEndpoints } from '../model';

const subscriptionBillingEndpoints: SubscriptionBillingOccEndpoints = {
  subscriptionList: 'users/${userId}/subscriptions',
  subscriptionByCode:
    'users/${userId}/subscriptions/${subscriptionCode}?fields=FULL',
  cancellationSubscriptionEffectiveDate:
    'users/${userId}/subscriptions/${subscriptionCode}/cancellationEffectiveAt',
  cancelSubscription:
    'users/${userId}/subscriptions/${subscriptionCode}/cancellation',
  withdrawal: 'users/${userId}/subscriptions/${subscriptionCode}/withdrawal',
  reverseCancellation:
    'users/${userId}/subscriptions/${subscriptionCode}/cancellationReversal',
};

export const defaultOccSubscriptionBillingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...subscriptionBillingEndpoints,
        product: {
          subscription:
            'products/${productCode}?fields=sapPricePlan,sapSubscriptionTerm,productTypes',
        },
      },
    },
  },
};
