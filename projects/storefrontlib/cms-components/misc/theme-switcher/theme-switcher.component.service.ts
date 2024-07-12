/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { SiteThemeService, Theme } from '@spartacus/core';
import { ThemeService } from '../../../layout/theme/theme.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ThemeSwitcherComponentService {
  constructor(
    protected themeService: ThemeService,
    protected siteThemeService: SiteThemeService
  ) {}

  getItems(): Observable<Theme[]> {
    return this.siteThemeService.getAll();
  }

  getActiveItem(): Observable<string> {
    return this.siteThemeService
      .getActive()
      .pipe(tap((theme) => this.themeService.setTheme(theme)));
  }

  setActive(value: string): void {
    this.siteThemeService.setActive(value);
  }
}
