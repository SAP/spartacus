import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OccOrderService } from './../../../occ/order/order.service';

@Injectable()
export class UserOrdersEffect {
  constructor(
    private actions$: Actions,
    private occOrderService: OccOrderService
  ) {}

  @Effect()
  loadUserOrders$: Observable<any> = this.actions$
    .ofType(fromUserOrdersAction.LOAD_USER_ORDERS)
    .pipe(
      map((action: fromUserOrdersAction.LoadUserOrders) => action.payload),
      switchMap(payload => {
        return this.occOrderService
          .getUserOrders(
            payload.userId,
            payload.pageSize,
            payload.currentPage,
            payload.sort
          )
          .pipe(
            map((user: any) => {
              return new fromUserOrdersAction.LoadUserOrdersSuccess(user);
            }),
            catchError(error =>
              of(new fromUserOrdersAction.LoadUserOrdersFail(error))
            )
          );
      })
    );
}
