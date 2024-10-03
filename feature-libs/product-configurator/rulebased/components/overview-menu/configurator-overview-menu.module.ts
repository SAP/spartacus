/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [ConfiguratorOverviewMenuComponent],
  exports: [ConfiguratorOverviewMenuComponent],
})
export class ConfiguratorOverviewMenuModule {}
