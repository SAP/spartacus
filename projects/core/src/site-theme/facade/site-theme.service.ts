/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Theme } from '../../model/misc.model';
import { SiteThemeConfig } from '../config/site-theme-config';
import { BaseSiteService } from '@spartacus/core';

@Injectable()
export class SiteThemeService {
  private themeSubject = new BehaviorSubject<string>('');
  private theme$ = this.themeSubject.asObservable();
  private activeHasSet = false;

  constructor(
    protected config: SiteThemeConfig,
    protected baseSiteService: BaseSiteService
  ) {}

  /*
  TODO:  ngrx ??
  */
  getAll(): Observable<Theme[]> {
    return this.getCustomSiteTheme().pipe(
      map((siteTheme) => {
        const themes = this.config.siteTheme?.themes || [];
        const siteThemeExist = themes.some(
          (theme) => theme.className === siteTheme
        );
        if (siteTheme && !siteThemeExist) {
          themes.push({ className: siteTheme });
        }
        return themes;
      })
    );
  }

  /**
   * Represents the className of the active theme.
   */
  getActive(): Observable<string> {
    return this.theme$;
  }

  /**
   * Sets the active theme.
   */
  setActive(className: string): void {
    this.activeHasSet = true;
    this.themeSubject.next(className);
  }

  isInitialized(): boolean {
    // let valueInitialized = false;
    // this.getActive()
    //   .subscribe(() => (valueInitialized = true))
    //   .unsubscribe();

    return this.activeHasSet;
  }

  private getCustomSiteTheme(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.theme)
    );
  }
}
