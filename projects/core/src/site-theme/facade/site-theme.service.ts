/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { SiteTheme } from '../../model/misc.model';
import { isNotNullable } from '../../util/type-guards';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeActions } from '../store/actions';
import { SiteThemeSelectors } from '../store/selectors';
import { StateWithSiteTheme } from '../store/state';

@Injectable()
export class SiteThemeService {
  protected store = inject(Store<StateWithSiteTheme>);
  protected config = inject(SiteThemeConfig);

  getAll(): Observable<SiteTheme[]> {
    return this.store.pipe(
      select(SiteThemeSelectors.getAllSiteThemes),
      tap((themes) => {
        if (!themes) {
          this.store.dispatch(new SiteThemeActions.LoadSiteThemes());
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
        if (activeTheme !== className) {
          this.store.dispatch(
            new SiteThemeActions.SetActiveSiteTheme(className)
          );
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
