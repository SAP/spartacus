/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WishlistEntry {
  /**
   * String ID from the new Wishlist API (differs from legacy entryNumber: number)
   */
  id: string;
  /** Product code returned by the Wishlist entries endpoint */
  productCode?: string;
  addedAt?: string;
  /** Full product details, enriched after fetching from the Products API */
  product?: any;
  [key: string]: any;
}

export interface Wishlist {
  id?: string;
  entries?: WishlistEntry[];
  [key: string]: any;
}
