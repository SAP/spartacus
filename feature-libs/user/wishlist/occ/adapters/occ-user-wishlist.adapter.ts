/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { UserWishlistAdapter } from '@spartacus/user/wishlist/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccUserWishlistAdapter implements UserWishlistAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

  getWishlist(userId: string): Observable<Wishlist> {
    // Step 1: fetch wishlists list to get the default wishlist ID
    const listUrl = this.occEndpoints.buildUrl('getUserWishlists', {
      urlParams: { userId },
    });
    return this.http
      .get<{ wishlists?: Array<{ id: string; [key: string]: any }> }>(listUrl)
      .pipe(
        map((response) => {
          const wishlists = response?.wishlists;
          if (!Array.isArray(wishlists) || wishlists.length === 0) {
            return null;
          }
          return wishlists[0].id ?? null;
        }),
        switchMap((wishlistId) => {
          if (wishlistId === null) {
            // No real wishlist exists yet.
            // 'default' is only valid for mutations (POST/DELETE), not for GET entries.
            // Return empty wishlist so the UI shows no items.
            return of({ entries: [] } as Wishlist);
          }
          // Step 2: fetch entries for the real wishlist
          const entriesUrl = this.occEndpoints.buildUrl('getWishlistEntries', {
            urlParams: { userId, wishlistId },
            queryParams: { pageSize: 1000 },
          });
          return this.http
            .get<
              { wishlistEntries?: WishlistEntry[] } | WishlistEntry[]
            >(entriesUrl)
            .pipe(
              map((res: any) => {
                // API may return { wishlistEntries: [...] } or a plain array
                const entries: WishlistEntry[] = Array.isArray(res)
                  ? res
                  : (res?.wishlistEntries ?? res?.entries ?? []);
                return { id: wishlistId, entries } as Wishlist;
              }),
              catchError((error) => {
                throw tryNormalizeHttpError(error, this.logger);
              })
            );
        }),
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  addEntry(
    userId: string,
    wishlistId: string,
    productCode: string
  ): Observable<WishlistEntry> {
    const url = this.occEndpoints.buildUrl('addWishlistEntry', {
      urlParams: { userId, wishlistId },
    });
    return this.http.post<WishlistEntry>(url, { productCode }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  removeEntry(
    userId: string,
    wishlistId: string,
    entryId: string
  ): Observable<void> {
    const url = this.occEndpoints.buildUrl('removeWishlistEntry', {
      urlParams: { userId, wishlistId, entryId },
    });
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
}
