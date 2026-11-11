/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for asm customer search
     *
     * @member {string}
     */
    asmCustomerSearch?: string | CoreOccEndpoint;
    asmCustomerLists?: string | CoreOccEndpoint;
    asmBindCart?: string | CoreOccEndpoint;
    asmCreateCustomer?: string | CoreOccEndpoint;
    asmSessionEvent?: string | CoreOccEndpoint;
  }
}
