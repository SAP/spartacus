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
  /**
   * Deletes a cart with a given cart id
   *
   * @member {string} [deleteCart]
   */
  deleteCart?: string | OccEndpoint;
  /**
   * Adds a product to the cart
   *
   * @member {string} [addEntries]
   */
  addEntries?: string | OccEndpoint;
  /**
   * Update quantity and store the details of a cart entry
   *
   * @member {string} [updateEntries]
   */
  updateEntries?: string | OccEndpoint;
  /**
   * Deletes cart entry
   *
   * @member {string} [removeEntries]
   */
  removeEntries?: string | OccEndpoint;

  /**
   * Assign email to cart
   *
   * @member {string} [addEmail]
   */
  addEmail?: string | OccEndpoint;
  /**
   * Explicitly saves a cart
   *
   * @member {string}
   */
  saveCart?: string | OccEndpoint;
  /**
   * Endpoint for cart voucher
   *
   * @member {string}
   */
  cartVoucher?: string | OccEndpoint;
  /**
   * Get cart validation results
   */
  validate?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CartOccEndpoints {}
}
