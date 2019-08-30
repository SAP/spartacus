import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Order } from '../../../model/order.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class OrderDetailsEffect {
  @Effect()
  loadOrderDetails$: Observable<
    UserActions.OrderDetailsAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_DETAILS),
    map((action: UserActions.LoadOrderDetails) => action.payload),
    switchMap(payload => {
      return this.orderConnector.get(payload.userId, payload.orderCode).pipe(
        map((order: Order) => {
          return new UserActions.LoadOrderDetailsSuccess(order);
        }),
        catchError(error =>
          of(new UserActions.LoadOrderDetailsFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}
}
