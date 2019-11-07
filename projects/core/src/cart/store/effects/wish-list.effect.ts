import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { CartConnector } from '../../connectors';
import { SaveCartConnector } from '../../connectors/save-cart';
import { CartActions } from '../actions';

@Injectable()
export class WishListEffects {
  @Effect()
  createWishList: Observable<
    CartActions.CreateWishListSuccess | CartActions.CreateWishListFail
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_WISH_LIST),
    map((action: CartActions.CreateWishList) => action.payload),
    concatMap(payload => {
      return this.cartConnector.create(payload.userId).pipe(
        mergeMap(cart => {
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
