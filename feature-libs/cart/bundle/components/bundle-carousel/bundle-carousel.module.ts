/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OutletModule, CarouselModule } from '@spartacus/storefront';
import { BundleCarouselComponent } from './bundle-carousel.component';
import { CartBaseRootModule } from 'feature-libs/cart/base/root/cart-base-root.module';

@NgModule({
  imports: [CommonModule, OutletModule, I18nModule, CarouselModule, CartBaseRootModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BundleCarouselComponent: {
          component: BundleCarouselComponent,
        },
      },
    })
  ],
  declarations: [BundleCarouselComponent],
  exports: [BundleCarouselComponent],
})
export class BundleCarouselModule {}
