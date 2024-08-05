/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeService } from '../facade/site-theme.service';
import { SiteThemePersistenceService } from './site-theme-persistence.service';
import { BaseSiteService } from '../../site-context/facade/base-site.service';

@Injectable({ providedIn: 'root' })
export class SiteThemeInitializer implements OnDestroy {
  constructor(
    protected siteThemeService: SiteThemeService,
    protected siteThemePersistenceService: SiteThemePersistenceService,
    protected configInit: ConfigInitializerService,
    protected baseSiteService: BaseSiteService
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
   * Sets the default value, unless the active theme has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.getCustomSiteTheme().pipe(
      switchMap((siteTheme) =>
        this.configInit
          .getStable('siteTheme')
          .pipe(
            tap((config: SiteThemeConfig) =>
              this.setDefaultValue(siteTheme, config)
            )
          )
      )
    );
  }

  protected getCustomSiteTheme(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.theme)
    );
  }

  /**
   * Sets the active theme value based on the default value,
   * unless the active theme has been already initialized.
   */
  protected setDefaultValue(
    siteTheme: string | undefined,
    config: SiteThemeConfig
  ): void {
    const defaultTheme =
      config.siteTheme?.sitethemes?.find((theme) => theme.default)?.className ||
      siteTheme;
    if (!this.siteThemeService.isInitialized() && defaultTheme) {
      this.siteThemeService.setActive(defaultTheme);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
