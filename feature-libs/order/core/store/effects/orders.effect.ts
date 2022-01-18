import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  normalizeHttpError,
  OrderHistoryList,
  SiteContextActions,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  OrderConnector,
  ReplenishmentOrderConnector,
} from '../../connectors/index';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrdersEffect {
  constructor(
    private actions$: Actions,
    private orderConnector: OrderConnector,
    private replenishmentOrderConnector: ReplenishmentOrderConnector
  ) {}

  @Effect()
  loadUserOrders$: Observable<OrderActions.UserOrdersAction> = this.actions$.pipe(
    ofType(OrderActions.LOAD_USER_ORDERS),
    map((action: OrderActions.LoadUserOrders) => action.payload),
    switchMap((payload) => {
      return (
        Boolean(payload.replenishmentOrderCode)
          ? this.replenishmentOrderConnector.loadReplenishmentDetailsHistory(
              payload.userId,
              payload.replenishmentOrderCode ?? '',
              payload.pageSize,
              payload.currentPage,
              payload.sort
            )
          : this.orderConnector.getHistory(
              payload.userId,
              payload.pageSize,
              payload.currentPage,
              payload.sort
            )
      ).pipe(
        map((orders: OrderHistoryList) => {
          return new OrderActions.LoadUserOrdersSuccess(orders);
        }),
        catchError((error) =>
          of(new OrderActions.LoadUserOrdersFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  resetUserOrders$: Observable<OrderActions.ClearUserOrders> = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
    map(() => {
      return new OrderActions.ClearUserOrders();
    })
  );
}
