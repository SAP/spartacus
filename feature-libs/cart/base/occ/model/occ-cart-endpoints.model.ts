/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface CartOccEndpoints {
  /**
   * Get all carts
   *
   * @member {string} [carts]
   */
  carts?: string | CoreOccEndpoint;
  /**
   * Get a cart with a given identifier
   *
   * @member {string} [cart]
   */
  cart?: string | CoreOccEndpoint;
  /**
   * Creates or restore a cart for a user
   *
   * @member {string} [createCart]
   */
  createCart?: string | CoreOccEndpoint;
  /**
   * Deletes a cart with a given cart id
   *
   * @member {string} [deleteCart]
   */
  deleteCart?: string | CoreOccEndpoint;
  /**
   * Adds a product to the cart
   *
   * @member {string} [addEntries]
   */
  addEntries?: string | CoreOccEndpoint;
  /**
   * Update quantity and store the details of a cart entry
   *
   * @member {string} [updateEntries]
   */
  updateEntries?: string | CoreOccEndpoint;
  /**
   * Deletes cart entry
   *
   * @member {string} [removeEntries]
   */
  removeEntries?: string | CoreOccEndpoint;

  /**
   * Assign email to cart
   *
   * @member {string} [addEmail]
   */
  addEmail?: string | CoreOccEndpoint;
  /**
   * Explicitly saves a cart
   *
   * @member {string}
   */
  saveCart?: string | CoreOccEndpoint;
  /**
   * Endpoint for cart voucher
   *
   * @member {string}
   */
  cartVoucher?: string | CoreOccEndpoint;
  /**
   * Endpoint for applying cart voucher
   *
   * @member {string}
   */
  cartApplyVoucher?: string | CoreOccEndpoint;
  /**
   * Endpoint for removing cart voucher
   *
   * @member {string}
   */
  cartRemoveVoucher?: string | CoreOccEndpoint;
  /**
   * Get cart validation results
   */
  validate?: string | CoreOccEndpoint;
  /**
   * Generates an access code for a cart
   */
  cartAccessCode?: string | CoreOccEndpoint;
  /**
   * Creates a guest user, and assigns the user to the cart
   */
  cartGuestUser?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CartOccEndpoints {}
}
