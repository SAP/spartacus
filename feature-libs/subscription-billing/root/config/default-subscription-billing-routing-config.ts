/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultSubscriptionBillingRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      subscriptions: {
        paths: ['my-account/subscriptions'],
      },
      subscriptionDetails: {
        paths: ['my-account/subscription/:subscriptionId'],
        paramsMapping: { subscriptionId: 'subscriptionId' },
      },
    },
  },
};
