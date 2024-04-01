/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartBaseModule } from '@spartacus/cart/base';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { BundleCarouselComponent } from './bundle-carousel.component';

@NgModule({
  imports: [CommonModule, I18nModule, CartBaseModule, AddToCartModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BundleCarouselComponent: {
          component: BundleCarouselComponent,
        },
      },
    }),
  ],
  declarations: [BundleCarouselComponent],
  exports: [BundleCarouselComponent],
})
export class BundleCarouselModule {}
