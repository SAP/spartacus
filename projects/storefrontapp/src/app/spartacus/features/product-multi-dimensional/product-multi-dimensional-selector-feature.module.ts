/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  PRODUCT_MULTI_DIMENSIONAL_SELECTOR_FEATURE,
  ProductMultiDimensionalSelectorRootModule,
} from '@spartacus/product-multi-dimensional/selector/root';
import { ProductMultiDimensionalBaseModule } from '@spartacus/product-multi-dimensional/base';

@NgModule({
  imports: [
    ProductMultiDimensionalSelectorRootModule,
    ProductMultiDimensionalBaseModule,
  ],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_MULTI_DIMENSIONAL_SELECTOR_FEATURE]: {
          module: () =>
            import('@spartacus/product-multi-dimensional/selector').then(
              (m) => m.ProductMultiDimensionalSelectorModule
            ),
        },
      },
    }),
  ],
})
export class ProductMultiDimensionalSelectorFeatureModule {}
