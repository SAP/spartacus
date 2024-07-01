/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorShowMoreModule } from '../../../show-more/configurator-show-more.module';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';
import { ConfiguratorPriceAsyncModule } from '../../../price-async/configurator-price-async.module';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    ConfiguratorPriceModule,
    ConfiguratorPriceAsyncModule,
    ConfiguratorShowMoreModule,
    CommonModule,
    I18nModule,
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
