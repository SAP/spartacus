/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Theme } from '../../model/misc.model';
import { SiteThemeConfig } from '../config/site-theme-config';
import { isNotNullable } from '../../util/type-guards';
import { StateWithSiteTheme } from '../store/state';
import { SiteThemeSelectors } from '../store/selectors';
import { SiteThemeActions } from '../store/actions';

@Injectable()
export class SiteThemeService {
  constructor(
    protected store: Store<StateWithSiteTheme>,
    protected config: SiteThemeConfig
  ) {}

  getAll(): Observable<Theme[]> {
    return this.store.pipe(
      select(SiteThemeSelectors.getAllThemes),
      tap((themes) => {
        if (!themes) {
          this.store.dispatch(new SiteThemeActions.LoadThemes());
        }
      }),
      filter(isNotNullable)
    );
  }

  /**
   * Gets the className of the active theme.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(SiteThemeSelectors.getActiveTheme),
      filter(isNotNullable)
    );
  }

  /**
   * Sets the active theme className.
   */
  setActive(className: string): void {
    this.isValidTheme(className)
      .pipe(
        filter((isValid) => isValid),
        mergeMap(() => {
          return this.store.pipe(
            select(SiteThemeSelectors.getActiveTheme),
            take(1)
          );
        })
      )
      .subscribe((activeTheme) => {
        if (activeTheme !== className) {
          this.store.dispatch(new SiteThemeActions.SetActiveTheme(className));
        }
      });
  }

  isValidTheme(className: string): Observable<boolean> {
    return this.getAll().pipe(
      take(1),
      map((themes) => {
        return themes.some((theme) => theme.className === className);
      })
    );
  }

  isInitialized(): boolean {
    let valueInitialized = false;
    this.getActive()
      .subscribe(() => (valueInitialized = true))
      .unsubscribe();

    return valueInitialized;
  }
}
