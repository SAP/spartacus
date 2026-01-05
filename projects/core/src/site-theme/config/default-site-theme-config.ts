/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteThemeConfig } from './site-theme-config';

export const defaultSiteThemeConfig: SiteThemeConfig = {
  siteTheme: {
    optionalThemes: [
      {
        i18nNameKey: 'siteThemeSwitcher.themes.highContrastDark',
        className: 'cx-theme-high-contrast-dark',
      },
      {
        i18nNameKey: 'siteThemeSwitcher.themes.highContrastLight',
        className: 'cx-theme-high-contrast-light',
      },
    ],
  },
};
