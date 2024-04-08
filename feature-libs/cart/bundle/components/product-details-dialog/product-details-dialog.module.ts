/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule, IconModule, ProductImagesModule, ProductIntroModule, ProductSummaryModule, TabParagraphContainerModule, PageComponentModule, OutletModule } from '@spartacus/storefront';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { defaultProductDetailsLayoutConfig } from './default-product-details-layout.config';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    I18nModule,
    KeyboardFocusModule,
    ProductImagesModule,
    ProductIntroModule,
    ProductSummaryModule,
    PageComponentModule,
    TabParagraphContainerModule,
    OutletModule
  ],
  providers: [provideDefaultConfig(defaultProductDetailsLayoutConfig)],
  declarations: [ProductDetailsDialogComponent, ProductTabsComponent],
  exports: [ProductDetailsDialogComponent],
})
export class ProductDetailsDialogModule {}
