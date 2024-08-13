/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductMultiDimensionalPriceRangeComponent } from './product-multi-dimensional-price-range.component';
import { I18nModule } from '@spartacus/core';
import {StarRatingModule} from '@spartacus/storefront';
import { AsyncPipe, NgIf } from '@angular/common';

@NgModule({
  imports: [I18nModule, NgIf, AsyncPipe, StarRatingModule],
  declarations: [ProductMultiDimensionalPriceRangeComponent],
  exports: [ProductMultiDimensionalPriceRangeComponent],
})
export class ProductMultiDimensionalPriceRangeModule {}
