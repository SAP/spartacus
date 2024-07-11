/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Theme } from '../../model/misc.model';
import { SiteThemeConfig } from '../config/site-theme-config';
import { BaseSiteService } from '@spartacus/core';

@Injectable()
export class SiteThemeService {
  private themeSubject = new BehaviorSubject<string>('');
  private theme$ = this.themeSubject.asObservable();
  private activeHasSet = false;
  private themes: Theme[] = [];

  constructor(
    protected config: SiteThemeConfig,
    protected baseSiteService: BaseSiteService
  ) {}

  /**
   * Retrieves all available themes.
   */
  getAll(): Observable<Theme[]> {
    if (this.themes.length) {
      return of(this.themes);
    }
    return this.getCustomSiteTheme().pipe(
      map((siteTheme) => {
        this.themes = this.config.siteTheme?.themes || [];
        if (siteTheme && !this.doesThemeExist(siteTheme)) {
          this.themes.push({ className: siteTheme });
        }
        return this.themes;
      })
    );
  }

  /**
   * Gets the className of the active theme.
   */
  getActive(): Observable<string> {
    return this.theme$;
  }

  /**
   * Sets the active theme.
   */
  setActive(className: string): void {
    this.activeHasSet = true;
    this.getAll().subscribe(() => {
      if (this.isValid(className)) {
        this.themeSubject.next(className);
      }
    });
  }

  isInitialized(): boolean {
    return this.activeHasSet;
  }

  /**
   * Validates if the provided theme className exists.
   */
  isValid(className: string): boolean {
    return !!className && this.doesThemeExist(className);
  }

  /**
   * Checks if the theme exists in the themes array.
   */
  private doesThemeExist(themeClassName: string): boolean {
    return this.themes.some((theme) => theme.className === themeClassName);
  }

  /**
   * Retrieves the custom site theme from the base site service.
   */
  private getCustomSiteTheme(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.theme)
    );
  }
}
