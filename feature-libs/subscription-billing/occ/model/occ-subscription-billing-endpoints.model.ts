/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface SubscriptionBillingOccEndpoints {
  /**
   * Endpoint for the list of one user's subscriptions
   *
   * @member {string}
   */
  subscriptionList?: string | CoreOccEndpoint;
  /**
   * Endpoint for the details of one user's subscription
   *
   * @member {string}
   */
  subscriptionByCode?: string | CoreOccEndpoint;

  /**
   * Endpoint for the extension validity date of one user's subscription
   *
   * @member {string}
   */
  extensionEffectiveDate?: string | CoreOccEndpoint;
  /**
   * Endpoint for the extending one user's subscription
   *
   * @member {string}
   */
  extendSubscription?: string | CoreOccEndpoint;
  /**
   * Endpoint for cancelling a specific subscription.
   */
  cancelSubscription?: string | CoreOccEndpoint;

  /**
   * Endpoint for retrieving the effective cancellation date of a subscription.
   */
  getEffectiveCancellationDate?: string | CoreOccEndpoint;

  /**
   * Endpoint for withdrawing a previously cancelled subscription.
   */
  withdrawSubscription?: string | CoreOccEndpoint;

  /**
   * Endpoint for reversing a cancellation of a subscription.
   */
  reverseCancellation?: string | CoreOccEndpoint;

  /**
   * Endpoint for retrieving the list of subscription bills for a user.
   */
  subscriptionBillsList?: string | CoreOccEndpoint;

  /**
   * Endpoint for retrieving a specific subscription bill by its ID.
   */
  subscriptionBillByCode?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends SubscriptionBillingOccEndpoints {}
}
