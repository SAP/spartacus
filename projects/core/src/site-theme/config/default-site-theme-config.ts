/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteThemeConfig } from './site-theme-config';

export const defaultSiteThemeConfig: SiteThemeConfig = {
  siteTheme: {
    sitethemes: [
      {
        i18nNameKey: 'themeSwitcher.themes.default',
        className: '',
        default: true,
      },
      {
        i18nNameKey: 'themeSwitcher.themes.highContrastDark',
        className: 'cx-theme-high-contrast-dark',
      },
      {
        i18nNameKey: 'themeSwitcher.themes.highContrastLight',
        className: 'cx-theme-high-contrast-light',
      },
    ],
  },
};
