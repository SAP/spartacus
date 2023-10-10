import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors';
import { OrderActions } from '../actions';

@Injectable()
export class ConsignmentTrackingByIdEffects {
  protected actions$ = inject(Actions);
  protected orderConnector = inject(OrderHistoryConnector);
  loadConsignmentTrackingByID$: Observable<OrderActions.ConsignmentTrackingByIDAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(OrderActions.LOAD_CONSIGNMENT_TRACKING_BY_ID),
        map(
          (action: OrderActions.LoadConsignmentTrackingByID) => action.payload
        ),
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
                  new OrderActions.LoadConsignmentTrackingByIDSuccess({
                    orderCode: payload.orderCode,
                    consignmentCode: payload.consignmentCode,
                    consignmentTracking: tracking,
                  })
              ),
              catchError((error) =>
                of(
                  new OrderActions.LoadConsignmentTrackingByIDFail({
                    orderCode: payload.orderCode,
                    consignmentCode: payload.consignmentCode,
                    error: normalizeHttpError(error),
                  })
                )
              )
            );
        })
      )
    );
}
