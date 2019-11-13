import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../../auth/facade/auth.service';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { SaveCartConnector } from '../../connectors/save-cart/save-cart.connecter';
import { WishListService } from '../../facade/wish-list.service';
import { CartActions } from '../actions';

@Injectable()
export class WishListEffects {
  @Effect()
  createWishList$: Observable<
    CartActions.CreateWishListSuccess | CartActions.CreateWishListFail
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_WISH_LIST),
    map((action: CartActions.CreateWishList) => action.payload),
    switchMap(payload => {
      return this.cartConnector.create(payload.userId).pipe(
        switchMap(cart => {
          return this.saveCartConnector
            .saveCart(
              payload.userId,
              cart.code,
              payload.name,
              payload.description
            )
            .pipe(
              switchMap(saveCartResult => [
                new CartActions.CreateWishListSuccess({
                  cart: saveCartResult.savedCartData,
                  userId: payload.userId,
                }),
              ]),
              catchError(error =>
                from([
                  new CartActions.CreateWishListFail({
                    cartId: cart.code,
                    error,
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
    | CartActions.LoadWisthListSuccess
    | CartActions.CreateWishList
    | CartActions.LoadCartFail
  > = this.actions$.pipe(
    ofType(CartActions.LOAD_WISH_LIST),
    map((action: CartActions.LoadWisthList) => action.payload),
    concatMap(userId => {
      return this.cartConnector.loadAll(userId).pipe(
        switchMap(carts => {
          if (carts) {
            const wishList = carts.find(cart => cart.name === 'wishlist');
            if (Boolean(wishList)) {
              return [
                new CartActions.LoadWisthListSuccess({
                  cart: wishList,
                  userId,
                }),
              ];
            } else {
              return [
                new CartActions.CreateWishList({ userId, name: 'wishlist' }),
              ];
            }
          }
        }),
        catchError(error => from([new CartActions.LoadCartFail(error)]))
      );
    })
  );

  @Effect()
  resetWishList$: Observable<
    CartActions.ResetWishListDetails
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    switchMap(() => [new CartActions.ResetWishListDetails()])
  );

  @Effect()
  getWishList$: Observable<
    CartActions.LoadWisthListSuccess | CartActions.LoadCartFail
  > = this.actions$.pipe(
    ofType(CartActions.RESET_WISH_LIST_DETAILS),
    withLatestFrom(
      this.authService.getOccUserId(),
      this.wishListService.getWishListId()
    ),
    switchMap(([, userId, wishListId]) => {
      if (Boolean(wishListId)) {
        return this.cartConnector.load(userId, wishListId).pipe(
          switchMap(wishList => [
            new CartActions.LoadWisthListSuccess({ cart: wishList, userId }),
          ]),
          catchError(error => from([new CartActions.LoadCartFail(error)]))
        );
      }
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private saveCartConnector: SaveCartConnector,
    private wishListService: WishListService,
    private authService: AuthService
  ) {}
}
