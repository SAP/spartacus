/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewMenuModule } from '../overview-menu/configurator-overview-menu.module';
import { ConfiguratorOverviewMenuStandaloneComponent } from './configurator-overview-menu-standalone.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfiguratorOverviewMenuModule,
    ConfiguratorOverviewMenuStandaloneComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewMenu: {
          component: ConfiguratorOverviewMenuStandaloneComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorOverviewMenuStandaloneComponent],
})
export class ConfiguratorOverviewMenuStandaloneModule {}
