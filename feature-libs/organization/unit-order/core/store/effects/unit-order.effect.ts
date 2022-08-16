import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError, SiteContextActions } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UnitOrderConnector } from '../../connectors/unit-order.connector';
import { UnitOrderActions } from '../actions';

@Injectable()
export class UnitOrderEffect {
  constructor(
    private actions$: Actions,
    private orderConnector: UnitOrderConnector
  ) {}

  loadUnitOrders$: Observable<UnitOrderActions.UnitOrdersAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitOrderActions.LOAD_UNIT_ORDERS),
        map((action: UnitOrderActions.LoadUnitOrders) => action.payload),
        switchMap((payload) => {
          return this.orderConnector
            .getUnitOrderHistory(
              payload.userId,
              payload.pageSize,
              payload.currentPage,
              payload.sort
            )
            .pipe(
              map((orders: OrderHistoryList) => {
                return new UnitOrderActions.LoadUnitOrdersSuccess(orders);
              }),
              catchError((error) =>
                of(
                  new UnitOrderActions.LoadUnitOrdersFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
  );

  resetUserOrders$: Observable<UnitOrderActions.ClearUnitOrders> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SiteContextActions.LANGUAGE_CHANGE),
        map(() => {
          return new UnitOrderActions.ClearUnitOrders();
        })
      )
  );
}
