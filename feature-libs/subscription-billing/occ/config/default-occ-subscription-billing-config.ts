/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { SubscriptionBillingOccEndpoints } from '../model';

const subscriptionBillingEndpoints: SubscriptionBillingOccEndpoints = {
  subscriptionList: 'users/${userId}/subscriptions',
  subscriptionByCode:
    'users/${userId}/subscriptions/${subscriptionCode}?fields=FULL',
  extensionEffectiveDate:
    'users/${userId}/subscriptions/${subscriptionCode}/extensionEffectiveAt',
  extendSubscription:
    'users/${userId}/subscriptions/${subscriptionCode}/extension',
  getEffectiveCancellationDate:
    'users/${userId}/subscriptions/${subscriptionCode}/cancellationEffectiveAt',
  cancelSubscription:
    'users/${userId}/subscriptions/${subscriptionCode}/cancellation',
  withdrawSubscription:
    'users/${userId}/subscriptions/${subscriptionCode}/withdrawal',
  reverseCancellation:
    'users/${userId}/subscriptions/${subscriptionCode}/cancellationReversal',
  subscriptionBillsList: 'users/${userId}/subscriptionbills',
  subscriptionBillByCode: 'users/${userId}/subscriptionbills/${billId}?fields=FULL',
};

export const defaultOccSubscriptionBillingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...subscriptionBillingEndpoints,
        product: {
          subscription:
            'products/${productCode}?fields=sapPricePlan,sapSubscriptionTerm',
        },
      },
    },
  },
};
