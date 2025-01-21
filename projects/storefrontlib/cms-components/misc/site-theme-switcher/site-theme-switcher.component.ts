/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SiteTheme,
  useFeatureStyles,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';
import { map, take } from 'rxjs/operators';

/**
 * Component for switching themes.
 */
@Component({
  selector: 'cx-site-theme-switcher',
  templateUrl: './site-theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteThemeSwitcherComponent {
  readonly translationService = inject(TranslationService);
  iconTypes = ICON_TYPE;

  constructor() {
    useFeatureStyles('a11yShowDownArrowOnFocusedSelectMenu');
  }

  protected themeSwitcherComponentService = inject(
    SiteThemeSwitcherComponentService
  );

  get items$(): Observable<Array<SiteTheme>> {
    return this.themeSwitcherComponentService.getItems();
  }
  get activeItem$(): Observable<string> {
    return this.themeSwitcherComponentService.getActiveItem();
  }
  set activeItem(value: string) {
    this.themeSwitcherComponentService.setActive(value);
  }

  ariaLabel$(
    theme: SiteTheme,
    index: number,
    length: number
  ): Observable<string> {
    const themeTranslation$ = theme.i18nNameKey
      ? this.translationService.translate(theme.i18nNameKey)
      : of(theme.className);
    const ofTranslation$ = this.translationService.translate('common.of');
    return combineLatest([themeTranslation$, ofTranslation$]).pipe(
      take(1),
      map(([themeTranslation, ofTranslation]) => {
        return `${themeTranslation}, ${index + 1} ${ofTranslation} ${length}`;
      })
    );
  }
}
