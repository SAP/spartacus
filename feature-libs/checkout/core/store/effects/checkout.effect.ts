import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActions, SiteContextActions } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class CheckoutEffects {
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

  constructor(private actions$: Actions) {}
}
