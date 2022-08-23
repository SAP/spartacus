/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
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
  ],
  declarations: [ConfiguratorAttributeDropDownComponent],
  exports: [ConfiguratorAttributeDropDownComponent],
})
export class ConfiguratorAttributeDropDownModule {}
