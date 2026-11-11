/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get a store location
     *
     * @member {string} [page]
     */
    store?: string | CoreOccEndpoint;
    /**
     * Get a list of store locations
     *
     * @member {string} [page]
     */
    stores?: string | CoreOccEndpoint;
    /**
     * Gets a store location count per country and regions
     *
     * @member {string} [page]
     */
    storescounts?: string | CoreOccEndpoint;
  }
}
