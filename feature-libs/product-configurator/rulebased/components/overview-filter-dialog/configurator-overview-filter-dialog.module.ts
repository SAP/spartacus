/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';

import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';
import { defaultConfiguratorOverviewFilterDialogLayoutConfig } from './default-configurator-overview-filer-dialog-layout.config';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
    ConfiguratorOverviewFilterDialogComponent,
],
    providers: [
        provideDefaultConfig(defaultConfiguratorOverviewFilterDialogLayoutConfig),
    ],
    exports: [ConfiguratorOverviewFilterDialogComponent],
})
export class ConfiguratorOverviewFilterDialogModule {}
