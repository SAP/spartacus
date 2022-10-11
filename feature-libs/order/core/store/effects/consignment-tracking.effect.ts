/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class ConsignmentTrackingEffects {
  loadConsignmentTracking$: Observable<OrderActions.ConsignmentTrackingAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_CONSIGNMENT_TRACKING),
        map((action: OrderActions.LoadConsignmentTracking) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .getConsignmentTracking(
              payload.orderCode,
              payload.consignmentCode,
              payload.userId
            )
            .pipe(
              map(
                (tracking: ConsignmentTracking) =>
                  new OrderActions.LoadConsignmentTrackingSuccess(tracking)
              ),
              catchError((error) =>
                of(
                  new OrderActions.LoadConsignmentTrackingFail(
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
