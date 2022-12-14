/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewFilterModule } from '../overview-filter/configurator-overview-filter.module';
import { ConfiguratorOverviewMenuModule } from '../overview-menu/configurator-overview-menu.module';
import { ConfiguratorOverviewSidebarComponent } from './configurator-overview-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfiguratorOverviewFilterModule,
    ConfiguratorOverviewMenuModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewSidebar: {
          component: ConfiguratorOverviewSidebarComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewSidebarComponent],
  exports: [ConfiguratorOverviewSidebarComponent],
})
export class ConfiguratorOverviewSidebarModule {}
