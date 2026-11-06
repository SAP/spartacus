/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewFilterBarModule } from '../overview-filter-bar/configurator-overview-filter-bar.module';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfiguratorOverviewFilterBarModule,
    ConfiguratorOverviewFilterButtonComponent,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        ConfiguratorOverviewFilterButton: {
          component: ConfiguratorOverviewFilterButtonComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorOverviewFilterButtonComponent],
})
export class ConfiguratorOverviewFilterButtonModule {}
