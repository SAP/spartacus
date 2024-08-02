/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductMultiDimensionalSelectorModule } from './selector/product-multi-dimensional-selector.module';
import { ProductMultiDimensionalSelectorComponent } from './selector/product-multi-dimensional-selector.component';
import { ProductMultiDimensionalSelectorGuard } from './guards';

@NgModule({
  imports: [ProductMultiDimensionalSelectorModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductMultiDimensionalSelectorComponent: {
          component: ProductMultiDimensionalSelectorComponent,
          guards: [ProductMultiDimensionalSelectorGuard],
        },
      },
    }),
  ],
})
export class ProductMultiDimensionalSelectorComponentsModule {}
