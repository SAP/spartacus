/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { Config } from '../../config';
import { SiteTheme } from '../../model/misc.model';
import {
  getContextParameterDefault,
  SiteContext,
  THEME_CONTEXT_ID,
} from '../../site-context';
import { isNotNullable } from '../../util/type-guards';
import { SiteThemeActions } from '../store/actions';
import { SiteThemeSelectors } from '../store/selectors';
import { StateWithSiteTheme } from '../store/state';

@Injectable()
export class SiteThemeService implements SiteContext<SiteTheme> {
  protected store = inject(Store<StateWithSiteTheme>);
  protected config = inject(Config);

  /**
   * Fallback default theme ID to be used when `config.context.theme` is not defined.
   */
  protected readonly FALLBACK_DEFAULT_THEME_ID = '';

  getDefault(): SiteTheme {
    const defaultThemeId =
      getContextParameterDefault(this.config, THEME_CONTEXT_ID) ??
      this.FALLBACK_DEFAULT_THEME_ID;

    return {
      className: defaultThemeId,
      i18nNameKey: 'siteThemeSwitcher.themes.default',
    };
  }

  /**
   * List of possible themes.
   *
   * There are 2 types of themes: default and optional which are configured differently in Spartacus config.
   * This property combines both types of themes into a single list.
   *
   * 1. The default theme ID can be configured only via Spartacus config `config.context.theme`
   *    (note: its value can be defined statically or fetched dynamically from the CMS backend).
   * 2. The optional themes (their IDs and their i18n keys) can be configured
   *    only via Spartacus config `config.siteTheme.optionalThemes`
   *
   * CAUTION: This property should be accessed only when those configs are stable, e.g. `ConfigInitializer.getStable('context','siteTheme'))`
   */
  protected get themes(): SiteTheme[] {
    const optionalThemes = this.config.siteTheme?.optionalThemes || [];
    return [this.getDefault(), ...optionalThemes];
  }

  getAll(): Observable<SiteTheme[]> {
    // We could return a simple value, but we return Observable only to conform the class interface `SiteContext<T>`
    return of(this.themes);
  }

  /**
   * Gets the className of the active theme.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(SiteThemeSelectors.getActiveSiteTheme),
      filter(isNotNullable)
    );
  }

  /**
   * Sets the active theme className.
   */
  setActive(className: string): void {
    this.store
      .pipe(select(SiteThemeSelectors.getActiveSiteTheme), take(1))
      .subscribe((activeTheme: string | null) => {
        if (activeTheme !== className && this.isValid(className)) {
          this.store.dispatch(
            new SiteThemeActions.SetActiveSiteTheme(className)
          );
        }
      });
  }

  isInitialized(): boolean {
    let valueInitialized = false;
    this.getActive()
      .subscribe(() => (valueInitialized = true))
      .unsubscribe();

    return valueInitialized;
  }

  protected isValid(className: string): boolean {
    return this.themes.map((theme) => theme.className).includes(className);
  }
}
