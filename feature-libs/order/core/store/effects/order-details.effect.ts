import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
  Order,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderConnector } from '../../connectors/order.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderDetailsEffect {
  @Effect()
  loadOrderDetails$: Observable<OrderActions.OrderDetailsAction> = this.actions$.pipe(
    ofType(OrderActions.LOAD_ORDER_DETAILS),
    map((action: OrderActions.LoadOrderDetails) => action.payload),
    switchMap((payload) => {
      return this.orderConnector.get(payload.userId, payload.orderCode).pipe(
        map((order: Order) => {
          return new OrderActions.LoadOrderDetailsSuccess(order);
        }),
        catchError((error) =>
          of(new OrderActions.LoadOrderDetailsFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  cancelOrder$: Observable<OrderActions.OrderDetailsAction> = this.actions$.pipe(
    ofType(OrderActions.CANCEL_ORDER),
    map((action: OrderActions.CancelOrder) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .cancel(payload.userId, payload.orderCode, payload.cancelRequestInput)
        .pipe(
          map(() => new OrderActions.CancelOrderSuccess()),
          catchError((error) => {
            error.error?.errors.forEach((err: any) =>
              this.globalMessageService.add(
                err.message,
                GlobalMessageType.MSG_TYPE_ERROR
              )
            );

            return of(
              new OrderActions.CancelOrderFail(normalizeHttpError(error))
            );
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: OrderConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
