import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { UserIdService } from '../../../auth/user-auth/facade/user-id.service';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { SaveCartConnector } from '../../connectors/save-cart/save-cart.connecter';
import { getCartIdByUserId, getWishlistName } from '../../utils/utils';
import { CartActions } from '../actions';
import { StateWithMultiCart } from '../multi-cart-state';
import { MultiCartSelectors } from '../selectors';

@Injectable()
export class WishListEffects {
  @Effect()
  createWishList$: Observable<
    CartActions.CreateWishListSuccess | CartActions.CreateWishListFail
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_WISH_LIST),
    map((action: CartActions.CreateWishList) => action.payload),
    switchMap((payload) => {
      return this.cartConnector.create(payload.userId).pipe(
        switchMap((cart) => {
          return this.saveCartConnector
            .saveCart(
              payload.userId,
              cart.code,
              payload.name,
              payload.description
            )
            .pipe(
              switchMap((saveCartResult) => [
                new CartActions.CreateWishListSuccess({
                  cart: saveCartResult.savedCartData,
                  userId: payload.userId,
                }),
              ]),
              catchError((error) =>
                from([
                  new CartActions.CreateWishListFail({
                    cartId: cart.code,
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
    | CartActions.LoadWishListSuccess
    | CartActions.RemoveCart
    | CartActions.CreateWishList
    | CartActions.LoadWishListFail
  > = this.actions$.pipe(
    ofType(CartActions.LOAD_WISH_LIST),
    map((action: CartActions.LoadWishList) => action.payload),
    concatMap((payload) => {
      const { userId, customerId, tempCartId } = payload;
      return this.cartConnector.loadAll(userId).pipe(
        switchMap((carts) => {
          if (carts) {
            const wishList = carts.find(
              (cart) => cart.name === getWishlistName(customerId)
            );
            if (Boolean(wishList)) {
              return [
                new CartActions.LoadWishListSuccess({
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
                new CartActions.CreateWishList({
                  userId,
                  name: getWishlistName(customerId),
                }),
              ];
            }
          }
        }),
        catchError((error) =>
          from([
            new CartActions.LoadWishListFail({
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
    CartActions.LoadWishListSuccess | CartActions.LoadWishListFail
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    withLatestFrom(
      this.userIdService.getUserId(),
      this.store.pipe(select(MultiCartSelectors.getWishListId))
    ),
    switchMap(([, userId, wishListId]) => {
      if (Boolean(wishListId)) {
        return this.cartConnector.load(userId, wishListId).pipe(
          switchMap((wishList) => [
            new CartActions.LoadWishListSuccess({
              cart: wishList,
              userId,
              cartId: getCartIdByUserId(wishList, userId),
            }),
          ]),
          catchError((error) =>
            from([
              new CartActions.LoadWishListFail({
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
