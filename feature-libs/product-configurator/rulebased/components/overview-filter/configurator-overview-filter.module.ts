/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';
import { defaultConfiguratorOverviewFilterLayoutConfig } from './default-configurator-overview-filer-layout.config';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewFilter: {
          component: ConfiguratorOverviewFilterComponent,
        },
      },
    }),
    provideDefaultConfig(defaultConfiguratorOverviewFilterLayoutConfig),
  ],
  declarations: [ConfiguratorOverviewFilterComponent],
  exports: [ConfiguratorOverviewFilterComponent],
})
export class ConfiguratorOverviewFilterModule {}
