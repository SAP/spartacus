/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeNotSupportedComponent } from './configurator-attribute-not-supported.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_not_implemented:
            ConfiguratorAttributeNotSupportedComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeNotSupportedComponent],
  exports: [ConfiguratorAttributeNotSupportedComponent],
})
export class ConfiguratorAttributeNotSupportedModule {}
