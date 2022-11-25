/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterBarComponent } from './configurator-overview-filter-bar.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewFilter: {
          component: ConfiguratorOverviewFilterBarComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewFilterBarComponent],
  exports: [ConfiguratorOverviewFilterBarComponent],
})
export class ConfiguratorOverviewFilterBarModule {}
