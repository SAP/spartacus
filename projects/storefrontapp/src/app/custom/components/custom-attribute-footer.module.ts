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
import { IconModule } from '@spartacus/storefront';

import { CustomAttributeFooterComponent } from './custom-attribute-footer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          Footer: CustomAttributeFooterComponent,
        },
      },
    }),
  ],
  declarations: [CustomAttributeFooterComponent],
  exports: [CustomAttributeFooterComponent],
})
export class CustomAttributeFooterModule {}
