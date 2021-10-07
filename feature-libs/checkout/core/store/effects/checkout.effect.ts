import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import {
  AuthActions,
  CartActions,
  normalizeHttpError,
  SiteContextActions,
  withdrawOn,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../../connectors/cost-center/checkout-cost-center.connector';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class CheckoutEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  @Effect()
  clearCheckoutMiscsDataOnLanguageChange$: Observable<
    | CheckoutActions.CheckoutClearMiscsData
    | CheckoutActions.ResetLoadPaymentTypesProcess
  > = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
    mergeMap(() => [
      new CheckoutActions.ResetLoadPaymentTypesProcess(),
      new CheckoutActions.CheckoutClearMiscsData(),
    ])
  );

  @Effect()
  clearCheckoutDataOnLogout$: Observable<
    | CheckoutActions.ClearCheckoutData
    | CheckoutActions.ResetLoadPaymentTypesProcess
  > = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    mergeMap(() => [
      new CheckoutActions.ClearCheckoutData(),
      new CheckoutActions.ResetLoadPaymentTypesProcess(),
    ])
  );

  @Effect()
  clearCheckoutDataOnLogin$: Observable<CheckoutActions.ClearCheckoutData> = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    map(() => new CheckoutActions.ClearCheckoutData())
  );

  @Effect()
  setCostCenter$: Observable<
    | CheckoutActions.SetCostCenterSuccess
    | CheckoutActions.SetCostCenterFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CheckoutActions.SET_COST_CENTER),
    map((action: CheckoutActions.SetCostCenter) => action.payload),
    switchMap((payload) => {
      return this.checkoutCostCenterConnector
        .setCostCenter(payload.userId, payload.cartId, payload.costCenterId)
        .pipe(
          mergeMap((_data) => {
            this.checkoutDeliveryService.clearCheckoutDeliveryAddress();
            return [
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
              new CheckoutActions.SetCostCenterSuccess(payload.costCenterId),
            ];
          }),
          catchError((error) =>
            of(new CheckoutActions.SetCostCenterFail(normalizeHttpError(error)))
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  constructor(
    private actions$: Actions,
    private checkoutCostCenterConnector: CheckoutCostCenterConnector,
    private checkoutDeliveryService: CheckoutDeliveryFacade
  ) {}
}
