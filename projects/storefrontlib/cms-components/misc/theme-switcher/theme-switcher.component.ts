/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICON_TYPE } from '../icon/icon.model';
import { Theme } from './theme-switcher.model';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { ThemeService, ThemeSwitcherConfig } from '@spartacus/storefront';
import { Observable, map, take } from 'rxjs';

/**
 * Component for switching themes.
 */
@Component({
  selector: 'cx-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnInit {
  private static readonly THEME_ID = 'theme';

  showSwitcher = false;

  iconTypes = ICON_TYPE;

  themes: Array<Theme>;

  selectedTheme: Theme;

  constructor(
    protected themeSwitcherConfig: ThemeSwitcherConfig,
    protected themeService: ThemeService,
    protected baseSiteService: BaseSiteService,
    protected winRef: WindowRef
  ) {
    this.themes = this.themeSwitcherConfig.themeSwitcher?.themes || [];
  }
  ngOnInit(): void {
    this.getCustomSiteTheme().subscribe((siteTheme) => {
      this.addThemeIfNotExist(siteTheme);
      if (this.themes.length > 0) {
        this.showSwitcher = true;
        const savedTheme = this.getSavedTheme();
        if (savedTheme) {
          this.setTheme(savedTheme);
        } else {
          this.setTheme(this.themes[0]);
        }
      }
    });
  }
  /**
   * Handles theme selection.
   * @param themeClassName The selected theme.
   */
  onSelect(themeClassName: string): void {
    const selectedTheme = this.themes.find(
      (theme) => theme.className === themeClassName
    );
    if (selectedTheme) {
      this.setTheme(selectedTheme);
    }
  }
  /**
   * Adds a new theme to the list if it doesn't already exist.
   * @param siteTheme The theme to add.
   */
  private addThemeIfNotExist(siteTheme: string | undefined): void {
    if (siteTheme && !this.doesThemeExist(siteTheme)) {
      this.themes.push({ className: siteTheme });
    }
  }
  /**
   * Retrieves the saved theme from local storage if theme exist in the theme list.
   * @returns The saved theme, or undefined.
   */
  private getSavedTheme(): Theme | undefined {
    const storedThemeId = this.winRef.localStorage?.getItem(
      ThemeSwitcherComponent.THEME_ID
    );
    return this.themes.find((theme) => theme.className === storedThemeId);
  }

  /**
   * Sets the selected theme, updates local storage
   * @param theme The theme to set.
   */
  private setTheme(theme: Theme): void {
    this.winRef.localStorage?.setItem(
      ThemeSwitcherComponent.THEME_ID,
      theme.className
    );
    this.themeService.setTheme(theme.className);
    this.selectedTheme = theme;
  }

  /**
   * Checks if a theme with the given name exists in the list.
   * @param themeClassName The className of the theme to check.
   * @returns true if the theme exists, false otherwise.
   */
  private doesThemeExist(themeClassName: string): boolean {
    return this.themes.some((theme) => theme.className === themeClassName);
  }
  /**
   * Retrieves the user defined site's theme.
   * @returns observable that emits the site's theme.
   */
  private getCustomSiteTheme(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.theme)
    );
  }
}
