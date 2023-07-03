/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { ReturnRequest, ReturnRequestList } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderReturnRequestEffect {
  protected logger = inject(LoggerService);

  createReturnRequest$: Observable<OrderActions.OrderReturnRequestAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.CREATE_ORDER_RETURN_REQUEST),
        map((action: OrderActions.CreateOrderReturnRequest) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .return(payload.userId, payload.returnRequestInput)
            .pipe(
              map(
                (returnRequest: ReturnRequest) =>
                  new OrderActions.CreateOrderReturnRequestSuccess(
                    returnRequest
                  )
              ),
              catchError((error) =>
                of(
                  new OrderActions.CreateOrderReturnRequestFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );

  loadReturnRequest$: Observable<OrderActions.OrderReturnRequestAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_ORDER_RETURN_REQUEST),
        map((action: OrderActions.LoadOrderReturnRequest) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .getReturnRequestDetail(payload.userId, payload.returnRequestCode)
            .pipe(
              map(
                (returnRequest: ReturnRequest) =>
                  new OrderActions.LoadOrderReturnRequestSuccess(returnRequest)
              ),
              catchError((error) =>
                of(
                  new OrderActions.LoadOrderReturnRequestFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );

  cancelReturnRequest$: Observable<OrderActions.OrderReturnRequestAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.CANCEL_ORDER_RETURN_REQUEST),
        map((action: OrderActions.CancelOrderReturnRequest) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .cancelReturnRequest(
              payload.userId,
              payload.returnRequestCode,
              payload.returnRequestModification
            )
            .pipe(
              map(() => new OrderActions.CancelOrderReturnRequestSuccess()),
              catchError((error) =>
                of(
                  new OrderActions.CancelOrderReturnRequestFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );

  loadReturnRequestList$: Observable<OrderActions.OrderReturnRequestAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST),
        map(
          (action: OrderActions.LoadOrderReturnRequestList) => action.payload
        ),
        switchMap((payload) => {
          return this.orderConnector
            .getReturnRequestList(
              payload.userId,
              payload.pageSize,
              payload.currentPage,
              payload.sort
            )
            .pipe(
              map(
                (returnRequestList: ReturnRequestList) =>
                  new OrderActions.LoadOrderReturnRequestListSuccess(
                    returnRequestList
                  )
              ),
              catchError((error) =>
                of(
                  new OrderActions.LoadOrderReturnRequestListFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );

  constructor(
    private actions$: Actions,
    private orderConnector: OrderHistoryConnector
  ) {}
}
