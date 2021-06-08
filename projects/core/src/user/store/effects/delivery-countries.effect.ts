import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryType } from '../../../model/address.model';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';

@Injectable()
export class DeliveryCountriesEffects {
  @Effect()
  loadDeliveryCountries$: Observable<UserActions.DeliveryCountriesAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_DELIVERY_COUNTRIES),
    switchMap(() => {
      return this.siteConnector.getCountries(CountryType.SHIPPING).pipe(
        map(
          (countries) => new UserActions.LoadDeliveryCountriesSuccess(countries)
        ),
        catchError((error) =>
          of(
            new UserActions.LoadDeliveryCountriesFail(normalizeHttpError(error))
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
