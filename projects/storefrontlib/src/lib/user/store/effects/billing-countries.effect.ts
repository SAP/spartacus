import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import * as fromAction from '../actions/billing-countries.action';

@Injectable()
export class BillingCountriesEffects {
  @Effect()
  loadBillingCountries$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.LOAD_BILLING_COUNTRIES),
    switchMap(() => {
      return this.occMiscsService.loadBillingCountries().pipe(
        map(data => new fromAction.LoadBillingCountriesSuccess(data.countries)),
        catchError(error => of(new fromAction.LoadBillingCountriesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
