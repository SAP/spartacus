import { Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as currenciesActions from '../actions/currencies.action';
import { OccSiteService } from '../../../../occ/site-context/occ-site.service';

@Injectable()
export class CurrenciesEffects {
  @Effect()
  loadCurrencies$: Observable<any> = this.actions$
    .ofType(currenciesActions.LOAD_CURRENCIES)
    .pipe(
      switchMap(() => {
        return this.occSiteService
          .loadCurrencies()
          .pipe(
            map(
              data =>
                new currenciesActions.LoadCurrenciesSuccess(data.currencies)
            ),
            catchError(error =>
              of(new currenciesActions.LoadCurrenciesFail(error))
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occSiteService: OccSiteService
  ) {}
}
