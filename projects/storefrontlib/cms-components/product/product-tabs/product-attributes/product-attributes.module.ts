/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ProductAttributesComponent } from './product-attributes.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductSpecsTabComponent: {
          component: ProductAttributesComponent,
        },
      },
    }),
  ],
  declarations: [ProductAttributesComponent],
  exports: [ProductAttributesComponent],
})
export class ProductAttributesModule {}
