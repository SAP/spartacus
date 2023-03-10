/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCompositionConfig } from '@spartacus/product-configurator/rulebased';
import { CustomAttributeHeaderComponent } from './custom-attribute-header.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    NgSelectModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          Header: CustomAttributeHeaderComponent,
        },
      },
    }),
  ],
  declarations: [CustomAttributeHeaderComponent],
  exports: [CustomAttributeHeaderComponent],
})
export class CustomAttributeHeaderModule {}
