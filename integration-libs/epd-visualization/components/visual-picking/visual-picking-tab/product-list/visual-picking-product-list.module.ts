/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CarouselModule,
  IconModule,
  MediaModule,
  ProductReferencesModule,
} from '@spartacus/storefront';
import { CompactAddToCartModule } from './compact-add-to-cart/compact-add-to-cart.module';
import { PagedListModule } from './paged-list/paged-list.module';
import { VisualPickingProductListComponent } from './visual-picking-product-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductReferencesModule,
    MediaModule,
    IconModule,
    CarouselModule,
    PagedListModule,
    UrlModule,
    I18nModule,
    CompactAddToCartModule,
  ],
  declarations: [VisualPickingProductListComponent],
  exports: [VisualPickingProductListComponent],
})
export class VisualPickingProductListModule {}
