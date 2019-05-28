import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { USER_ORDERS } from '../user-state';
import { CLEAR_MISCS_DATA } from '../actions/index';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { LoaderResetAction } from '../../../state';
import { OrderHistoryList } from '../../../model/order.model';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';

@Injectable()
export class UserOrdersEffect {
  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}

  @Effect()
  loadUserOrders$: Observable<
    fromUserOrdersAction.UserOrdersAction
  > = this.actions$.pipe(
    ofType(fromUserOrdersAction.LOAD_USER_ORDERS),
    map((action: fromUserOrdersAction.LoadUserOrders) => action.payload),
    switchMap(payload => {
      return this.orderConnector
        .getHistory(
          payload.userId,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .pipe(
          map((orders: OrderHistoryList) => {
            return new fromUserOrdersAction.LoadUserOrdersSuccess(orders);
          }),
          catchError(error =>
            of(new fromUserOrdersAction.LoadUserOrdersFail(error))
          )
        );
    })
  );

  @Effect()
  resetUserOrders$: Observable<Action> = this.actions$.pipe(
    ofType(CLEAR_MISCS_DATA, fromUserOrdersAction.CLEAR_USER_ORDERS),
    map(() => {
      return new LoaderResetAction(USER_ORDERS);
    })
  );
}
