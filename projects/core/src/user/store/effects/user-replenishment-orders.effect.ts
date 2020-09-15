import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserActions } from '../actions/index';
import { UserReplenishmentOrderConnector } from '../../connectors/replenishment-order/user-replenishment-order.connector';

@Injectable()
export class UserReplenishmentOrdersEffect {
  @Effect()
  loadUserReplenishmentOrders$: Observable<
    UserActions.UserReplenishmentOrdersAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_USER_REPLENISHMENT_ORDERS),
    map((action: UserActions.LoadUserReplenishmentOrders) => action.payload),
    switchMap((payload) => {
      return this.replenishmentOrderConnector
        .loadHistory(
          payload.userId,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .pipe(
          map((orders: ReplenishmentOrderList) => {
            return new UserActions.LoadUserReplenishmentOrdersSuccess(orders);
          }),
          catchError((error) =>
            of(
              new UserActions.LoadUserReplenishmentOrdersFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private replenishmentOrderConnector: UserReplenishmentOrderConnector
  ) {}
}
