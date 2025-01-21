/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteTheme, useFeatureStyles } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';

/**
 * Component for switching themes.
 */
@Component({
  selector: 'cx-site-theme-switcher',
  templateUrl: './site-theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteThemeSwitcherComponent {
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
}
