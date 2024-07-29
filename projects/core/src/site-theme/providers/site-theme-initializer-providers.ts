/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, Provider } from '@angular/core';
import { SiteThemeInitializer } from '../services/site-theme-initializer';

export function initializeTheme(
  siteThemeInitializer: SiteThemeInitializer
): () => void {
  const result = () => {
    siteThemeInitializer.initialize();
  };
  return result;
}

export const siteThemeInitializerProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeTheme,
    deps: [SiteThemeInitializer],
    multi: true,
  },
];
