/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeInputFieldModule } from '../input-field/configurator-attribute-input-field.module';
import { ConfiguratorAttributeNumericInputFieldModule } from '../numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    ConfiguratorPriceModule,
    ConfiguratorAttributeNumericInputFieldModule,
    ConfiguratorAttributeInputFieldModule,
  ],
  declarations: [ConfiguratorAttributeRadioButtonComponent],
  exports: [ConfiguratorAttributeRadioButtonComponent],
})
export class ConfiguratorAttributeRadioButtonModule {}
