/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  normalizeHttpError,
  SiteContextActions,
  withdrawOn,
} from '@spartacus/core';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
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

  addEntry$: Observable<
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_ADD_ENTRY),
      map((action: CartActions.CartAddEntry) => action.payload),
      concatMap((payload) => {
        return this.cartEntryConnector.add(payload.options).pipe(
          map(
            (cartModification) =>
              new CartActions.CartAddEntrySuccess({
                result: cartModification,
                ...payload,
              })
          ),
          catchError((error) =>
            from([
              new CartActions.CartAddEntryFail({
                error: normalizeHttpError(error),
                ...payload,
              }),
              new CartActions.LoadCart({
                cartId: payload.options.cartId,
                userId: payload.options.userId,
              }),
            ])
          )
        );
      }),
      withdrawOn(this.contextChange$)
    )
  );

  removeEntry$: Observable<
    | CartActions.CartRemoveEntrySuccess
    | CartActions.CartRemoveEntryFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_REMOVE_ENTRY),
      map((action: CartActions.CartRemoveEntry) => action.payload),
      concatMap((payload) =>
        this.cartEntryConnector.remove(payload.options).pipe(
          map(() => new CartActions.CartRemoveEntrySuccess(payload)),
          catchError((error) =>
            from([
              new CartActions.CartRemoveEntryFail({
                ...payload,
                error: normalizeHttpError(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.options.cartId,
                userId: payload.options.userId,
              }),
            ])
          )
        )
      ),
      withdrawOn(this.contextChange$)
    )
  );

  updateEntry$: Observable<
    | CartActions.CartUpdateEntrySuccess
    | CartActions.CartUpdateEntryFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_UPDATE_ENTRY),
      map((action: CartActions.CartUpdateEntry) => action.payload),
      concatMap((payload) =>
        this.cartEntryConnector.update(payload.options).pipe(
          map(() => new CartActions.CartUpdateEntrySuccess(payload)),
          catchError((error) =>
            from([
              new CartActions.CartUpdateEntryFail({
                ...payload,
                error: normalizeHttpError(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.options.cartId,
                userId: payload.options.userId,
              }),
            ])
          )
        )
      ),
      withdrawOn(this.contextChange$)
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
