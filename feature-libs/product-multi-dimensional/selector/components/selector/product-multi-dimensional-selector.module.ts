/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { MediaModule } from '@spartacus/storefront';
import { ProductMultiDimensionalSelectorComponent } from './product-multi-dimensional-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, MediaModule],
  declarations: [ProductMultiDimensionalSelectorComponent],
  exports: [ProductMultiDimensionalSelectorComponent],
})
export class ProductMultiDimensionalSelectorModule {}
