import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import {
  CartActions,
  CartConnector,
  getCartIdByUserId,
  MultiCartSelectors,
  SaveCartConnector,
  StateWithMultiCart,
} from '@spartacus/cart/main/core';
import { Cart, CartType } from '@spartacus/cart/main/root';
import {
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
import { getWishlistName } from '../../utils/utils';
import { WishListActions } from '../actions';

@Injectable()
export class WishListEffects {
  @Effect()
  createWishList$: Observable<
    | WishListActions.CreateWishListSuccess
    | WishListActions.CreateWishListFail
    | CartActions.LoadCartSuccess
  > = this.actions$.pipe(
    ofType(WishListActions.CREATE_WISH_LIST),
    map((action: WishListActions.CreateWishList) => action.payload),
    switchMap((payload) => {
      return this.cartConnector.create(payload.userId).pipe(
        switchMap((cart) => {
          return this.saveCartConnector
            .saveCart(
              payload.userId,
              cart.code ?? '',
              payload.name,
              payload.description
            )
            .pipe(
              switchMap((saveCartResult) => [
                new WishListActions.CreateWishListSuccess({
                  cart: saveCartResult.savedCartData as Cart,
                  userId: payload.userId,
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
      const { userId, customerId, tempCartId } = payload;
      return this.cartConnector.loadAll(userId).pipe(
        switchMap((carts) => {
          const wishList = carts.find(
            (cart) => cart.name === getWishlistName(customerId)
          );
          if (wishList) {
            return [
              new WishListActions.LoadWishListSuccess({
                cart: wishList,
                userId,
                tempCartId,
                customerId,
                cartId: getCartIdByUserId(wishList, userId),
              }),
              new CartActions.RemoveCart({ cartId: tempCartId }),
            ];
          } else {
            return [
              new WishListActions.CreateWishList({
                userId,
                name: getWishlistName(customerId),
              }),
            ];
          }
        }),
        catchError((error) =>
          from([
            new WishListActions.LoadWishListFail({
              userId,
              cartId: tempCartId,
              customerId,
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
              userId,
              cartId: getCartIdByUserId(wishList, userId),
            }),
          ]),
          catchError((error) =>
            from([
              new WishListActions.LoadWishListFail({
                userId,
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
  setWishListId$: Observable<CartActions.SetCartTypeIndex | undefined> =
    this.actions$.pipe(
      ofType(
        WishListActions.CREATE_WISH_LIST_SUCCESS,
        WishListActions.LOAD_WISH_LIST_SUCCESS,
        CartActions.CLEAR_CART_STATE
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
          case CartActions.CLEAR_CART_STATE:
            return new CartActions.SetCartTypeIndex({
              cartType: CartType.WISH_LIST,
              cartId: '',
            });
        }
      })
    );

  @Effect()
  setWishListData$: Observable<CartActions.SetCartData | undefined> =
    this.actions$.pipe(
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
            });
          }
        }
      })
    );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private saveCartConnector: SaveCartConnector,
    private userIdService: UserIdService,
    private store: Store<StateWithMultiCart>
  ) {}
}
