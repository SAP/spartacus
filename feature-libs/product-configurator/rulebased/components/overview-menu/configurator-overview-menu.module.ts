/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { defaultConfiguratorUISettingsConfig } from '../config/default-configurator-ui-settings.config';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    ConfiguratorOverviewMenuComponent,
  ],
  exports: [ConfiguratorOverviewMenuComponent],
  providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)],
})
export class ConfiguratorOverviewMenuModule {}
