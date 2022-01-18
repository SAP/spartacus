import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
  ReplenishmentOrder,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReplenishmentOrderConnector } from '../../connectors/replenishment-order.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class ReplenishmentOrderDetailsEffect {
  @Effect()
  loadReplenishmentOrderDetails$: Observable<OrderActions.ReplenishmentOrderDetailsAction> =
    this.actions$.pipe(
      ofType(OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS),
      map(
        (action: OrderActions.LoadReplenishmentOrderDetails) => action.payload
      ),
      switchMap((payload) => {
        return this.replenishmentOrderConnector
          .load(payload.userId, payload.replenishmentOrderCode)
          .pipe(
            map((replenishmentOrder: ReplenishmentOrder) => {
              return new OrderActions.LoadReplenishmentOrderDetailsSuccess(
                replenishmentOrder
              );
            }),
            catchError((error) =>
              of(
                new OrderActions.LoadReplenishmentOrderDetailsFail(
                  normalizeHttpError(error)
                )
              )
            )
          );
      })
    );

  @Effect()
  cancelReplenishmentOrder$: Observable<OrderActions.ReplenishmentOrderDetailsAction> =
    this.actions$.pipe(
      ofType(OrderActions.CANCEL_REPLENISHMENT_ORDER),
      map((action: OrderActions.CancelReplenishmentOrder) => action.payload),
      switchMap((payload) => {
        return this.replenishmentOrderConnector
          .cancelReplenishmentOrder(
            payload.userId,
            payload.replenishmentOrderCode
          )
          .pipe(
            map(
              (replenishmentOrder: ReplenishmentOrder) =>
                new OrderActions.CancelReplenishmentOrderSuccess(
                  replenishmentOrder
                )
            ),
            catchError((error) => {
              error?.error?.errors.forEach((err: any) =>
                this.globalMessageService.add(
                  err.message,
                  GlobalMessageType.MSG_TYPE_ERROR
                )
              );

              return of(
                new OrderActions.CancelReplenishmentOrderFail(
                  normalizeHttpError(error)
                )
              );
            })
          );
      })
    );

  constructor(
    private actions$: Actions,
    private replenishmentOrderConnector: ReplenishmentOrderConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
