/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProductMultiDimensionalListItemDetailsComponent } from './product-multi-dimensional-list-item-details.component';

@NgModule({
    imports: [I18nModule, NgIf, AsyncPipe, StarRatingModule, ProductMultiDimensionalListItemDetailsComponent],
    exports: [ProductMultiDimensionalListItemDetailsComponent],
})
export class ProductMultiDimensionalListItemDetailsModule {}
