/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { UserWishlistAdapter } from './user-wishlist.adapter';

@Injectable()
export class UserWishlistConnector {
  protected adapter = inject(UserWishlistAdapter);

  getWishlist(userId: string): Observable<Wishlist> {
    return this.adapter.getWishlist(userId);
  }

  addEntry(
    userId: string,
    wishlistId: string,
    productCode: string
  ): Observable<WishlistEntry> {
    return this.adapter.addEntry(userId, wishlistId, productCode);
  }

  removeEntry(
    userId: string,
    wishlistId: string,
    entryId: string
  ): Observable<void> {
    return this.adapter.removeEntry(userId, wishlistId, entryId);
  }
}
