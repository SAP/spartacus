/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GlobalMessageService,
  GlobalMessageType,
  LoggerService,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartVoucherConnector } from '../../connectors/voucher/cart-voucher.connector';
import { CartActions } from '../actions/index';

@Injectable()
export class CartVoucherEffects {
  protected logger = inject(LoggerService);

  constructor(
    private actions$: Actions,
    private cartVoucherConnector: CartVoucherConnector,
    private messageService: GlobalMessageService
  ) {}

  addCartVoucher$: Observable<
    | CartActions.CartVoucherAction
    | CartActions.LoadCart
    | CartActions.CartProcessesDecrement
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_ADD_VOUCHER),
      map((action: CartActions.CartAddVoucher) => action.payload),
      mergeMap((payload) => {
        return this.cartVoucherConnector
          .add(payload.userId, payload.cartId, payload.voucherId)
          .pipe(
            map(() => {
              this.showGlobalMessage(
                'voucher.applyVoucherSuccess',
                payload.voucherId,
                GlobalMessageType.MSG_TYPE_CONFIRMATION
              );
              return new CartActions.CartAddVoucherSuccess({
                ...payload,
              });
            }),
            catchError((error) =>
              from([
                new CartActions.CartAddVoucherFail({
                  ...payload,
                  error: normalizeHttpError(error, this.logger),
                }),
                new CartActions.CartProcessesDecrement(payload.cartId),
                new CartActions.LoadCart({
                  userId: payload.userId,
                  cartId: payload.cartId,
                }),
              ])
            )
          );
      })
    )
  );

  removeCartVoucher$: Observable<
    CartActions.CartVoucherAction | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_REMOVE_VOUCHER),
      map((action: CartActions.CartRemoveVoucher) => action.payload),
      mergeMap((payload) => {
        return this.cartVoucherConnector
          .remove(payload.userId, payload.cartId, payload.voucherId)
          .pipe(
            map(() => {
              this.showGlobalMessage(
                'voucher.removeVoucherSuccess',
                payload.voucherId,
                GlobalMessageType.MSG_TYPE_INFO
              );
              return new CartActions.CartRemoveVoucherSuccess({
                userId: payload.userId,
                cartId: payload.cartId,
                voucherId: payload.voucherId,
              });
            }),
            catchError((error) =>
              from([
                new CartActions.CartRemoveVoucherFail({
                  error: normalizeHttpError(error, this.logger),
                  cartId: payload.cartId,
                  userId: payload.userId,
                  voucherId: payload.voucherId,
                }),
                new CartActions.LoadCart({
                  userId: payload.userId,
                  cartId: payload.cartId,
                }),
              ])
            )
          );
      })
    )
  );

  private showGlobalMessage(
    text: string,
    param: string,
    messageType: GlobalMessageType
  ) {
    this.messageService.add(
      { key: text, params: { voucherCode: param } },
      messageType
    );
  }
}
