/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductMultiDimensionalSelectorComponentsModule } from './components/product-multi-dimensional-selector-components.module';
import { ProductMultiDimensionalSelectorOccModule } from './occ/product-multi-dimensional-selector-occ.module';

@NgModule({
  imports: [
    ProductMultiDimensionalSelectorOccModule,
    ProductMultiDimensionalSelectorComponentsModule,
  ],
})
export class ProductMultiDimensionalSelectorModule {}
