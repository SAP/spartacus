import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import * as DeprecatedCartActions from '../actions/cart.action';
import { CartActions } from '../actions/index';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
    | DeprecatedCartActions.LoadCart
    | CartActions.CartProcessesDecrement
  > = this.actions$.pipe(
    ofType(CartActions.CART_ADD_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    concatMap(payload => {
      return this.cartEntryConnector
        .add(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          map(
            (entry: any) =>
              new CartActions.CartAddEntrySuccess({
                ...entry,
                userId: payload.userId,
                cartId: payload.cartId,
              })
          ),
          catchError(error =>
            from([
              new CartActions.CartAddEntryFail(makeErrorSerializable(error)),
              new CartActions.CartProcessesDecrement(payload.cartId),
              new DeprecatedCartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        );
    })
  );

  @Effect()
  removeEntry$: Observable<
    | CartActions.CartRemoveEntrySuccess
    | CartActions.CartRemoveEntryFail
    | CartActions.CartProcessesDecrement
    | DeprecatedCartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CART_REMOVE_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    concatMap(payload =>
      this.cartEntryConnector
        .remove(payload.userId, payload.cartId, payload.entry)
        .pipe(
          map(() => {
            return new CartActions.CartRemoveEntrySuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
          }),
          catchError(error =>
            from([
              new CartActions.CartRemoveEntryFail(makeErrorSerializable(error)),
              new CartActions.CartProcessesDecrement(payload.cartId),
              new DeprecatedCartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        )
    )
  );

  @Effect()
  updateEntry$: Observable<
    | CartActions.CartUpdateEntrySuccess
    | CartActions.CartUpdateEntryFail
    | CartActions.CartProcessesDecrement
    | DeprecatedCartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CART_UPDATE_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    concatMap(payload =>
      this.cartEntryConnector
        .update(payload.userId, payload.cartId, payload.entry, payload.qty)
        .pipe(
          map(() => {
            return new CartActions.CartUpdateEntrySuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
          }),
          catchError(error =>
            from([
              new CartActions.CartUpdateEntryFail(makeErrorSerializable(error)),
              new CartActions.CartProcessesDecrement(payload.cartId),
              new DeprecatedCartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
