/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';

import { Observable, Subscription } from 'rxjs';

import { SiteTheme } from '../../model/misc.model';
import { SiteThemeConfig } from '../config/site-theme-config';
import { isNotNullable } from '../../util/type-guards';
import { StateWithSiteTheme } from '../store/state';
import { SiteThemeSelectors } from '../store/selectors';
import { SiteThemeActions } from '../store/actions';

@Injectable()
export class SiteThemeService implements OnDestroy {
  private _isInitialized = false;
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
    this._isInitialized = true;
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
