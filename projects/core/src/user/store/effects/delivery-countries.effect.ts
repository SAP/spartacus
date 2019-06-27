import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryType } from '../../../model/address.model';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import * as fromAction from '../actions/delivery-countries.action';

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
        catchError(error =>
          of(
            new fromAction.LoadDeliveryCountriesFail(
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
