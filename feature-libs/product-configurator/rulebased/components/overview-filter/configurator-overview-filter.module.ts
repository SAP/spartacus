/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorOverviewFilterBarModule } from '../overview-filter-bar/configurator-overview-filter-bar.module';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    ConfiguratorOverviewFilterBarModule,
  ],
  declarations: [ConfiguratorOverviewFilterComponent],
  exports: [ConfiguratorOverviewFilterComponent],
})
export class ConfiguratorOverviewFilterModule {}
