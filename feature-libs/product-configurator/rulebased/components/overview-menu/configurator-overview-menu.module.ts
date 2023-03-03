/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfiguratorOverviewMenuComponent],
  exports: [ConfiguratorOverviewMenuComponent],
})
export class ConfiguratorOverviewMenuModule {}
