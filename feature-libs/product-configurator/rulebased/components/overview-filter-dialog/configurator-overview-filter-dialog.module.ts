/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterModule } from '../overview-filter/configurator-overview-filter.module';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';
import { defaultConfiguratorOverviewFilterDialogLayoutConfig } from './default-configurator-overview-filer-dialog-layout.config';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    ConfiguratorOverviewFilterModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(defaultConfiguratorOverviewFilterDialogLayoutConfig),
  ],
  declarations: [ConfiguratorOverviewFilterDialogComponent],
  exports: [ConfiguratorOverviewFilterDialogComponent],
})
export class ConfiguratorOverviewFilterDialogModule {}
