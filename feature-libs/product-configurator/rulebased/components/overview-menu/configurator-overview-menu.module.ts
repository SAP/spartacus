/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';

@NgModule({
  imports: [CommonModule, I18nModule, FeaturesConfigModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewMenu: {
          component: ConfiguratorOverviewMenuComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewMenuComponent],
  exports: [ConfiguratorOverviewMenuComponent],
})
export class ConfiguratorOverviewMenuModule {}
