/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ProductAttributesComponent } from './product-attributes.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig({
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
