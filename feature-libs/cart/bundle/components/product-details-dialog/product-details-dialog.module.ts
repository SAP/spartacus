/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
    IconModule,
    ProductImagesModule,
    ProductIntroModule,
    ProductSummaryModule,
    ProductTabsModule,
    SpinnerModule,
} from '@spartacus/storefront';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    UrlModule,
    IconModule,
    I18nModule,
    ProductSummaryModule,
    ProductIntroModule,
    ProductImagesModule,
    ProductTabsModule,
  ],
  declarations: [ProductDetailsDialogComponent],
  exports: [ProductDetailsDialogComponent],
})
export class ProductDetailsDialogModule {}
