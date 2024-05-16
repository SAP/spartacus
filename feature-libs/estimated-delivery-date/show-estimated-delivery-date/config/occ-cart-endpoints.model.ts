/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface CartOccEndpoints {
  /**
   * Get all carts
   *
   * @member {string} [carts]
   */
  carts?: string | OccEndpoint;
  /**
   * Get a cart with a given identifier
   *
   * @member {string} [cart]
   */
  cart?: string | OccEndpoint;
  /**
   * Creates or restore a cart for a user
   *
   * @member {string} [createCart]
   */
  createCart?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CartOccEndpoints {}
}
