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
import { getActiveSiteTheme } from '../selectors/site-themes.selectors';
import { SiteThemeConfig } from '../../config/site-theme-config';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { SiteTheme } from '../../../model/misc.model';

@Injectable()
export class SiteThemesEffects {
  protected logger = inject(LoggerService);
  protected actions$ = inject(Actions);
  protected state = inject(Store<StateWithSiteTheme>);
  protected config = inject(SiteThemeConfig);
  protected baseSiteService = inject(BaseSiteService);

  loadSiteThemes$: Observable<
    SiteThemeActions.LoadSiteThemesSuccess | SiteThemeActions.LoadSiteThemesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteThemeActions.LOAD_SITE_THEMES),
      exhaustMap(() => {
        return this.getCustomSiteTheme().pipe(
          map((siteTheme) => {
            let siteThemes = [];
            if (this.config.siteTheme?.siteThemes?.length) {
              const hasDefaultTheme = this.config.siteTheme.siteThemes.some(
                (theme) => theme.default
              );
              siteThemes = (this.config.siteTheme?.siteThemes || []).map(
                (sitetheme) => {
                  if (sitetheme.default) {
                    return { ...sitetheme, className: siteTheme ?? '' };
                  }
                  return sitetheme;
                }
              );
              if (!hasDefaultTheme) {
                siteThemes.push(this.getNewDefaultTheme(siteTheme));
              }
            } else {
              siteThemes.push(this.getNewDefaultTheme(siteTheme));
            }
            return new SiteThemeActions.LoadSiteThemesSuccess(siteThemes);
          }),
          catchError((error) =>
            of(
              new SiteThemeActions.LoadSiteThemesFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  activateSiteTheme$: Observable<SiteThemeActions.SiteThemeChange> =
    createEffect(() =>
      this.state.select(getActiveSiteTheme).pipe(
        bufferCount(2, 1),
        filter(([previous]) => !!previous),
        map(
          ([previous, current]) =>
            new SiteThemeActions.SiteThemeChange({ previous, current })
        )
      )
    );

  private getCustomSiteTheme(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.theme)
    );
  }

  private getNewDefaultTheme(siteTheme: string | undefined): SiteTheme {
    return {
      i18nNameKey: 'themeSwitcher.themes.default',
      className: siteTheme || '',
      default: true,
    };
  }
}
