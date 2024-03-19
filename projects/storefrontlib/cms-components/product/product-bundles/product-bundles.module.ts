/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { CarouselModule } from '../../../shared/components/carousel/index';
import { ProductBundlesComponent } from './product-bundles.component';
import { CartBaseRootModule } from '@spartacus/cart/base/root';
// import { ProductDetailsDialogModule } from '../product-details-dialog/product-details-dialog.module';

@NgModule({
  imports: [CommonModule, OutletModule, I18nModule, CarouselModule, CartBaseRootModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductBundlesComponent: {
          component: ProductBundlesComponent,
        },
      },
    })
  ],
  declarations: [ProductBundlesComponent],
  exports: [ProductBundlesComponent],
})
export class ProductBundlesModule {}
