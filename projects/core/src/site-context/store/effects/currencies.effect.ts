import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';

@Injectable()
export class CurrenciesEffects {
  @Effect()
  loadCurrencies$: Observable<
    | SiteContextActions.LoadCurrenciesSuccess
    | SiteContextActions.LoadCurrenciesFail
  > = this.actions$.pipe(
    ofType(SiteContextActions.LOAD_CURRENCIES),
    exhaustMap(() => {
      return this.siteConnector.getCurrencies().pipe(
        map(
          (currencies) =>
            new SiteContextActions.LoadCurrenciesSuccess(currencies)
        ),
        catchError((error) =>
          of(
            new SiteContextActions.LoadCurrenciesFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  activateCurrency$: Observable<
    SiteContextActions.CurrencyChange
  > = this.actions$.pipe(
    ofType(SiteContextActions.SET_ACTIVE_CURRENCY),
    tap((action: SiteContextActions.SetActiveCurrency) => {
      if (this.winRef.sessionStorage) {
        this.winRef.sessionStorage.setItem('currency', action.payload);
      }
    }),
    map(() => new SiteContextActions.CurrencyChange())
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private winRef: WindowRef
  ) {}
}
