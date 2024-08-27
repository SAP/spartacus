/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductMultiDimensionalListRootModule } from '@spartacus/product-multi-dimensional/list/root';
import { ProductMultiDimensionalListModule } from '@spartacus/product-multi-dimensional/list';

@NgModule({
  imports: [
    ProductMultiDimensionalListRootModule,
    ProductMultiDimensionalListModule,
  ],
})
export class ProductMultiDimensionalListFeatureModule {}
