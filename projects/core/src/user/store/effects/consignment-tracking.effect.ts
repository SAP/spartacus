import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import * as fromAction from '../actions/consignment-tracking.action';
import { makeErrorSerializable } from 'projects/core/src/util/serialization-utils';

@Injectable()
export class ConsignmentTrackingEffects {
  @Effect()
  loadConsignmentTracking$: Observable<
    fromAction.ConsignmentTrackingAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_CONSIGNMENT_TRACKING),
    map((action: fromAction.LoadConsignmentTracking) => action.payload),
    switchMap(payload => {
      return this.userOrderConnector
        .getConsignmentTracking(payload.orderCode, payload.consignmentCode)
        .pipe(
          map(
            (tracking: ConsignmentTracking) =>
              new fromAction.LoadConsignmentTrackingSuccess(tracking)
          ),
          catchError(error =>
            of(
              new fromAction.LoadConsignmentTrackingFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private userOrderConnector: UserOrderConnector
  ) {}
}
