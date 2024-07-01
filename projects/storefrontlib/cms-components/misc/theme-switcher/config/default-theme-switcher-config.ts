/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeSwitcherConfig } from './theme-switcher-config';

export const defaultThemeSwitcherConfig: ThemeSwitcherConfig = {
  themeSwitcher: {
    themes: [
      { i18nNameKey: 'themeSwitcher.themes.default', className: 'santorini' },
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
