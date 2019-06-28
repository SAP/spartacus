import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryList } from '../../../model/order.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';
import { USER_ORDERS } from '../user-state';

@Injectable()
export class UserOrdersEffect {
  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}

  @Effect()
  loadUserOrders$: Observable<
    UserActions.UserOrdersAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_USER_ORDERS),
    map((action: UserActions.LoadUserOrders) => action.payload),
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
            return new UserActions.LoadUserOrdersSuccess(orders);
          }),
          catchError(error =>
            of(new UserActions.LoadUserOrdersFail(makeErrorSerializable(error)))
          )
        );
    })
  );

  @Effect()
  resetUserOrders$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_USER_ORDERS),
    map(() => {
      return new StateLoaderActions.LoaderResetAction(USER_ORDERS);
    })
  );
}
