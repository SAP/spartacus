/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  bufferCount,
  catchError,
  exhaustMap,
  filter,
  map,
  tap,
} from 'rxjs/operators';
import { FeatureToggles } from '../../../features-config';
import { LoggerService } from '../../../logger';
import { tryNormalizeHttpError } from '../../../util/try-normalize-http-error';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import { getActiveLanguage } from '../selectors/languages.selectors';
import { StateWithSiteContext } from '../state';

@Injectable()
export class LanguagesEffects {
  protected logger = inject(LoggerService);
  private featureToggles = inject(FeatureToggles);
  protected platformId = inject(PLATFORM_ID);

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
                tryNormalizeHttpError(error, this.logger)
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

  reloadPageOnLanguageChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SiteContextActions.LANGUAGE_CHANGE),
        filter(
          () =>
            this.featureToggles.reloadOnLanguageChange === true &&
            isPlatformBrowser(this.platformId)
        ),
        tap(() => this.reloadPage())
      ),
    { dispatch: false }
  );

  protected reloadPage(): void {
    location.reload();
  }

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private state: Store<StateWithSiteContext>
  ) {}
}
