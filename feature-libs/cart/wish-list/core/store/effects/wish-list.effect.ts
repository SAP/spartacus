/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import {
  CartActions,
  CartConnector,
  getCartIdByUserId,
  MultiCartSelectors,
  StateWithMultiCart,
} from '@spartacus/cart/base/core';
import { CartType } from '@spartacus/cart/base/root';
import {
  isNotUndefined,
  normalizeHttpError,
  SiteContextActions,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { WishListActions } from '../actions';

@Injectable()
export class WishListEffects {
  @Effect()
  createWishList$: Observable<
    WishListActions.CreateWishListSuccess | WishListActions.CreateWishListFail
  > = this.actions$.pipe(
    ofType(WishListActions.CREATE_WISH_LIST),
    map((action: WishListActions.CreateWishList) => action.payload),
    switchMap((payload) => {
      return this.cartConnector.create(payload.userId).pipe(
        switchMap((cart) => {
          return this.cartConnector
            .save(
              payload.userId,
              cart.code ?? '',
              payload.name,
              payload.description
            )
            .pipe(
              switchMap((savedCart) => [
                new WishListActions.CreateWishListSuccess({
                  cart: savedCart,
                  cartId: getCartIdByUserId(savedCart, payload.userId),
                }),
              ]),
              catchError((error) =>
                from([
                  new WishListActions.CreateWishListFail({
                    cartId: cart.code ?? '',
                    error: normalizeHttpError(error),
                  }),
                ])
              )
            );
        })
      );
    })
  );

  @Effect()
  loadWishList$: Observable<
    | WishListActions.LoadWishListSuccess
    | CartActions.RemoveCart
    | WishListActions.CreateWishList
    | WishListActions.LoadWishListFail
  > = this.actions$.pipe(
    ofType(WishListActions.LOAD_WISH_LIST),
    map((action: WishListActions.LoadWishList) => action.payload),
    concatMap((payload) => {
      const { userId, cartId } = payload;
      return this.cartConnector.loadAll(userId).pipe(
        switchMap((carts) => {
          const wishListName = cartId;
          const wishList = carts.find((cart) => cart.name === wishListName);
          const actions = [];
          actions.push(
            wishList
              ? new WishListActions.LoadWishListSuccess({
                  cart: wishList,
                  cartId: getCartIdByUserId(wishList, userId),
                })
              : new WishListActions.CreateWishList({
                  userId,
                  name: wishListName,
                })
          );
          // remove temp wishlist, which id is whishlist name
          actions.push(new CartActions.RemoveCart({ cartId: wishListName }));
          return actions;
        }),
        catchError((error) =>
          from([
            new WishListActions.LoadWishListFail({
              cartId: cartId,
              error: normalizeHttpError(error),
            }),
          ])
        )
      );
    })
  );

  @Effect()
  resetWishList$: Observable<
    WishListActions.LoadWishListSuccess | WishListActions.LoadWishListFail
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    withLatestFrom(
      this.userIdService.getUserId(),
      this.store.pipe(
        filter((store) => !!store.cart),
        select(MultiCartSelectors.getCartIdByTypeFactory(CartType.WISH_LIST))
      )
    ),
    switchMap(([, userId, wishListId]) => {
      if (Boolean(wishListId)) {
        return this.cartConnector.load(userId, wishListId).pipe(
          switchMap((wishList) => [
            new WishListActions.LoadWishListSuccess({
              cart: wishList ?? {},
              cartId: getCartIdByUserId(wishList, userId),
            }),
          ]),
          catchError((error) =>
            from([
              new WishListActions.LoadWishListFail({
                cartId: wishListId,
                error: normalizeHttpError(error),
              }),
            ])
          )
        );
      }
      return EMPTY;
    })
  );

  @Effect()
  setWishListId$: Observable<CartActions.SetCartTypeIndex> = this.actions$.pipe(
    ofType(
      WishListActions.CREATE_WISH_LIST_SUCCESS,
      WishListActions.LOAD_WISH_LIST_SUCCESS
    ),
    map((action: Action) => {
      switch (action.type) {
        case WishListActions.CREATE_WISH_LIST_SUCCESS:
        case WishListActions.LOAD_WISH_LIST_SUCCESS: {
          return new CartActions.SetCartTypeIndex({
            cartType: CartType.WISH_LIST,
            cartId: (action as StateUtils.EntitySuccessAction).meta
              .entityId as string,
          });
        }
      }
    }),
    filter(isNotUndefined)
  );

  @Effect()
  setWishListData$: Observable<CartActions.SetCartData> = this.actions$.pipe(
    ofType(
      WishListActions.CREATE_WISH_LIST_SUCCESS,
      WishListActions.LOAD_WISH_LIST_SUCCESS
    ),
    map((action: StateUtils.EntitySuccessAction) => {
      switch (action.type) {
        case WishListActions.CREATE_WISH_LIST_SUCCESS:
        case WishListActions.LOAD_WISH_LIST_SUCCESS: {
          return new CartActions.SetCartData({
            cart: action.payload.cart,
            cartId: action.payload.cartId,
          });
        }
      }
    }),
    filter(isNotUndefined)
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private userIdService: UserIdService,
    private store: Store<StateWithMultiCart>
  ) {}
}
