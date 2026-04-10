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

@Injectable()
export class WishListV2BridgeService implements WishListFacade {
  private featureToggles = inject(FeatureToggles);
  private v1Service = inject(WishListService);
  private userIdService = inject(UserIdService);
  private connector = inject(UserWishlistConnector);
  private productConnector = inject(ProductConnector);

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
    if (!this.featureToggles.enableNewWishlistEndpoint) {
      this.v1Service.createWishList(userId, name, description);
    }
  }

  loadWishList(userId: string, customerId: string): void {
    if (!this.featureToggles.enableNewWishlistEndpoint) {
      this.v1Service.loadWishList(userId, customerId);
    }
  }

  getWishList(): Observable<Cart> {
    if (!this.featureToggles.enableNewWishlistEndpoint) {
      return this.v1Service
        .getWishList()
        .pipe(startWith({ entries: [] } as Cart));
    }
    return this.wishlistV2$.pipe(map((wl) => this.mapWishlistToCart(wl)));
  }

  addEntry(productCode: string): void {
    if (!this.featureToggles.enableNewWishlistEndpoint) {
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
    if (!this.featureToggles.enableNewWishlistEndpoint) {
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
    if (!this.featureToggles.enableNewWishlistEndpoint) {
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
