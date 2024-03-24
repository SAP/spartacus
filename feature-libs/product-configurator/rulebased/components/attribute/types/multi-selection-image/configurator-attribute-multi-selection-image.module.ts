/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, PopoverModule } from '@spartacus/storefront';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeMultiSelectionImageComponent } from './configurator-attribute-multi-selection-image.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    ConfiguratorPriceModule,
    PopoverModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_multi_selection_image:
            ConfiguratorAttributeMultiSelectionImageComponent,
          AttributeType_read_only_multi_selection_image:
            ConfiguratorAttributeMultiSelectionImageComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeMultiSelectionImageComponent],
  exports: [ConfiguratorAttributeMultiSelectionImageComponent],
})
export class ConfiguratorAttributeMultiSelectionImageModule {}
