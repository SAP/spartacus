/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import {
  getContextParameterDefault,
  SiteContextConfig,
  THEME_CONTEXT_ID,
} from '../../site-context';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { SiteThemeService } from '../facade/site-theme.service';
import { SiteThemePersistenceService } from './site-theme-persistence.service';

@Injectable({ providedIn: 'root' })
export class SiteThemeInitializer implements OnDestroy {
  protected siteThemeService = inject(SiteThemeService);
  protected siteThemePersistenceService = inject(SiteThemePersistenceService);
  protected configInit = inject(ConfigInitializerService);
  protected baseSiteService = inject(BaseSiteService);
  protected subscription: Subscription;

  /**
   * Initializes the value of the active theme.
   */
  initialize(): void {
    this.subscription = this.configInit
      .getStable('siteTheme')
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
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active language value based on the default value from the config,
   * unless the active language has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    const contextParam = getContextParameterDefault(config, THEME_CONTEXT_ID);
    if (!this.siteThemeService.isInitialized() && contextParam) {
      this.siteThemeService.setActive(contextParam);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
