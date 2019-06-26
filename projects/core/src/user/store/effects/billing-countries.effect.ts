import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryType } from '../../../model/address.model';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import * as fromAction from '../actions/billing-countries.action';

@Injectable()
export class BillingCountriesEffect {
  @Effect()
  loadBillingCountries$: Observable<
    fromAction.BillingCountriesAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_BILLING_COUNTRIES),
    switchMap(() => {
      return this.siteConnector.getCountries(CountryType.BILLING).pipe(
        map(countries => new fromAction.LoadBillingCountriesSuccess(countries)),
        catchError(error =>
          of(
            new fromAction.LoadBillingCountriesFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
