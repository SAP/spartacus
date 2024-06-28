/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductMultiDimensionalIconsComponent } from './product-multi-dimensional-icons.component';
import { RouterModule } from '@angular/router';
import { MediaModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, MediaModule, I18nModule],
  declarations: [ProductMultiDimensionalIconsComponent],
  exports: [ProductMultiDimensionalIconsComponent],
})
export class ProductMultiDimensionalIconsModule {}
