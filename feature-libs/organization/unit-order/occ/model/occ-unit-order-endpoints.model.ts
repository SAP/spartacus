/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to retrieve unit-level orders
     *
     * @member {string}
     */
    unitLevelOrderHistory?: string | CoreOccEndpoint;

    /**
     * Endpoint to retrieve unit-level order detail
     *
     * @member {string}
     */
    unitLevelOrderDetail?: string | CoreOccEndpoint;
  }
}
