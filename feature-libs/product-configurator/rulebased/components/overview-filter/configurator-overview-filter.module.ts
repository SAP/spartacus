/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewFilter: {
          component: ConfiguratorOverviewFilterComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewFilterComponent],
  exports: [ConfiguratorOverviewFilterComponent],
})
export class ConfiguratorOverviewFilterModule {}
