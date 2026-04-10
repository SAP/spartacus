/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import {
  FeatureToggles,
  OCC_USER_ID_ANONYMOUS,
  Product,
  ProductConnector,
  ProductScope,
  UserIdService,
} from '@spartacus/core';
import { UserWishlistConnector } from '@spartacus/user/wishlist/core';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { BehaviorSubject, Observable, combineLatest, forkJoin, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import { WishListService } from './wish-list.service';

/**
 * Bridge service that implements WishListFacade.
 * - wishlistV2=false: delegates all calls to WishListService (V1, SavedCart API)
 * - wishlistV2=true:  uses new dedicated Wishlist OCC API via UserWishlistConnector
 */
@Injectable()
export class WishListV2BridgeService implements WishListFacade {
  private featureToggles = inject(FeatureToggles);
  private v1Service = inject(WishListService);
  private userIdService = inject(UserIdService);
  private connector = inject(UserWishlistConnector);
  private productConnector = inject(ProductConnector);

  /**
   * V2-only: refresh trigger for re-fetching after mutations.
   * Only used when wishlistV2=true.
   */
  private refresh$ = new BehaviorSubject<void>(undefined);

  /**
   * V2-only: lazily-initialized singleton stream shared by getWishList(),
   * addEntry(), and removeEntry(). Uses refCount:false so the cached wishlist
   * ID is always available for mutations without a new HTTP round-trip.
   * refresh$.next() triggers a transparent re-fetch of the wishlist + products.
   */
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

  /**
   * Parallel-fetch full product details for each wishlist entry.
   * If entries are empty, returns the wishlist as-is immediately.
   */
  private enrichWithProducts(wishlist: Wishlist): Observable<Wishlist> {
    const entries = wishlist.entries ?? [];
    if (entries.length === 0) {
      return of(wishlist);
    }
    return forkJoin(
      entries.map((entry) =>
        this.productConnector
          .get(entry.productCode ?? '', ProductScope.LIST)
          .pipe(catchError(() => of({ code: entry.productCode } as Product)))
      )
    ).pipe(
      map((products) => ({
        ...wishlist,
        entries: entries.map(
          (entry, i): WishlistEntry => ({ ...entry, product: products[i] })
        ),
      }))
    );
  }

  createWishList(userId: string, name?: string, description?: string): void {
    if (!this.featureToggles.wishlistV2) {
      this.v1Service.createWishList(userId, name, description);
    }
    // V2: no-op, API creates wishlists automatically
  }

  loadWishList(userId: string, customerId: string): void {
    if (!this.featureToggles.wishlistV2) {
      this.v1Service.loadWishList(userId, customerId);
    }
    // V2: no-op, data is loaded lazily via getWishList()
  }

  getWishList(): Observable<Cart> {
    if (!this.featureToggles.wishlistV2) {
      // startWith ensures the button renders immediately (empty entries).
      // V1 stream updates reactively once the NgRx store loads the wish list.
      return this.v1Service
        .getWishList()
        .pipe(startWith({ entries: [] } as Cart));
    }
    return this.wishlistV2$.pipe(map((wl) => this.mapWishlistToCart(wl)));
  }

  addEntry(productCode: string): void {
    if (!this.featureToggles.wishlistV2) {
      this.v1Service.addEntry(productCode);
      return;
    }
    combineLatest([this.userIdService.getUserId(), this.wishlistV2$])
      .pipe(
        take(1),
        map(([userId, wl]) => ({ userId, wishlistId: wl.id ?? '' }))
      )
      .subscribe(({ userId, wishlistId }) => {
        this.connector
          .addEntry(userId, wishlistId, productCode)
          .subscribe(() => this.refresh$.next());
      });
  }

  removeEntry(entry: OrderEntry): void {
    if (!this.featureToggles.wishlistV2) {
      this.v1Service.removeEntry(entry);
      return;
    }
    const entryId = (entry as any).wishlistEntryId as string;
    combineLatest([this.userIdService.getUserId(), this.wishlistV2$])
      .pipe(
        take(1),
        map(([userId, wl]) => ({ userId, wishlistId: wl.id ?? '' }))
      )
      .subscribe(({ userId, wishlistId }) => {
        this.connector
          .removeEntry(userId, wishlistId, entryId)
          .subscribe(() => this.refresh$.next());
      });
  }

  getWishListLoading(): Observable<boolean> {
    if (!this.featureToggles.wishlistV2) {
      return this.v1Service.getWishListLoading();
    }
    return of(false);
  }

  private mapWishlistToCart(wl: Wishlist): Cart {
    return {
      code: wl.id,
      entries: (wl.entries ?? []).map((e, idx) => ({
        entryNumber: idx,
        wishlistEntryId: e.id,
        product: (e.product ?? { code: e.productCode }) as unknown as Product,
        basePrice: e.product?.price,
        updateable: true,
        quantity: 1,
      })) as any[],
    } as Cart;
  }
}
