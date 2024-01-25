/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  bufferCount,
  catchError,
  exhaustMap,
  filter,
  map,
} from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import { getActiveCurrency } from '../selectors/currencies.selectors';
import { StateWithSiteContext } from '../state';

@Injectable()
export class CurrenciesEffects {
  protected logger = inject(LoggerService);

  loadCurrencies$: Observable<
    | SiteContextActions.LoadCurrenciesSuccess
    | SiteContextActions.LoadCurrenciesFail
  > = createEffect(() =>
    this.actions$.pipe(
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
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  activateCurrency$: Observable<SiteContextActions.CurrencyChange> =
    createEffect(() =>
      this.state.select(getActiveCurrency).pipe(
        bufferCount(2, 1),

        // avoid dispatching `change` action when we're just setting the initial value:
        filter(([previous]) => !!previous),
        map(
          ([previous, current]) =>
            new SiteContextActions.CurrencyChange({ previous, current })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private state: Store<StateWithSiteContext>
  ) {}
}
