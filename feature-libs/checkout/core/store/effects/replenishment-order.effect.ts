import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartActions, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CheckoutReplenishmentOrderConnector } from '../../connectors/index';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class ReplenishmentOrderEffects {
  @Effect()
  scheduleReplenishmentOrder$: Observable<
    | CheckoutActions.ScheduleReplenishmentOrderSuccess
    | CheckoutActions.ScheduleReplenishmentOrderFail
    | CartActions.RemoveCart
  > = this.actions$.pipe(
    ofType(CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER),
    map((action: CheckoutActions.ScheduleReplenishmentOrder) => action.payload),
    mergeMap((payload) => {
      return this.checkoutReplOrderConnector
        .scheduleReplenishmentOrder(
          payload.cartId,
          payload.scheduleReplenishmentForm,
          payload.termsChecked,
          payload.userId
        )
        .pipe(
          switchMap((data) => [
            new CartActions.RemoveCart({ cartId: payload.cartId }),
            new CheckoutActions.ScheduleReplenishmentOrderSuccess(data),
          ]),
          catchError((error) =>
            of(
              new CheckoutActions.ScheduleReplenishmentOrderFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private checkoutReplOrderConnector: CheckoutReplenishmentOrderConnector
  ) {}
}
