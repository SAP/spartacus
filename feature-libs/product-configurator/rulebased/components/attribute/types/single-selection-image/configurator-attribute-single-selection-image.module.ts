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
import { ConfiguratorAttributeSingleSelectionImageComponent } from './configurator-attribute-single-selection-image.component';
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
          AttributeType_single_selection_image:
            ConfiguratorAttributeSingleSelectionImageComponent,
          AttributeType_read_only_single_selection_image:
            ConfiguratorAttributeSingleSelectionImageComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeSingleSelectionImageComponent],
  exports: [ConfiguratorAttributeSingleSelectionImageComponent],
})
export class ConfiguratorAttributeSingleSelectionImageModule {}
