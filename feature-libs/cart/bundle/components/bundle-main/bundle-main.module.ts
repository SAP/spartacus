/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule
} from '@spartacus/core';
import {
  IconModule,
  LayoutModule,
  ListNavigationModule,
  MediaModule,
  OutletModule,
  ProductListModule,
  StarRatingModule
} from '@spartacus/storefront';
import { BundleProductGridItemComponent } from './components/bundle-product-grid-item/bundle-product-grid-item.component';
import { BundleProductListItemComponent } from './components/bundle-product-list-item/bundle-product-list-item.component';
import { BundleProductListComponent } from './components/bundle-product-list/bundle-product-list.component';
import { BundleProgressComponent } from './components/bundle-progress/bundle-progress.component';
import { BundleProgressService } from './components/bundle-progress/bundle-progress.service';
import { BundleSelectProductComponent } from './components/bundle-select-product/bundle-select-product.component';
import { BundleSummaryComponent } from './components/bundle-summary/bundle-summary.component';
import { SelectedProductPipe } from './pipes/selected-product.pipe';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    MediaModule,
    UrlModule,
    RouterModule,
    IconModule,
    LayoutModule,
    OutletModule,
    ListNavigationModule,
    StarRatingModule,
    ProductListModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BundleAllowedProductListComponent: {
          component: BundleProductListComponent,
        },
      },
    }),
    BundleProgressService,
  ],
  declarations: [
    BundleProductListComponent,
    BundleProductListItemComponent,
    BundleProductGridItemComponent,
    BundleSelectProductComponent,
    BundleSummaryComponent,
    BundleProgressComponent,
    SelectedProductPipe,
  ],
  exports: [BundleProductListComponent],
})
export class BundleMainModule {}
