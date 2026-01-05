/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultSiteThemeConfig } from './config/default-site-theme-config';
import { SiteThemeService } from './facade/site-theme.service';
import { siteThemeInitializerProviders } from './providers/site-theme-initializer-providers';
import { StateModule } from '../state/index';
import { SiteThemeStoreModule } from './store/site-theme-store.module';

@NgModule({
  imports: [StateModule, SiteThemeStoreModule],
})
export class SiteThemeModule {
  static forRoot(): ModuleWithProviders<SiteThemeModule> {
    return {
      ngModule: SiteThemeModule,
      providers: [
        SiteThemeService,
        provideDefaultConfig(defaultSiteThemeConfig),
        ...siteThemeInitializerProviders,
      ],
    };
  }
}
