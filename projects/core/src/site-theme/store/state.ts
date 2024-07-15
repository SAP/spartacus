/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from '../../model/misc.model';

export const SITE_THEME_FEATURE = 'siteTheme';

export interface StateWithSiteTheme {
  [SITE_THEME_FEATURE]: SiteThemeState;
}

export interface SiteThemeState {
  themes: ThemesState;
}

export interface SiteThemeEntities {
  [className: string]: Theme;
}

export interface ThemesState {
  entities: SiteThemeEntities | null;
  activeTheme: string | null;
}
