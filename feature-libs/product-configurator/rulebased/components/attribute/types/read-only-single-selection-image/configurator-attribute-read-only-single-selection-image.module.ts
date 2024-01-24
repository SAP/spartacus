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
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeReadOnlySingleSelectionImageComponent } from './configurator-attribute-read-only-single-selection-image.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorPriceModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_read_only_single_selection_image:
            ConfiguratorAttributeReadOnlySingleSelectionImageComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeReadOnlySingleSelectionImageComponent],
  exports: [ConfiguratorAttributeReadOnlySingleSelectionImageComponent],
})
export class ConfiguratorAttributeReadOnlySingleSelectionImageModule {}
