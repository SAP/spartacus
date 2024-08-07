/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { SiteThemeInitializer } from '../services/site-theme-initializer';

export function initializeTheme(): () => void {
  const siteThemeInitializer = inject(SiteThemeInitializer);
  return () => {
    siteThemeInitializer.initialize();
  };
}

export const siteThemeInitializerProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeTheme,
    multi: true,
  },
];
