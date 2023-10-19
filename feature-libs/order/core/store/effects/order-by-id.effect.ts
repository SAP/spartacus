/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderByIdEffect {
  protected actions$ = inject(Actions);
  protected orderConnector = inject(OrderHistoryConnector);
  loadOrderById$: Observable<
    OrderActions.LoadOrderByIdSuccess | OrderActions.LoadOrderByIdFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.LOAD_ORDER_BY_ID),
      map((action: OrderActions.LoadOrderById) => action.payload),
      concatMap(({ userId, code }) => {
        return this.orderConnector.get(userId, code).pipe(
          map((order: Order) => {
            return new OrderActions.LoadOrderByIdSuccess(order);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              new OrderActions.LoadOrderByIdFail({
                code,
                error: normalizeHttpError(error),
              })
            );
          })
        );
      })
    )
  );
}
