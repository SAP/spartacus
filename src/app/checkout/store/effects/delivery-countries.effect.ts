import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import * as fromAction from '../actions/delivery-countries.action';

@Injectable()
export class DeliveryCountriesEffects {
  @Effect()
  loadDeliveryCountries$: Observable<any> = this.actions$
    .ofType(fromAction.LOAD_DELIVERY_COUNTRIES)
    .pipe(
      switchMap(() => {
        return this.occMiscsService
          .loadDeliveryCountries()
          .pipe(
            map(
              data =>
                new fromAction.LoadDeliveryCountriesSuccess(data.countries)
            ),
            catchError(error =>
              of(new fromAction.LoadDeliveryCountriesFail(error))
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
