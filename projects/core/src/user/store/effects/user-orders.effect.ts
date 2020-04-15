import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryList } from '../../../model/order.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';

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
    switchMap((payload) => {
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
          catchError((error) =>
            of(new UserActions.LoadUserOrdersFail(makeErrorSerializable(error)))
          )
        );
    })
  );

  @Effect()
  resetUserOrders$: Observable<
    UserActions.ClearUserOrders
  > = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
    map(() => {
      return new UserActions.ClearUserOrders();
    })
  );
}
