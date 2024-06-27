/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductMultiDimensionalComponentsModule } from './components/product-multi-dimensional-components.module';
import { ProductMultiDimensionalOccModule } from './occ/product-multi-dimensional-occ.module';

@NgModule({
  imports: [
    ProductMultiDimensionalOccModule,
    ProductMultiDimensionalComponentsModule,
  ],
})
export class ProductMultiDimensionalModule {}
