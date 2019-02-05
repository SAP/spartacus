import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/billing-countries.action';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class BillingCountriesEffect {
  @Effect()
  loadBillingCountries$: Observable<
    fromAction.BillingCountriesAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_BILLING_COUNTRIES),
    switchMap(() => {
      return this.occMiscsService.loadBillingCountries().pipe(
        map(data => new fromAction.LoadBillingCountriesSuccess(data.countries)),
        catchError(error => of(new fromAction.LoadBillingCountriesFail(error)))
      );
    })
  );

  @Effect()
  resetBillingCountries$: Observable<Action> = this.actions$.pipe(
    ofType('[Site-context] Language Change', '[Site-context] Currency Change'),
    map(() => {
      return new fromAction.ResetBillingCountries();
    })
  );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
