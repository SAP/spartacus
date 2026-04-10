/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WishlistEntry {
  id: string;
  productCode?: string;
  addedAt?: string;
  product?: any;
  [key: string]: any;
}

export interface Wishlist {
  id?: string;
  entries?: WishlistEntry[];
  [key: string]: any;
}
