/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { ProductMultiDimensionalSelectorGuard } from '../guards/product-multi-dimensional-selector.guard';
import { MediaModule } from '@spartacus/storefront';
import { ProductMultiDimensionalSelectorComponent } from './product-multi-dimensional-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, MediaModule],
  declarations: [ProductMultiDimensionalSelectorComponent],
  exports: [ProductMultiDimensionalSelectorComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        // ProductVariantMultiDimensionalSelectorComponent
        ProductVariantSelectorComponent: {
          component: ProductMultiDimensionalSelectorComponent,
          guards: [ProductMultiDimensionalSelectorGuard],
        },
      },
    }),
  ],
})
export class ProductMultiDimensionalSelectorModule {}
