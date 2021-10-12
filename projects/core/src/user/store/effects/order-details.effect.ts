import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message/index';
import { Order } from '../../../model/order.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Injectable()
export class OrderDetailsEffect {
  @Effect()
  loadOrderDetails$: Observable<UserActions.OrderDetailsAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_DETAILS),
    map((action: UserActions.LoadOrderDetails) => action.payload),
    switchMap((payload) => {
      return this.orderConnector.get(payload.userId, payload.orderCode).pipe(
        map((order: Order) => {
          return new UserActions.LoadOrderDetailsSuccess(order);
        }),
        catchError((error) =>
          of(new UserActions.LoadOrderDetailsFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  cancelOrder$: Observable<UserActions.OrderDetailsAction> = this.actions$.pipe(
    ofType(UserActions.CANCEL_ORDER),
    map((action: UserActions.CancelOrder) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .cancel(payload.userId, payload.orderCode, payload.cancelRequestInput)
        .pipe(
          map(() => new UserActions.CancelOrderSuccess()),
          catchError((error) => {
            error.error?.errors.forEach((err) =>
              this.globalMessageService.add(
                err.message,
                GlobalMessageType.MSG_TYPE_ERROR
              )
            );

            return of(
              new UserActions.CancelOrderFail(normalizeHttpError(error))
            );
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
