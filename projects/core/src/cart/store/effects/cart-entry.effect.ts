import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import { CartActions } from './../actions/index';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<Action> = this.actions$.pipe(
    ofType(CartActions.CART_ADD_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .add(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          map(entry => new CartActions.CartAddEntrySuccess(entry)),
          catchError(error => of(new CartActions.CartAddEntryFail(error)))
        )
    )
  );

  @Effect()
  removeEntry$: Observable<Action> = this.actions$.pipe(
    ofType(CartActions.CART_REMOVE_ENTRY),
    map((action: CartActions.CartRemoveEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .remove(payload.userId, payload.cartId, payload.entry)
        .pipe(
          map(() => {
            return new CartActions.CartRemoveEntrySuccess();
          }),
          catchError(error => of(new CartActions.CartRemoveEntryFail(error)))
        )
    )
  );

  @Effect()
  updateEntry$: Observable<Action> = this.actions$.pipe(
    ofType(CartActions.CART_UPDATE_ENTRY),
    map((action: CartActions.CartUpdateEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .update(payload.userId, payload.cartId, payload.entry, payload.qty)
        .pipe(
          map(() => {
            return new CartActions.CartUpdateEntrySuccess();
          }),
          catchError(error => of(new CartActions.CartUpdateEntryFail(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
