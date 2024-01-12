/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  FeaturesConfigModule,
} from '@spartacus/core';
import { ConfiguratorPriceSummaryComponent } from './configurator-price-summary.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorPriceSummary: {
          component: ConfiguratorPriceSummaryComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorPriceSummaryComponent],
  exports: [ConfiguratorPriceSummaryComponent],
})
export class ConfiguratorPriceSummaryModule {}
