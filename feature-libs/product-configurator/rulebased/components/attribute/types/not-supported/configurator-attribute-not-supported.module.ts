/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeNotSupportedComponent } from './configurator-attribute-not-supported.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfiguratorAttributeNotSupportedComponent,
  ],
  providers: [
    provideDefaultConfig({
      productConfigurator: {
        assignment: {
          AttributeType_not_implemented:
            ConfiguratorAttributeNotSupportedComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorAttributeNotSupportedComponent],
})
export class ConfiguratorAttributeNotSupportedModule {}
