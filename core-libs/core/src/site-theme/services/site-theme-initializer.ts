/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { BaseSite } from '../../model/misc.model';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { THEME_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeService } from '../facade/site-theme.service';
import { getLastValueSync } from '../../util/rxjs/get-last-value-sync';
import { SiteThemePersistenceService } from './site-theme-persistence.service';

@Injectable({ providedIn: 'root' })
export class SiteThemeInitializer implements OnDestroy {
  private featureToggles = inject(FeatureToggles);
  protected siteThemeService = inject(SiteThemeService);
  protected siteThemePersistenceService = inject(SiteThemePersistenceService);
  protected configInit = inject(ConfigInitializerService);
  protected baseSiteService = inject(BaseSiteService);
  protected siteThemeConfig = inject(SiteThemeConfig);
  protected siteContextConfig = inject(SiteContextConfig);
  protected subscription = new Subscription();

  /**
   * Initializes the value of the active theme.
   */
  initialize(): void {
    this.subscription.add(
      this.configInit
        .getStable('context')
        .pipe(
          switchMap(() => this.siteThemePersistenceService.initSync()),
          switchMap(() => this.setFallbackValue())
        )
        .subscribe()
    );

    if (this.featureToggles.applyBaseSiteThemeFromCms) {
      this.subscription.add(this.applyThemeFromActiveBaseSite().subscribe());
    }
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
      return;
    }

    // Persistence restored an active theme. When `applyBaseSiteThemeFromCms`
    // is on and the storefront pins a theme statically, that static value
    // must win over any stale persisted CMS theme.
    if (this.featureToggles.applyBaseSiteThemeFromCms) {
      const staticTheme = getContextParameterDefault(
        this.siteContextConfig,
        THEME_CONTEXT_ID
      );
      const activeTheme = this.readActiveTheme();
      if (
        staticTheme &&
        activeTheme !== staticTheme &&
        !this.isUserPickedOptionalTheme(activeTheme)
      ) {
        this.siteThemeService.setActive(staticTheme);
      }
    }
  }

  /**
   * Applies the active base site's `BaseSite.theme` to the active theme,
   * reacting to base site changes at runtime.
   *
   * Precedence:
   * 1. Static `config.context.theme` — explicit developer intent, never overridden.
   * 2. User-picked optional theme (from `siteTheme.optionalThemes`) — preserved.
   * 3. Otherwise the CMS theme is applied.
   */
  protected applyThemeFromActiveBaseSite(): Observable<unknown> {
    return this.configInit.getStable('context').pipe(
      switchMap(() => this.baseSiteService.get()),
      filter(
        (baseSite: BaseSite | undefined): baseSite is BaseSite =>
          !!baseSite?.theme
      ),
      distinctUntilChanged((a: BaseSite, b: BaseSite) => a.theme === b.theme),
      tap((baseSite: BaseSite) => {
        const cmsTheme = baseSite.theme;
        if (!cmsTheme) {
          return;
        }
        if (this.hasStaticTheme()) {
          // Static `config.context.theme` wins — leave it alone.
          return;
        }
        const activeTheme = this.readActiveTheme();
        if (this.isUserPickedOptionalTheme(activeTheme)) {
          // User picked an optional theme via the switcher — preserve it.
          return;
        }
        this.siteThemeService.setActive(cmsTheme);
      })
    );
  }

  /** Returns true when a non-empty `config.context.theme` is configured. */
  protected hasStaticTheme(): boolean {
    return !!getContextParameterDefault(
      this.siteContextConfig,
      THEME_CONTEXT_ID
    );
  }

  /**
   * Returns true when `className` is one of `siteTheme.optionalThemes` —
   * the themes the user can pick via the Theme Switcher.
   */
  protected isUserPickedOptionalTheme(className: string | undefined): boolean {
    if (!className) {
      return false;
    }
    const optionalThemes = this.siteThemeConfig.siteTheme?.optionalThemes ?? [];
    return optionalThemes.some((theme) => theme.className === className);
  }

  /** Synchronously reads the currently active theme from the store. */
  protected readActiveTheme(): string | undefined {
    return getLastValueSync(this.siteThemeService.getActive());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
