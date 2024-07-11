/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteThemeConfig } from './site-theme-config';

export const defaultSiteThemeConfig: SiteThemeConfig = {
  siteTheme: {
    defaultThemei18nNameKey: 'themeSwitcher.themes.default',
    themes: [
      {
        i18nNameKey: 'themeSwitcher.themes.highContrastDark',
        className: 'high-contrast-dark',
      },
      {
        i18nNameKey: 'themeSwitcher.themes.highContrastLight',
        className: 'high-contrast-light',
      },
    ],
  },
};
