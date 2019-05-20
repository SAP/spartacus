import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/billing-countries.action';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';

@Injectable()
export class BillingCountriesEffect {
  @Effect()
  loadBillingCountries$: Observable<
    fromAction.BillingCountriesAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_BILLING_COUNTRIES),
    switchMap(() => {
      return this.userPaymentConnector.getBillingCountries().pipe(
        map(countries => new fromAction.LoadBillingCountriesSuccess(countries)),
        catchError(error => of(new fromAction.LoadBillingCountriesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userPaymentConnector: UserPaymentConnector
  ) {}
}
