import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CartModification } from '../../../model/cart.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { withdrawOn } from '../../../util/rxjs/withdraw-on';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import { CartActions } from '../actions/index';

@Injectable()
export class CartEntryEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  @Effect()
  addEntry$: Observable<
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CART_ADD_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    concatMap((payload) => {
      return this.cartEntryConnector
        .add(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          map(
            (cartModification: CartModification) =>
              new CartActions.CartAddEntrySuccess({
                ...payload,
                ...(cartModification as Required<CartModification>),
              })
          ),
          catchError((error) =>
            from([
              new CartActions.CartAddEntryFail({
                ...payload,
                error: normalizeHttpError(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  removeEntry$: Observable<
    | CartActions.CartRemoveEntrySuccess
    | CartActions.CartRemoveEntryFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CART_REMOVE_ENTRY),
    map((action: CartActions.CartRemoveEntry) => action.payload),
    concatMap((payload) =>
      this.cartEntryConnector
        .remove(payload.userId, payload.cartId, payload.entryNumber)
        .pipe(
          map(() => {
            return new CartActions.CartRemoveEntrySuccess({
              ...payload,
            });
          }),
          catchError((error) =>
            from([
              new CartActions.CartRemoveEntryFail({
                ...payload,
                error: normalizeHttpError(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        )
    ),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  updateEntry$: Observable<
    | CartActions.CartUpdateEntrySuccess
    | CartActions.CartUpdateEntryFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CART_UPDATE_ENTRY),
    map((action: CartActions.CartUpdateEntry) => action.payload),
    concatMap((payload) =>
      this.cartEntryConnector
        .update(
          payload.userId,
          payload.cartId,
          payload.entryNumber,
          payload.quantity
        )
        .pipe(
          map(() => {
            return new CartActions.CartUpdateEntrySuccess({
              ...payload,
            });
          }),
          catchError((error) =>
            from([
              new CartActions.CartUpdateEntryFail({
                ...payload,
                error: normalizeHttpError(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        )
    ),
    withdrawOn(this.contextChange$)
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
