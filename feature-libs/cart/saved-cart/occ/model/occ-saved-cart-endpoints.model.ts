/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to load saved carts
     *
     * * @member {string}
     */
    savedCarts?: string | CoreOccEndpoint;
    /**
     * Endpoint to save a cart
     *
     * * @member {string}
     */
    saveCart?: string | CoreOccEndpoint;
    /**
     * Endpoint to get specific saved cart
     *
     * * @member {string}
     */
    savedCart?: string | CoreOccEndpoint;
    /**
     * Endpoint to make a saved cart active
     *
     * * @member {string}
     */
    restoreSavedCart?: string | CoreOccEndpoint;
    /**
     * Endpoint to clone a saved cart
     *
     * * @member {string}
     */
    cloneSavedCart?: string | CoreOccEndpoint;
  }
}
