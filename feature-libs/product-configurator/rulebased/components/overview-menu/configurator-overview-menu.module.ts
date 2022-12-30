/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';

@NgModule({
  imports: [CommonModule, I18nModule, FeaturesConfigModule],
  declarations: [ConfiguratorOverviewMenuComponent],
  exports: [ConfiguratorOverviewMenuComponent],
})
export class ConfiguratorOverviewMenuModule {}
