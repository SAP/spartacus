import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UnitOrderConnector } from '../../connectors';
import { UnitOrderActions } from '../actions/index';

@Injectable()
export class UnitOrderDetailsEffect {
  loadOrderDetails$: Observable<UnitOrderActions.UnitOrderDetailsAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UnitOrderActions.LOAD_UNIT_ORDER_DETAILS),
        map((action: UnitOrderActions.LoadUnitOrderDetails) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .get(payload.userId, payload.orderCode)
            .pipe(
              map((order: Order) => {
                return new UnitOrderActions.LoadUnitOrderDetailsSuccess(order);
              }),
              catchError((error) =>
                of(
                  new UnitOrderActions.LoadUnitOrderDetailsFail(
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
