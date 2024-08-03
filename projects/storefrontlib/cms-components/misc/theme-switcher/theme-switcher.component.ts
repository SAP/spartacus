/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '../icon/icon.model';
import { Observable } from 'rxjs';
import { ThemeSwitcherComponentService } from './theme-switcher.component.service';
import { SiteTheme } from '@spartacus/core';

/**
 * Component for switching themes.
 */
@Component({
  selector: 'cx-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  iconTypes = ICON_TYPE;

  constructor(
    protected themeSwitcherComponentService: ThemeSwitcherComponentService
  ) {}

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
