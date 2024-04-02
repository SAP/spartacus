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
import { getActiveLanguage } from '../selectors/languages.selectors';
import { StateWithSiteContext } from '../state';

@Injectable()
export class LanguagesEffects {
  protected logger = inject(LoggerService);

  loadLanguages$: Observable<
    | SiteContextActions.LoadLanguagesSuccess
    | SiteContextActions.LoadLanguagesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteContextActions.LOAD_LANGUAGES),
      exhaustMap(() => {
        return this.siteConnector.getLanguages().pipe(
          map(
            (languages) =>
              new SiteContextActions.LoadLanguagesSuccess(languages)
          ),
          catchError((error) =>
            of(
              new SiteContextActions.LoadLanguagesFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  activateLanguage$: Observable<SiteContextActions.LanguageChange> =
    createEffect(() =>
      this.state.select(getActiveLanguage).pipe(
        bufferCount(2, 1),

        // avoid dispatching `change` action when we're just setting the initial value:
        filter(([previous]) => !!previous),
        map(
          ([previous, current]) =>
            new SiteContextActions.LanguageChange({ previous, current })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private state: Store<StateWithSiteContext>
  ) {}
}
