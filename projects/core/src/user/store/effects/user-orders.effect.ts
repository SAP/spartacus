import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderHistoryList } from '../../../model/order.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import {
  UserOrderConnector,
  UserReplenishmentOrderConnector,
} from '../../connectors/index';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Injectable()
export class UserOrdersEffect {
  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector,
    private replenishmentOrderConnector: UserReplenishmentOrderConnector
  ) {}

  @Effect()
  loadUserOrders$: Observable<UserActions.UserOrdersAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_USER_ORDERS),
    map((action: UserActions.LoadUserOrders) => action.payload),
    switchMap((payload) => {
      return (
        Boolean(payload.replenishmentOrderCode)
          ? this.replenishmentOrderConnector.loadReplenishmentDetailsHistory(
              payload.userId,
              payload.replenishmentOrderCode,
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
          return new UserActions.LoadUserOrdersSuccess(orders);
        }),
        catchError((error) =>
          of(new UserActions.LoadUserOrdersFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  resetUserOrders$: Observable<UserActions.ClearUserOrders> = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
    map(() => {
      return new UserActions.ClearUserOrders();
    })
  );
}
