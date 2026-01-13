/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  /**
   * Endpoint for cancelling a specific subscription.
   */
  cancelSubscription?: string | OccEndpoint;

  /**
   * Endpoint for retrieving the effective cancellation date of a subscription.
   */
  getEffectiveCancellationDate?: string | OccEndpoint;

  /**
   * Endpoint for withdrawing a previously cancelled subscription.
   */
  withdrawSubscription?: string | OccEndpoint;

  /**
   * Endpoint for reversing a cancellation of a subscription.
   */
  reverseCancellation?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends SubscriptionBillingOccEndpoints {}
}
