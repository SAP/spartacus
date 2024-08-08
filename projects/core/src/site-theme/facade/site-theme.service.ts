/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';

import { Observable, Subscription } from 'rxjs';

import { SiteTheme } from '../../model/misc.model';
import { SiteThemeConfig } from '../config/site-theme-config';
import { isNotNullable } from '../../util/type-guards';
import { StateWithSiteTheme } from '../store/state';
import { SiteThemeSelectors } from '../store/selectors';
import { SiteThemeActions } from '../store/actions';

@Injectable()
export class SiteThemeService implements OnDestroy {
  protected _isInitialized = false;
  protected store = inject(Store<StateWithSiteTheme>);
  protected config = inject(SiteThemeConfig);
  protected subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // init(className: string): Observable<string> {

  // }

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
  setActive(className: string): Observable<void> {
    return this.isValidTheme(className).pipe(
      filter(Boolean),
      mergeMap(() =>
        this.store.pipe(select(SiteThemeSelectors.getActiveSiteTheme), take(1))
      ),
      tap((activeTheme) => {
        if (activeTheme !== className) {
          this._isInitialized = true;
          this.store.dispatch(
            new SiteThemeActions.SetActiveSiteTheme(className)
          );
        }
      }),
      map(() => undefined)
    );
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
    return this._isInitialized;
  }
}
