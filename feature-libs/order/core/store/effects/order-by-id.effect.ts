/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderByIdEffect {
  protected logger = inject(LoggerService);
  protected actions$ = inject(Actions);
  protected orderConnector = inject(OrderHistoryConnector);
  loadOrderById$: Observable<
    OrderActions.LoadOrderByIdSuccess | OrderActions.LoadOrderByIdFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.LOAD_ORDER_BY_ID),
      map((action: OrderActions.LoadOrderById) => action.payload),
      mergeMap(({ userId, code }) => {
        return this.orderConnector.get(userId, code).pipe(
          map((order: Order) => {
            return new OrderActions.LoadOrderByIdSuccess(order);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              new OrderActions.LoadOrderByIdFail({
                code,
                error: tryNormalizeHttpError(error, this.logger),
              })
            );
          })
        );
      })
    )
  );
}
