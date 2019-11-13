import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { SaveCartConnector } from '../../connectors/save-cart/save-cart.connecter';
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

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private saveCartConnector: SaveCartConnector
  ) {}
}
