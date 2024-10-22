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
  tryNormalizeHttpError,
  withdrawOn,
} from '@spartacus/core';
import { Observable, from } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { CartEntryGroupConnector } from '../../connectors/entrygroup/cart-entrygroup.connector';
import { CartActions } from '../actions/index';

@Injectable()
export class CartEntryGroupEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  protected logger = inject(LoggerService);

  removeEntryGroup$: Observable<
    | CartActions.CartRemoveEntryGroupSuccess
    | CartActions.CartRemoveEntryGroupFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_REMOVE_ENTRYGROUP),
      map((action: CartActions.CartRemoveEntryGroup) => action.payload),
      tap((payload) => {
        this.logger.log(`remove bundle payload is ${JSON.stringify(payload)}`);
      }),
      concatMap((payload) =>
        this.cartEntryGroupConnector
          .remove(payload.userId, payload.cartId, payload.entryGroupNumber)
          .pipe(
            map(() => {
              return new CartActions.CartRemoveEntryGroupSuccess({
                ...payload,
              });
            }),
            catchError((error) =>
              from([
                new CartActions.CartRemoveEntryGroupFail({
                  ...payload,
                  error: tryNormalizeHttpError(error, this.logger),
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

  addToEntryGroup$: Observable<
    | CartActions.CartAddToEntryGroupSuccess
    | CartActions.CartAddToEntryGroupFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_ADD_TO_ENTRYGROUP),
      map((action: CartActions.CartAddToEntryGroup) => action.payload),
      concatMap((payload) => {
        return this.cartEntryGroupConnector
          .addTo(
            payload.userId,
            payload.cartId,
            payload.entryGroupNumber,
            payload.productCode,
            payload.quantity
          )
          .pipe(
            map(
              (cartModification: CartModification) =>
                new CartActions.CartAddToEntryGroupSuccess({
                  ...payload,
                  ...(cartModification as Required<CartModification>),
                })
            ),
            catchError((error) =>
              from([
                new CartActions.CartAddToEntryGroupFail({
                  ...payload,
                  error: tryNormalizeHttpError(error, this.logger),
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

  constructor(
    private actions$: Actions,
    private cartEntryGroupConnector: CartEntryGroupConnector
  ) {}
}
