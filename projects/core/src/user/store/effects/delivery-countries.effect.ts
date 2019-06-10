import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/delivery-countries.action';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { CountryType } from '../../../model/address.model';

@Injectable()
export class DeliveryCountriesEffects {
  @Effect()
  loadDeliveryCountries$: Observable<
    fromAction.DeliveryCountriesAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_DELIVERY_COUNTRIES),
    switchMap(() => {
      return this.siteConnector.getCountries(CountryType.SHIPPING).pipe(
        map(
          countries => new fromAction.LoadDeliveryCountriesSuccess(countries)
        ),
        catchError(error => of(new fromAction.LoadDeliveryCountriesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
