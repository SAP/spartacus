/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
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
    subscriptionDetail?: string | OccEndpoint;
  }
}
