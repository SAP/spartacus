/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';
import { ConfiguratorAttributeNumericInputFieldModule } from '../numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeInputFieldModule } from '../input-field/configurator-attribute-input-field.module';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    NgSelectModule,
    ReactiveFormsModule,
    ConfiguratorPriceModule,
    ConfiguratorAttributeNumericInputFieldModule,
    ConfiguratorAttributeInputFieldModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_dropdown: ConfiguratorAttributeDropDownComponent,
          AttributeType_dropdown_add: ConfiguratorAttributeDropDownComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeDropDownComponent],
  exports: [ConfiguratorAttributeDropDownComponent],
})
export class ConfiguratorAttributeDropDownModule {}
