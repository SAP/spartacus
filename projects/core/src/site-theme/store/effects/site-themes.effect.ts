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
  take,
} from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { SiteThemeActions } from '../actions/index';
import { StateWithSiteTheme } from '../state';
import { getActiveTheme } from '../selectors/site-themes.selectors';
import { SiteThemeConfig } from '../../config/site-theme-config';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';

@Injectable()
export class SiteThemesEffects {
  protected logger = inject(LoggerService);

  loadThemes$: Observable<
    SiteThemeActions.LoadThemesSuccess | SiteThemeActions.LoadThemesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteThemeActions.LOAD_THEMES),
      exhaustMap(() => {
        return this.getCustomSiteTheme().pipe(
          map((siteTheme) => {
            const themes = (this.config.siteTheme?.themes || []).map(
              (theme) => {
                if (theme.default) {
                  return { ...theme, className: siteTheme ?? '' };
                }
                return theme;
              }
            );
            return new SiteThemeActions.LoadThemesSuccess(themes);
          }),
          catchError((error) =>
            of(
              new SiteThemeActions.LoadThemesFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  activateTheme$: Observable<SiteThemeActions.ThemeChange> = createEffect(() =>
    this.state.select(getActiveTheme).pipe(
      bufferCount(2, 1),
      filter(([previous]) => !!previous),
      map(
        ([previous, current]) =>
          new SiteThemeActions.ThemeChange({ previous, current })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private state: Store<StateWithSiteTheme>,
    protected config: SiteThemeConfig,
    protected baseSiteService: BaseSiteService
  ) {}
  private getCustomSiteTheme(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.theme)
    );
  }
}
