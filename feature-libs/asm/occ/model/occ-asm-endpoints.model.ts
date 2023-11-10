/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for asm customer search
     *
     * @member {string}
     */
    asmCustomerSearch?: string | OccEndpoint;
    asmCustomerLists?: string | OccEndpoint;
    asmBindCart?: string | OccEndpoint;
    asmCreateCustomer?: string | OccEndpoint;
  }
}
