/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { ReplenishmentOrder } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReplenishmentOrderHistoryConnector } from '../../connectors/replenishment-order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class ReplenishmentOrderDetailsEffect {
  protected logger = inject(LoggerService);

  loadReplenishmentOrderDetails$: Observable<OrderActions.ReplenishmentOrderDetailsAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS),
        map(
          (action: OrderActions.LoadReplenishmentOrderDetails) => action.payload
        ),
        switchMap((payload) => {
          return this.replenishmentOrderConnector
            .load(payload.userId, payload.replenishmentOrderCode)
            .pipe(
              map((replenishmentOrder: ReplenishmentOrder) => {
                return new OrderActions.LoadReplenishmentOrderDetailsSuccess(
                  replenishmentOrder
                );
              }),
              catchError((error) =>
                of(
                  new OrderActions.LoadReplenishmentOrderDetailsFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );

  cancelReplenishmentOrder$: Observable<OrderActions.ReplenishmentOrderDetailsAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.CANCEL_REPLENISHMENT_ORDER),
        map((action: OrderActions.CancelReplenishmentOrder) => action.payload),
        switchMap((payload) => {
          return this.replenishmentOrderConnector
            .cancelReplenishmentOrder(
              payload.userId,
              payload.replenishmentOrderCode
            )
            .pipe(
              map(
                (replenishmentOrder: ReplenishmentOrder) =>
                  new OrderActions.CancelReplenishmentOrderSuccess(
                    replenishmentOrder
                  )
              ),
              catchError((error) => {
                error?.error?.errors.forEach((err: any) =>
                  this.globalMessageService.add(
                    err.message,
                    GlobalMessageType.MSG_TYPE_ERROR
                  )
                );

                return of(
                  new OrderActions.CancelReplenishmentOrderFail(
                    normalizeHttpError(error, this.logger)
                  )
                );
              })
            );
        })
      )
    );

  constructor(
    private actions$: Actions,
    private replenishmentOrderConnector: ReplenishmentOrderHistoryConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
