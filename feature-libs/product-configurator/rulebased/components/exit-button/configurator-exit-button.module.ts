/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig, WindowRef } from '@spartacus/core';
import { ConfiguratorExitButtonComponent } from './configurator-exit-button.component';

@NgModule({
  imports: [CommonModule, I18nModule, ConfiguratorExitButtonComponent],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        ConfiguratorExitButton: {
          component: ConfiguratorExitButtonComponent,
        },
      },
    }),
    WindowRef,
  ],
  exports: [ConfiguratorExitButtonComponent],
})
export class ConfiguratorExitButtonModule {}
