/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LoggerService,
  SiteContextActions,
  normalizeHttpError,
} from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UnitOrderConnector } from '../../connectors/unit-order.connector';
import { UnitOrderActions } from '../actions';

@Injectable()
export class UnitOrderEffect {
  protected logger = inject(LoggerService);

  constructor(
    private actions$: Actions,
    private orderConnector: UnitOrderConnector
  ) {}

  loadUnitOrders$: Observable<UnitOrderActions.UnitOrdersAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitOrderActions.LOAD_UNIT_ORDERS),
        map((action: UnitOrderActions.LoadUnitOrders) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .getUnitOrderHistory(
              payload.userId,
              payload.pageSize,
              payload.currentPage,
              payload.filters,
              payload.sort
            )
            .pipe(
              map((orders: OrderHistoryList) => {
                return new UnitOrderActions.LoadUnitOrdersSuccess(orders);
              }),
              catchError((error) =>
                of(
                  new UnitOrderActions.LoadUnitOrdersFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
  );

  resetUserOrders$: Observable<UnitOrderActions.ClearUnitOrders> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SiteContextActions.LANGUAGE_CHANGE),
        map(() => {
          return new UnitOrderActions.ClearUnitOrders();
        })
      )
  );

  loadOrderDetails$: Observable<UnitOrderActions.UnitOrdersAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UnitOrderActions.LOAD_ORDER_DETAILS),
        map((action: UnitOrderActions.LoadOrderDetails) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .getUnitOrderDetail(payload.userId, payload.orderCode)
            .pipe(
              map((order: Order) => {
                return new UnitOrderActions.LoadOrderDetailsSuccess(order);
              }),
              catchError((error) =>
                of(
                  new UnitOrderActions.LoadOrderDetailsFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );
}
