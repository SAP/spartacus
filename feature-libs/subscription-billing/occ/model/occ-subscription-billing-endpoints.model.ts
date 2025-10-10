/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface SubscriptionBillingOccEndpoints {
  /**
   * Endpoint for the list of one user's subscriptions
   *
   * @member {string}
   */
  subscriptionList?: string | OccEndpoint;
  /**
   * Endpoint for the details of one user's subscription
   *
   * @member {string}
   */
  subscriptionByCode?: string | OccEndpoint;
  /**
   * Endpoint for the extension validity date of one user's subscription
   *
   * @member {string}
   */
  extensionEffectiveDate?: string | OccEndpoint;
  /**
   * Endpoint for the extending one user's subscription
   *
   * @member {string}
   */
  extendSubscription?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends SubscriptionBillingOccEndpoints {}
}
