/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
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

  protected onRead(valueFromStorage: string | undefined): void {
    if (!this.siteThemeService.isInitialized() && valueFromStorage) {
      this.siteThemeService.setActive(valueFromStorage);
    }
    if (!this.initialized$.closed) {
      this.initialized$.next(undefined);
      this.initialized$.complete();
    }
  }
}
