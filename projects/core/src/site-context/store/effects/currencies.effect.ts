import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';

import * as actions from '../actions/currencies.action';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';

@Injectable()
export class CurrenciesEffects {
  @Effect()
  loadCurrencies$: Observable<any> = this.actions$.pipe(
    ofType(actions.LOAD_CURRENCIES),
    exhaustMap(() => {
      return this.siteConnector.getCurrencies().pipe(
        map(currencies => new actions.LoadCurrenciesSuccess(currencies)),
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
    private siteConnector: SiteConnector,
    private winRef: WindowRef
  ) {}
}
