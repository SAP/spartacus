/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to retrieve unit-level orders
     *
     * @member {string}
     */
    unitLevelOrderHistory?: string | OccEndpoint;

    /**
     * Endpoint to retrieve unit-level order detail
     *
     * @member {string}
     */
    unitLevelOrderDetail?: string | OccEndpoint;
  }
}
