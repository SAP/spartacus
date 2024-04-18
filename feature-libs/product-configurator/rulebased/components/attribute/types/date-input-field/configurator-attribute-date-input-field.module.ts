/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { DatePickerModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeDateInputFieldComponent } from './configurator-attribute-date-input-field.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    DatePickerModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_sap_date: ConfiguratorAttributeDateInputFieldComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeDateInputFieldComponent],
  exports: [ConfiguratorAttributeDateInputFieldComponent],
})
export class ConfiguratorAttributeDateInputFieldModule {}
