/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeService } from '../facade/site-theme.service';
import { SITE_THEME_ID } from '../providers/site-theme-id';

@Injectable({ providedIn: 'root' })
export class SiteThemePersistenceService {
  protected statePersistenceService = inject(StatePersistenceService);
  protected siteThemeService = inject(SiteThemeService);
  protected config = inject(SiteThemeConfig);
  protected initialized$ = new ReplaySubject<unknown>(1);

  /**
   * Initializes the synchronization of the active theme with the local storage.
   *
   * @returns Observable that emits and completes when the value is read from the storage.
   */
  public initSync(): Observable<unknown> {
    this.statePersistenceService.syncWithStorage({
      key: SITE_THEME_ID,
      state$: this.siteThemeService.getActive(),
      onRead: (state) => this.onRead(state),
    });
    return this.initialized$;
  }

  // we cannot do it in sync way like in other similar persistance services because it cause race condition (I'm wondering why it is not the case in other mentioned services)
  protected onRead(valueFromStorage: string | undefined): void {
    if (valueFromStorage) {
      combineLatest([
        this.siteThemeService.isInitialized(), //checks whether theme is initialized, it cannot be verified in sync as in other similar persistance services
        this.siteThemeService.isValidTheme(valueFromStorage), //checks whether theme is valid
      ])
        .pipe(takeUntil(this.initialized$))
        .subscribe(([isInitialized, isValid]) => {
          if (!isInitialized && isValid && valueFromStorage) {
            //checks whether theme is initialized and valid
            this.siteThemeService.setActive(valueFromStorage); //if not, sets it if true (unfortunately, in this one case isThemeValid used inside is redundant)
          }
          if (!this.initialized$.closed && (isInitialized || !isValid)) {
            //if theme is initialized or not valid, completes the whole observable to allow setting fallback value in `site-theme-initializer.ts`
            this.finalizeInitialization();
          }
        });
    } else {
      //if there is no value in storage, completes the whole observable to allow setting fallback value in `site-theme-initializer.ts`
      this.finalizeInitialization();
    }
  }

  protected finalizeInitialization(): void {
    this.initialized$.next(undefined);
    this.initialized$.complete();
  }
}
