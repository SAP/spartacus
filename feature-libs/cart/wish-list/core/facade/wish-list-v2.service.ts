/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import {
  OCC_USER_ID_ANONYMOUS,
  Product,
  ProductSearchConnector,
  UserIdService,
} from '@spartacus/core';
import { UserWishlistConnector } from '@spartacus/user/wishlist/core';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from 'rxjs/operators';

@Injectable()
export class WishListV2Service implements WishListFacade {
  private userIdService = inject(UserIdService);
  private connector = inject(UserWishlistConnector);
  private productSearchConnector = inject(ProductSearchConnector);

  private refresh$ = new BehaviorSubject<void>(undefined);

  private _wishlistV2$: Observable<Wishlist> | undefined;
  private get wishlistV2$(): Observable<Wishlist> {
    this._wishlistV2$ ??= combineLatest([
      this.userIdService.getUserId(),
      this.refresh$,
    ]).pipe(
      filter(([userId]) => userId !== OCC_USER_ID_ANONYMOUS),
      switchMap(([userId]) =>
        this.connector
          .getWishlist(userId)
          .pipe(catchError(() => of({ entries: [] } as Wishlist)))
      ),
      switchMap((wishlist) => this.enrichWithProducts(wishlist)),
      shareReplay({ bufferSize: 1, refCount: false })
    );
    return this._wishlistV2$;
  }

  private enrichWithProducts(wishlist: Wishlist): Observable<Wishlist> {
    const entries = wishlist.entries ?? [];
    if (entries.length === 0) {
      return of(wishlist);
    }
    const codes = entries
      .map((e) => e.productCode ?? '')
      .filter((code) => !!code);
    return this.productSearchConnector.searchByCodes(codes).pipe(
      map(({ products }) => {
        const productMap = new Map(products.map((p) => [p.code, p]));
        return {
          ...wishlist,
          entries: entries.map(
            (entry): WishlistEntry => ({
              ...entry,
              product:
                productMap.get(entry.productCode ?? '') ??
                ({ code: entry.productCode } as Product),
            })
          ),
        };
      }),
      catchError(() => of(wishlist))
    );
  }

  // no-op: the backend creates the default wishlist automatically on first entry
  createWishList(
    _userId: string,
    _name?: string,
    _description?: string
  ): void {}

  // no-op: data is loaded lazily via getWishList()
  loadWishList(_userId: string, _customerId: string): void {}

  getWishList(): Observable<Cart> {
    return this.wishlistV2$.pipe(map((wl) => this.mapWishlistToCart(wl)));
  }

  addEntry(productCode: string): void {
    combineLatest([this.userIdService.getUserId(), this.wishlistV2$])
      .pipe(
        take(1),
        map(([userId, wl]) => ({ userId, wishlistId: wl.id ?? 'default' }))
      )
      .subscribe(({ userId, wishlistId }) => {
        this.connector
          .addEntry(userId, wishlistId, productCode)
          .subscribe(() => this.refresh$.next());
      });
  }

  removeEntry(entry: OrderEntry): void {
    const entryId = (entry as any).wishlistEntryId as string;
    combineLatest([this.userIdService.getUserId(), this.wishlistV2$])
      .pipe(
        take(1),
        map(([userId, wl]) => ({ userId, wishlistId: wl.id ?? 'default' }))
      )
      .subscribe(({ userId, wishlistId }) => {
        this.connector
          .removeEntry(userId, wishlistId, entryId)
          .subscribe(() => this.refresh$.next());
      });
  }

  getWishListLoading(): Observable<boolean> {
    return of(false);
  }

  private mapWishlistToCart(wl: Wishlist): Cart {
    return {
      code: wl.id,
      entries: (wl.entries ?? []).map((e, idx) => ({
        entryNumber: idx,
        wishlistEntryId: e.id,
        product: e.product ?? ({ code: e.productCode } as Product),
        basePrice: e.product?.price,
        updateable: true,
        quantity: 1,
      })) as any[],
    } as Cart;
  }
}
