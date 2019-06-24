import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Order } from '../../../model/order.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import * as fromOrderDetailsAction from '../actions/order-details.action';

@Injectable()
export class OrderDetailsEffect {
  @Effect()
  loadOrderDetails$: Observable<
    fromOrderDetailsAction.OrderDetailsAction
  > = this.actions$.pipe(
    ofType(fromOrderDetailsAction.LOAD_ORDER_DETAILS),
    map((action: fromOrderDetailsAction.LoadOrderDetails) => action.payload),
    switchMap(payload => {
      return this.orderConnector.get(payload.userId, payload.orderCode).pipe(
        map((order: Order) => {
          return new fromOrderDetailsAction.LoadOrderDetailsSuccess(order);
        }),
        catchError(error =>
          of(
            new fromOrderDetailsAction.LoadOrderDetailsFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}
}
