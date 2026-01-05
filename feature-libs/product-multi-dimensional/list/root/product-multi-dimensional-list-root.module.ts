/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductMultiDimensionalListItemDetailsModule } from './components/product-item-details/product-multi-dimensional-list-item-details.module';

import {
  OutletPosition,
  ProductListOutlets,
  provideOutlet,
} from '@spartacus/storefront';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_MULTI_DIMENSIONAL_LIST_FEATURE } from './feature-name';
import { ProductMultiDimensionalListItemDetailsComponent } from './components/product-item-details/product-multi-dimensional-list-item-details.component';

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
  imports: [ProductMultiDimensionalListItemDetailsModule],
  providers: [
    provideDefaultConfigFactory(defaultProductMultiDimensionalListConfig),
    provideOutlet({
      id: ProductListOutlets.ITEM_DETAILS,
      position: OutletPosition.REPLACE,
      component: ProductMultiDimensionalListItemDetailsComponent,
    }),
  ],
})
export class ProductMultiDimensionalListRootModule {}
