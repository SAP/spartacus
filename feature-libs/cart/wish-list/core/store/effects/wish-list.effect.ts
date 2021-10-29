import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  CartActions,
  CartConnector,
  SaveCartConnector,
  StateWithMultiCart,
} from '@spartacus/cart/main/core';
import { Cart } from '@spartacus/cart/main/root';
import {
  normalizeHttpError,
  SiteContextActions,
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
import { getCartIdByUserId, getWishlistName } from '../../utils/utils';
import { WishListActions } from '../actions';
import { WishListSelectors } from '../selectors';

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
                new CartActions.LoadCartSuccess({
                  userId: payload.userId,
                  cartId: getCartIdByUserId(
                    saveCartResult.savedCartData,
                    payload.userId
                  ),
                  cart: saveCartResult.savedCartData as Cart,
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
    | CartActions.LoadCartSuccess
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
              new CartActions.LoadCartSuccess({
                userId,
                cartId: getCartIdByUserId(wishList, userId),
                cart: wishList,
              }),
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
    | WishListActions.LoadWishListSuccess
    | WishListActions.LoadWishListFail
    | CartActions.LoadCartSuccess
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    withLatestFrom(
      this.userIdService.getUserId(),
      this.store.pipe(
        filter((store) => !!store.cart),
        select(WishListSelectors.getWishListId)
      )
    ),
    switchMap(([, userId, wishListId]) => {
      if (Boolean(wishListId)) {
        return this.cartConnector.load(userId, wishListId).pipe(
          switchMap((wishList) => [
            new CartActions.LoadCartSuccess({
              userId,
              cartId: getCartIdByUserId(wishList, userId),
              cart: wishList ?? {},
            }),
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

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private saveCartConnector: SaveCartConnector,
    private userIdService: UserIdService,
    private store: Store<StateWithMultiCart>
  ) {}
}
