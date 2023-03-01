/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeCompositionConfig } from '@spartacus/product-configurator/rulebased';
import { KeyboardFocusModule } from '@spartacus/storefront';

import { CustomAttributeRadioButtonComponent } from './custom-attribute-radio-button.component';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_RADIO_BUTTON___CHHI:
            CustomAttributeRadioButtonComponent,
        },
      },
    }),
  ],
  declarations: [CustomAttributeRadioButtonComponent],
  exports: [CustomAttributeRadioButtonComponent],
})
export class CustomAttributeRadioButtonModule {}
