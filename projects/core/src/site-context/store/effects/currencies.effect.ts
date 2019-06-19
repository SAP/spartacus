import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { makeHttpErrorSerializable } from '../../../util/serialization-utils';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';
import * as actions from '../actions/currencies.action';

@Injectable()
export class CurrenciesEffects {
  @Effect()
  loadCurrencies$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOAD_CURRENCIES),
    exhaustMap(() => {
      return this.siteConnector.getCurrencies().pipe(
        map(currencies => new actions.LoadCurrenciesSuccess(currencies)),
        catchError(error =>
          of(new actions.LoadCurrenciesFail(makeHttpErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  activateCurrency$: Observable<Action> = this.actions$.pipe(
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
