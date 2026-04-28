/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';

export abstract class UserWishlistAdapter {
  abstract getWishlist(userId: string): Observable<Wishlist>;

  abstract addEntry(
    userId: string,
    wishlistId: string,
    productCode: string
  ): Observable<WishlistEntry>;

  abstract removeEntry(
    userId: string,
    wishlistId: string,
    entryId: string
  ): Observable<void>;
}
