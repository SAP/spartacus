/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteThemeService } from '../facade/site-theme.service';
import { SiteThemePersistenceService } from './site-theme-persistence.service';

@Injectable({ providedIn: 'root' })
export class SiteThemeInitializer implements OnDestroy {
  protected siteThemeService = inject(SiteThemeService);
  protected siteThemePersistenceService = inject(SiteThemePersistenceService);
  protected configInit = inject(ConfigInitializerService);
  protected subscription: Subscription;

  /**
   * Initializes the value of the active theme.
   */
  initialize(): void {
    this.subscription = this.configInit
      .getStable('context')
      .pipe(
        switchMap(() => this.siteThemePersistenceService.initSync()),
        switchMap(() => this.setFallbackValue())
      )
      .subscribe();
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value, unless the active theme has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(tap(() => this.setDefaultFromConfig()));
  }

  /**
   * Sets the active theme value based on the default value from the config,
   * unless the active theme has been already initialized.
   */
  protected setDefaultFromConfig(): void {
    if (!this.siteThemeService.isInitialized()) {
      const defaultTheme = this.siteThemeService.getDefault();
      this.siteThemeService.setActive(defaultTheme.className);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
