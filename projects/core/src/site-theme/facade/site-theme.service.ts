/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';

import { Observable, Subscription } from 'rxjs';

import { SiteTheme } from '../../model/misc.model';
import { isNotNullable } from '../../util/type-guards';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeActions } from '../store/actions';
import { SiteThemeSelectors } from '../store/selectors';
import { StateWithSiteTheme } from '../store/state';

@Injectable()
export class SiteThemeService implements OnDestroy {
  protected store = inject(Store<StateWithSiteTheme>);
  protected config = inject(SiteThemeConfig);
  protected subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
  // TODO(#8153): If we move this._isInitialized into an RxJS stream, it may create a race condition between SiteThemePersistenceService:onRead and SiteThemeInitializer:this.setFallbackValue().
  setActive(className: string): void {
    this.isValidTheme(className)
      .pipe(filter(Boolean), take(1))
      .subscribe(() => {
        this.store.dispatch(new SiteThemeActions.SetActiveSiteTheme(className));
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

  isInitialized(): Observable<boolean> {
    return this.store.pipe(
      // added a separate selector for clarity, we don't want to use `getActive` as it emits only non nullable values
      // as we want to know if the value has been initialized, we need this observable to emit every value from start
      select(SiteThemeSelectors.isActiveSiteTheme),
      map((active) => !!active)
    );
  }
}
