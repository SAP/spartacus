/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { BundleCarouselModule } from './bundle-carousel/bundle-carousel.module';
import { BundleMainModule } from './bundle-main/bundle-main.module';
import { CartBundleListRowComponent } from './cart-bundle-list-row/cart-bundle-list-row.component';
import { ProductDetailsDialogModule } from './product-details-dialog';

@NgModule({
  imports: [
    I18nModule,
    BundleCarouselModule,
    BundleMainModule,
    ProductDetailsDialogModule,
  ],
  declarations: [CartBundleListRowComponent],
  exports: [CartBundleListRowComponent],
})
export class BundleComponentsModule {}
