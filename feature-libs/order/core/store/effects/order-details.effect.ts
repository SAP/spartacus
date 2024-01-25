/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  GlobalMessageService,
  GlobalMessageType,
  LoggerService,
  SiteContextActions,
  UserIdService,
  normalizeHttpError,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import { StateWithOrder } from '../order-state';

@Injectable()
export class OrderDetailsEffect {
  protected logger = inject(LoggerService);

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
                    normalizeHttpError(error, this.logger)
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
                new OrderActions.CancelOrderFail(
                  normalizeHttpError(error, this.logger)
                )
              );
            })
          );
      })
    )
  );

  resetOrderDetails$: Observable<
    OrderActions.LoadOrderDetailsSuccess | OrderActions.LoadOrderDetailsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SiteContextActions.LANGUAGE_CHANGE,
        SiteContextActions.CURRENCY_CHANGE
      ),
      withLatestFrom(
        this.userIdService.getUserId(),
        this.store.pipe(
          filter((store) => !!store.order?.orderDetail),
          map((state) => state.order.orderDetail.value?.code)
        )
      ),
      switchMap(([, userId, orderCode]) => {
        if (orderCode) {
          return this.orderConnector.get(userId, orderCode).pipe(
            map((order: Order) => {
              return new OrderActions.LoadOrderDetailsSuccess(order);
            }),
            catchError((error) =>
              of(
                new OrderActions.LoadOrderDetailsFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          );
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private orderConnector: OrderHistoryConnector,
    private globalMessageService: GlobalMessageService,
    private userIdService: UserIdService,
    private store: Store<StateWithOrder>
  ) {}
}
