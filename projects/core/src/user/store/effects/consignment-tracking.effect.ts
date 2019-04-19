import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/consignment-tracking.action';
import { OccOrderService } from '../../occ/index';
import { ConsignmentTracking } from '../../index';

@Injectable()
export class ConsignmentTrackingEffect {
  @Effect()
  loadConsignmentTracking$: Observable<
    fromAction.ConsignmentTrackingAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_CONSIGNMENT_TRACKING),
    map((action: fromAction.LoadConsignmentTracking) => action.payload),
    switchMap(payload => {
      return this.occOrderService
        .getConsignmentTracking(payload.orderCode, payload.consignmentCode)
        .pipe(
          map(
            (tracking: ConsignmentTracking) =>
              new fromAction.LoadConsignmentTrackingSuccess(tracking)
          ),
          catchError(error =>
            of(new fromAction.LoadConsignmentTrackingFail(error))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occOrderService: OccOrderService
  ) {}
}
