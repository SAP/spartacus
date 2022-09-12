/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError, SiteContextActions } from '@commerce-storefront-toolset/core';
import { OrderHistoryList } from '@commerce-storefront-toolset/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  OrderHistoryConnector,
  ReplenishmentOrderHistoryConnector,
} from '../../connectors/index';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrdersEffect {
  constructor(
    private actions$: Actions,
    private orderConnector: OrderHistoryConnector,
    private replenishmentOrderConnector: ReplenishmentOrderHistoryConnector
  ) {}

  loadUserOrders$: Observable<OrderActions.UserOrdersAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_USER_ORDERS),
        map((action: OrderActions.LoadUserOrders) => action.payload),
        switchMap((payload) => {
          return (
            Boolean(payload.replenishmentOrderCode)
              ? this.replenishmentOrderConnector.loadReplenishmentDetailsHistory(
                  payload.userId,
                  payload.replenishmentOrderCode ?? '',
                  payload.pageSize,
                  payload.currentPage,
                  payload.sort
                )
              : this.orderConnector.getHistory(
                  payload.userId,
                  payload.pageSize,
                  payload.currentPage,
                  payload.sort
                )
          ).pipe(
            map((orders: OrderHistoryList) => {
              return new OrderActions.LoadUserOrdersSuccess(orders);
            }),
            catchError((error) =>
              of(new OrderActions.LoadUserOrdersFail(normalizeHttpError(error)))
            )
          );
        })
      )
  );

  resetUserOrders$: Observable<OrderActions.ClearUserOrders> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SiteContextActions.LANGUAGE_CHANGE),
        map(() => {
          return new OrderActions.ClearUserOrders();
        })
      )
  );
}
