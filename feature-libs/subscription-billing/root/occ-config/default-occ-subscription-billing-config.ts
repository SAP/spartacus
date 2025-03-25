/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccSubscriptionBillingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          subscription:
            'products/${productCode}?fields=sapPricePlan,sapSubscriptionTerm',
        },
        subscriptionList: 'users/${userId}/subscriptions',
        subscriptionDetail: 'users/${userId}/subscriptions/${code}',
      },
    },
  },
};
