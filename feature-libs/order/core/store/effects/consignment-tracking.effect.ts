import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderConnector } from '../../connectors/order.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class ConsignmentTrackingEffects {
  @Effect()
  loadConsignmentTracking$: Observable<OrderActions.ConsignmentTrackingAction> =
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
    );

  constructor(
    private actions$: Actions,
    private orderConnector: OrderConnector
  ) {}
}
