/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartModification } from '@spartacus/cart/base/root';
import {
  LoggerService,
  SiteContextActions,
  normalizeHttpError,
  withdrawOn,
} from '@spartacus/core';
import { Observable, from } from 'rxjs';
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

  protected logger = inject(LoggerService);

  addEntry$: Observable<
    | CartActions.CartAddEntrySuccess
    | CartActions.CartAddEntryFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_ADD_ENTRY),
      map((action: CartActions.CartAddEntry) => action.payload),
      concatMap((payload) => {
        return this.cartEntryConnector
          .add(
            payload.userId,
            payload.cartId,
            payload.productCode,
            payload.quantity,
            payload.pickupStore
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
                  error: normalizeHttpError(error, this.logger),
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
                  error: normalizeHttpError(error, this.logger),
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
        this.cartEntryConnector
          .update(
            payload.userId,
            payload.cartId,
            payload.entryNumber,
            payload.quantity,
            payload.pickupStore,
            payload.pickupToDelivery
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
                  error: normalizeHttpError(error, this.logger),
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
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
