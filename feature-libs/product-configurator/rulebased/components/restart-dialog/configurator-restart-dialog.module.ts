/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorRestartDialogComponent } from './configurator-restart-dialog.component';
import { defaultConfiguratorRestartDialogLayoutConfig } from './default-configurator-restart-dialog-layout.config';

@NgModule({
  declarations: [ConfiguratorRestartDialogComponent],
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  providers: [
    provideDefaultConfig(defaultConfiguratorRestartDialogLayoutConfig),
  ],
})
export class ConfiguratorRestartDialogModule {}
