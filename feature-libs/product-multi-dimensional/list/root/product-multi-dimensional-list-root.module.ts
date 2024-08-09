/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductMultiDimensionalPriceRangeModule } from './components/price-range/product-multi-dimensional-price-range.module';
import { ProductMultiDimensionalPriceRangeComponent } from './components/price-range/product-multi-dimensional-price-range.component';

import {
  OutletPosition,
  ProductListOutlets,
  provideOutlet,
} from '@spartacus/storefront';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_MULTI_DIMENSIONAL_LIST_FEATURE } from './feature-name';

export function defaultProductMultiDimensionalListConfig() {
  return {
    featureModules: {
      [PRODUCT_MULTI_DIMENSIONAL_LIST_FEATURE]: {
        cmsComponents: [
          'CMSProductListComponent',
          'ProductGridComponent',
          'SearchResultsListComponent',
        ],
      },
    },
  };
}

@NgModule({
  imports: [ProductMultiDimensionalPriceRangeModule],
  providers: [
    provideDefaultConfigFactory(defaultProductMultiDimensionalListConfig),
    provideOutlet({
      id: ProductListOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ProductMultiDimensionalPriceRangeComponent,
    }),
  ],
})
export class ProductMultiDimensionalListRootModule {}
