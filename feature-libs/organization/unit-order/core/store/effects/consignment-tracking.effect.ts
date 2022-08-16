import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UnitOrderConnector } from '../../connectors';
import { UnitOrderActions } from '../actions/index';

@Injectable()
export class ConsignmentTrackingEffects {
  loadConsignmentTracking$: Observable<UnitOrderActions.ConsignmentTrackingAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UnitOrderActions.LOAD_CONSIGNMENT_TRACKING),
        map((action: UnitOrderActions.LoadConsignmentTracking) => action.payload),
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
                  new UnitOrderActions.LoadConsignmentTrackingSuccess(tracking)
              ),
              catchError((error) =>
                of(
                  new UnitOrderActions.LoadConsignmentTrackingFail(
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
    private orderConnector: UnitOrderConnector
  ) {}
}
