/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@commerce-storefront-toolset/core';

declare module '@commerce-storefront-toolset/core' {
  interface OccEndpoints {
    /**
     * Endpoint for asm customer search
     *
     * @member {string}
     */
    asmCustomerSearch?: string | OccEndpoint;
  }
}
