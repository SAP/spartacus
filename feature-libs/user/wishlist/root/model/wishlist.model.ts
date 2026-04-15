/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';

export interface WishlistEntry {
  id: string;
  productCode?: string;
  addedAt?: string;
  product?: Product;
}

export interface Wishlist {
  id?: string;
  entries?: WishlistEntry[];
}
