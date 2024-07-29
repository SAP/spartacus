/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeService } from '../facade/site-theme.service';
import { SiteThemePersistenceService } from './site-theme-persistence.service';

@Injectable({ providedIn: 'root' })
export class SiteThemeInitializer implements OnDestroy {
  constructor(
    protected siteThemeService: SiteThemeService,
    protected siteThemePersistenceService: SiteThemePersistenceService,
    protected configInit: ConfigInitializerService
  ) {}

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
   * Sets the default value taken from config, unless the active theme has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('siteTheme')
      .pipe(
        tap((config: SiteThemeConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active theme value based on the default value from the config,
   * unless the active theme has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteThemeConfig): void {
    const defaultTheme =
      config.siteTheme?.themes?.find((theme) => theme.default)?.className || '';
    if (!this.siteThemeService.isInitialized() && defaultTheme) {
      this.siteThemeService.setActive(defaultTheme);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
