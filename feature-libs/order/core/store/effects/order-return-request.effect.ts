/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { ReturnRequest, ReturnRequestList } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderReturnRequestEffect {
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
                    normalizeHttpError(error)
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
                    normalizeHttpError(error)
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
                    normalizeHttpError(error)
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
                    normalizeHttpError(error)
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
