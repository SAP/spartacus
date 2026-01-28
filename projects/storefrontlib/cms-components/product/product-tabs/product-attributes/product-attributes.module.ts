/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ProductAttributesComponent } from './product-attributes.component';

@NgModule({
  imports: [CommonModule, I18nModule, ProductAttributesComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductSpecsTabComponent: {
          component: ProductAttributesComponent,
        },
      },
    }),
  ],
  exports: [ProductAttributesComponent],
})
export class ProductAttributesModule {}
