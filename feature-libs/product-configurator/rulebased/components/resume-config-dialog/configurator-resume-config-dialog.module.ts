/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';
import { defaultConfiguratorResumeConfigDialogLayoutConfig } from './default-configurator-resume-config-dialog-layout.config';

@NgModule({
  declarations: [ConfiguratorResumeConfigDialogComponent],
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  providers: [
    provideDefaultConfig(defaultConfiguratorResumeConfigDialogLayoutConfig),
  ],
})
export class ConfiguratorResumeConfigDialogModule {}
