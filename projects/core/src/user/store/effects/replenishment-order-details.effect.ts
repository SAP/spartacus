import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message/index';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserReplenishmentOrderConnector } from '../../connectors/replenishment-order/user-replenishment-order.connector';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Injectable()
export class ReplenishmentOrderDetailsEffect {
  @Effect()
  loadReplenishmentOrderDetails$: Observable<UserActions.ReplenishmentOrderDetailsAction> =
    this.actions$.pipe(
      ofType(UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS),
      map(
        (action: UserActions.LoadReplenishmentOrderDetails) => action.payload
      ),
      switchMap((payload) => {
        return this.replenishmentOrderConnector
          .load(payload.userId, payload.replenishmentOrderCode)
          .pipe(
            map((replenishmentOrder: ReplenishmentOrder) => {
              return new UserActions.LoadReplenishmentOrderDetailsSuccess(
                replenishmentOrder
              );
            }),
            catchError((error) =>
              of(
                new UserActions.LoadReplenishmentOrderDetailsFail(
                  normalizeHttpError(error)
                )
              )
            )
          );
      })
    );

  @Effect()
  cancelReplenishmentOrder$: Observable<UserActions.ReplenishmentOrderDetailsAction> =
    this.actions$.pipe(
      ofType(UserActions.CANCEL_REPLENISHMENT_ORDER),
      map((action: UserActions.CancelReplenishmentOrder) => action.payload),
      switchMap((payload) => {
        return this.replenishmentOrderConnector
          .cancelReplenishmentOrder(
            payload.userId,
            payload.replenishmentOrderCode
          )
          .pipe(
            map(
              (replenishmentOrder: ReplenishmentOrder) =>
                new UserActions.CancelReplenishmentOrderSuccess(
                  replenishmentOrder
                )
            ),
            catchError((error) => {
              error?.error?.errors.forEach((err) =>
                this.globalMessageService.add(
                  err.message,
                  GlobalMessageType.MSG_TYPE_ERROR
                )
              );

              return of(
                new UserActions.CancelReplenishmentOrderFail(
                  normalizeHttpError(error)
                )
              );
            })
          );
      })
    );

  constructor(
    private actions$: Actions,
    private replenishmentOrderConnector: UserReplenishmentOrderConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
