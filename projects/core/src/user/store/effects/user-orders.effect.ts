import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OccOrderService } from '../../occ/index';
import { OrderHistoryList } from '../../../occ/occ-models/index';

@Injectable()
export class UserOrdersEffect {
  constructor(
    private actions$: Actions,
    private occOrderService: OccOrderService
  ) {}

  @Effect()
  loadUserOrders$: Observable<any> = this.actions$.pipe(
    ofType(fromUserOrdersAction.LOAD_USER_ORDERS),
    map((action: fromUserOrdersAction.LoadUserOrders) => action.payload),
    switchMap(payload => {
      return this.occOrderService
        .getOrders(
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
}
