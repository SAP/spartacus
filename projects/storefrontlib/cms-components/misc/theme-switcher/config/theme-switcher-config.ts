/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { Theme } from '../theme-switcher.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ThemeSwitcherConfig {
  themeSwitcher?: {
    themes?: Array<Theme>;
  };
}

declare module '@spartacus/core' {
  interface Config extends ThemeSwitcherConfig {}
}
