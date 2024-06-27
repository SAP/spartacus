/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ProductMultiDimensionalContainerComponent } from './product-multi-dimensional-container.component';
import { RouterModule } from '@angular/router';
import { ProductMultiDimensionalGuard } from '../guards/product-multi-dimensional.guard';
import { MediaModule } from '@spartacus/storefront';
import { ProductMultiDimensionalSelectorComponent } from './multi-dimensional-selector/product-multi-dimensional-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, MediaModule],
  declarations: [
    ProductMultiDimensionalContainerComponent,
    ProductMultiDimensionalSelectorComponent,
  ],
  exports: [
    ProductMultiDimensionalContainerComponent,
    ProductMultiDimensionalSelectorComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        // ProductVariantMultiDimensionalSelectorComponent
        ProductVariantSelectorComponent: {
          component: ProductMultiDimensionalContainerComponent,
          guards: [ProductMultiDimensionalGuard],
        },
      },
    }),
  ],
})
export class ProductMultiDimensionalContainerModule {}
