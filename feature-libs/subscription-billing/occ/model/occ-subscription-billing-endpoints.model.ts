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
   * Cancel subscription
   *
   * @member {string} [cancelSubscription]
   */
  cancelSubscription?: string | OccEndpoint;

  /**
   * Cancel subscription get datw
   *
   * @member {string} [cancellationSubscriptionEffectiveDate]
   */
  cancellationSubscriptionEffectiveDate?: string | OccEndpoint;

  /**
   * withdrawal subscription
   *
   * @member {string} [withdrawal]
   */
  withdrawal?: string | OccEndpoint;

  /**
   * reversecancellation subscription
   *
   * @member {string} [reverseCancellation]
   */
  reverseCancellation?: string | OccEndpoint;


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
