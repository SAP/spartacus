/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderDetailsEffect {
  loadOrderDetails$: Observable<OrderActions.OrderDetailsAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_ORDER_DETAILS),
        map((action: OrderActions.LoadOrderDetails) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .get(payload.userId, payload.orderCode)
            .pipe(
              map((order: Order) => {
                return new OrderActions.LoadOrderDetailsSuccess(order);
              }),
              catchError((error) =>
                of(
                  new OrderActions.LoadOrderDetailsFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
  );

  cancelOrder$: Observable<OrderActions.OrderDetailsAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.CANCEL_ORDER),
      map((action: OrderActions.CancelOrder) => action.payload),
      switchMap((payload) => {
        return this.orderConnector
          .cancel(payload.userId, payload.orderCode, payload.cancelRequestInput)
          .pipe(
            map(() => new OrderActions.CancelOrderSuccess()),
            catchError((error) => {
              error.error?.errors.forEach((err: any) =>
                this.globalMessageService.add(
                  err.message,
                  GlobalMessageType.MSG_TYPE_ERROR
                )
              );

              return of(
                new OrderActions.CancelOrderFail(normalizeHttpError(error))
              );
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private orderConnector: OrderHistoryConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
