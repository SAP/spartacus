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

  loadSiteThemes$: Observable<
    SiteThemeActions.LoadSiteThemesSuccess | SiteThemeActions.LoadSiteThemesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteThemeActions.LOAD_SITE_THEMES),
      exhaustMap(() => {
        return this.getCustomSiteTheme().pipe(
          map((siteTheme) => {
            let sitethemes = [];
            if (this.config.siteTheme?.sitethemes?.length) {
              const hasDefaultTheme = this.config.siteTheme.sitethemes.some(
                (theme) => theme.default
              );
              sitethemes = (this.config.siteTheme?.sitethemes || []).map(
                (sitetheme) => {
                  if (sitetheme.default) {
                    return { ...sitetheme, className: siteTheme ?? '' };
                  }
                  return sitetheme;
                }
              );
              if (!hasDefaultTheme) {
                sitethemes.push(this.getNewDefaultTheme(siteTheme));
              }
            } else {
              sitethemes.push(this.getNewDefaultTheme(siteTheme));
            }
            return new SiteThemeActions.LoadSiteThemesSuccess(sitethemes);
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

  private getNewDefaultTheme(siteTheme: string | undefined): SiteTheme {
    return {
      i18nNameKey: 'themeSwitcher.themes.default',
      className: siteTheme || '',
      default: true,
    };
  }
}
