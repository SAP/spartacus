/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorAttributeQuantityModule,
    ConfiguratorPriceModule,
    ConfiguratorShowMoreModule,
    ConfiguratorAttributeCheckBoxListComponent,
  ],
  providers: [
    provideDefaultConfig({
      productConfigurator: {
        assignment: {
          AttributeType_checkBoxList:
            ConfiguratorAttributeCheckBoxListComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorAttributeCheckBoxListComponent],
})
export class ConfiguratorAttributeCheckboxListModule {}
