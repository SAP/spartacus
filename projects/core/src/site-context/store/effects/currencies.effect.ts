import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';

import { OccSiteService } from '../../occ/occ-site.service';
import * as actions from '../actions/currencies.action';
import { WindowRef } from '../../../window/window-ref';

@Injectable()
export class CurrenciesEffects {
  @Effect()
  loadCurrencies$: Observable<any> = this.actions$.pipe(
    ofType(actions.LOAD_CURRENCIES),
    exhaustMap(() => {
      return this.occSiteService.loadCurrencies().pipe(
        map(data => new actions.LoadCurrenciesSuccess(data.currencies)),
        catchError(error => of(new actions.LoadCurrenciesFail(error)))
      );
    })
  );

  @Effect()
  activateCurrency$: Observable<any> = this.actions$.pipe(
    ofType(actions.SET_ACTIVE_CURRENCY),
    tap((action: actions.SetActiveCurrency) => {
      if (this.winRef.sessionStorage) {
        this.winRef.sessionStorage.setItem('currency', action.payload);
      }
    }),
    map(() => new actions.CurrencyChange())
  );

  constructor(
    private actions$: Actions,
    private occSiteService: OccSiteService,
    private winRef: WindowRef
  ) {}
}
