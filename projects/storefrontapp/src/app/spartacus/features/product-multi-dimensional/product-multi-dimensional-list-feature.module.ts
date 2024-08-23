/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  PRODUCT_MULTI_DIMENSIONAL_LIST_FEATURE,
  ProductMultiDimensionalListRootModule,
} from '@spartacus/product-multi-dimensional/list/root';

@NgModule({
  imports: [ProductMultiDimensionalListRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_MULTI_DIMENSIONAL_LIST_FEATURE]: {
          module: () =>
            import('@spartacus/product-multi-dimensional/list').then(
              (m) => m.ProductMultiDimensionalListModule
            ),
        },
      },
    }),
  ],
})
export class ProductMultiDimensionalListFeatureModule {}
