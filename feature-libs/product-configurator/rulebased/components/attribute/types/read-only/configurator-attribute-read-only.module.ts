/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import {
  I18nModule,
  FeaturesConfigModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';
import { ConfiguratorAttributeCompositionConfig } from '../../../composition/configurator-attribute-composition.config';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    ConfiguratorPriceModule,
    CommonModule,
    I18nModule,
    // TODO:(CXSPA-1689) #deprecation for next major release remove below feature config
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_readonly: ConfiguratorAttributeReadOnlyComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeReadOnlyComponent],
  exports: [ConfiguratorAttributeReadOnlyComponent],
})
export class ConfiguratorAttributeReadOnlyModule {}
