import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
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
  > = this.actions$.pipe(
    ofType(CartActions.CART_ADD_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    tap(() => this.cartEntriesToAddCounter++),
    concatMap(payload => {
      return this.cartEntryConnector
        .add(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          tap(() => this.cartEntriesToAddCounter--),
          map(
            (entry: any) =>
              new CartActions.CartAddEntrySuccess({
                ...entry,
                userId: payload.userId,
                cartId: payload.cartId,
              })
          ),
          catchError(error =>
            of(new CartActions.CartAddEntryFail(makeErrorSerializable(error)))
          )
        );
    })
    // mergeMap(result => {
    //   if (this.cartEntriesToAddCounter === 0) {
    //     const payload = result.payload;
    //     return [
    //       result,
    //       new DeprecatedCartActions.LoadCart({
    //         userId: payload.userId,
    //         cartId: payload.cartId,
    //         extraData: {
    //           addEntries: true,
    //         },
    //       }),
    //     ];
    //   }
    //   return [result];
    // })
  );

  @Effect()
  removeEntry$: Observable<
    CartActions.CartRemoveEntrySuccess | CartActions.CartRemoveEntryFail
  > = this.actions$.pipe(
    ofType(CartActions.CART_REMOVE_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    mergeMap(payload =>
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
            of(
              new CartActions.CartRemoveEntryFail(makeErrorSerializable(error))
            )
          )
        )
    )
  );

  @Effect()
  updateEntry$: Observable<
    CartActions.CartUpdateEntrySuccess | CartActions.CartUpdateEntryFail
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
            of(
              new CartActions.CartUpdateEntryFail(makeErrorSerializable(error))
            )
          )
        )
    )
  );

  private cartEntriesToAddCounter = 0;

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
