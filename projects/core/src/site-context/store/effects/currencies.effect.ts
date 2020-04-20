import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  bufferCount,
  catchError,
  exhaustMap,
  filter,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import { getActiveCurrency } from '../selectors/currencies.selectors';
import { StateWithSiteContext } from '../state';

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
          currencies => new SiteContextActions.LoadCurrenciesSuccess(currencies)
        ),
        catchError(error =>
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
    withLatestFrom(
      this.state.select(getActiveCurrency).pipe(
        bufferCount(2, 1),
        // avoid dispatching `change` action when we're just setting the initial value:
        filter(([previous]) => !!previous),
        // avoid dispatching `change` action when values are the same
        filter(([previous, current]) => previous !== current)
      )
    ),
    map(
      ([_, [previous, current]]) =>
        new SiteContextActions.CurrencyChange({ previous, current })
    )
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private winRef: WindowRef,
    private state: Store<StateWithSiteContext>
  ) {}
}
