/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateWithMultiCart } from '@spartacus/cart/base/core';
import {
  Cart,
  CartType,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { OCC_USER_ID_ANONYMOUS, UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { WishListActions } from '../store/actions/index';
import { getWishlistName } from '../utils/utils';

@Injectable()
export class WishListService implements WishListFacade {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userAccountFacade: UserAccountFacade,
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService
  ) {}

  createWishList(userId: string, name?: string, description?: string): void {
    this.store.dispatch(
      new WishListActions.CreateWishList({ userId, name, description })
    );
  }

  getWishList(): Observable<Cart> {
    return combineLatest([
      this.getWishListId(),
      this.userAccountFacade.get(),
      this.userIdService.getUserId(),
    ]).pipe(
      distinctUntilChanged(),
      tap(([wishListId, user, userId]) => {
        if (
          !Boolean(wishListId) &&
          userId !== OCC_USER_ID_ANONYMOUS &&
          user?.customerId
        ) {
          this.loadWishList(userId, user.customerId);
        }
      }),
      filter(([wishListId]) => Boolean(wishListId)),
      switchMap(([wishListId]) => this.multiCartFacade.getCart(wishListId))
    );
  }

  loadWishList(userId: string, customerId: string): void {
    this.store.dispatch(
      new WishListActions.LoadWishList({
        userId,
        cartId: getWishlistName(customerId),
      })
    );
  }

  addEntry(productCode: string): void {
    this.getWishListIdWithUserId().subscribe(([wishListId, userId]) =>
      this.multiCartFacade.addEntry(userId, wishListId, productCode, 1)
    );
  }

  removeEntry(entry: OrderEntry): void {
    this.getWishListIdWithUserId().subscribe(([wishListId, userId]) =>
      this.multiCartFacade.removeEntry(
        userId,
        wishListId,
        entry.entryNumber as number
      )
    );
  }

  getWishListLoading(): Observable<boolean> {
    return this.getWishListId().pipe(
      switchMap((wishListId) =>
        this.multiCartFacade.isStable(wishListId).pipe(map((stable) => !stable))
      )
    );
  }

  protected getWishListId(): Observable<string> {
    return this.multiCartFacade.getCartIdByType(CartType.WISH_LIST);
  }

  private getWishListIdWithUserId(): Observable<string[]> {
    return this.getWishListId().pipe(
      distinctUntilChanged(),
      withLatestFrom(
        this.userIdService.getUserId(),
        this.userAccountFacade.get()
      ),
      tap(([wishListId, userId, user]) => {
        if (!Boolean(wishListId) && user?.customerId) {
          this.loadWishList(userId, user.customerId);
        }
      }),
      filter(([wishListId]) => Boolean(wishListId)),
      map(([wishListId, userId]) => [wishListId, userId]),
      take(1)
    );
  }
}
