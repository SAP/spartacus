/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  KeyboardFocusModule,
  MediaModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { ProductMultiDimensionalGuard } from '../guards/product-multi-dimensional.guard';
import { ProductMultiDimensionalSelectorComponent } from './multi-dimensional-selector/product-multi-dimensional-selector.component';
import { ProductMultiDimensionalContainerComponent } from './product-multi-dimensional-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    MediaModule,
    KeyboardFocusModule,
    NgSelectModule,
    FormsModule,
    NgSelectA11yModule,
    I18nModule,
  ],
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
