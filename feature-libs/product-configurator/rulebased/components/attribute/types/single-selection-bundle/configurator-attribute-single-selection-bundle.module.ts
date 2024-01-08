/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeProductCardModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    ConfiguratorPriceModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_radioGroupProduct:
            ConfiguratorAttributeSingleSelectionBundleComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
  exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
})
export class ConfiguratorAttributeSingleSelectionBundleModule {}
