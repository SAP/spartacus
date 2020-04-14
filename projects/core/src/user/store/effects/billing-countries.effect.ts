import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryType } from '../../../model/address.model';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserActions } from '../actions/index';

@Injectable()
export class BillingCountriesEffect {
  @Effect()
  loadBillingCountries$: Observable<
    UserActions.BillingCountriesAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_BILLING_COUNTRIES),
    switchMap(() => {
      return this.siteConnector.getCountries(CountryType.BILLING).pipe(
        map(
          (countries) => new UserActions.LoadBillingCountriesSuccess(countries)
        ),
        catchError((error) =>
          of(
            new UserActions.LoadBillingCountriesFail(
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
