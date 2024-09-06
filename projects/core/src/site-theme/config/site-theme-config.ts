/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { SiteTheme } from '../../model/misc.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class SiteThemeConfig {
  siteTheme?: {
    optionalThemes?: Array<SiteTheme>;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends SiteThemeConfig {}
}
