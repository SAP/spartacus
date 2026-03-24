/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '../../../../cms-structure';
import {
  CarouselModule,
  CarouselScrollingModule,
  MediaModule,
} from '../../../../shared/components/index';
import { LcpContextDirectiveModule } from '../../../../shared/lcp-context/lcp-context-directive.module';
import { ProductCarouselItemComponent } from '../product-carousel-item/product-carousel-item.component';
import { ProductCarouselComponent } from './product-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    CarouselScrollingModule,
    MediaModule,
    RouterModule,
    UrlModule,
    I18nModule,
    PageComponentModule,
    FeaturesConfigModule,
    LcpContextDirectiveModule,
    ProductCarouselComponent,
    ProductCarouselItemComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductCarouselComponent: {
          component: ProductCarouselComponent,
        },
      },
    }),
  ],
  exports: [ProductCarouselComponent, ProductCarouselItemComponent],
})
export class ProductCarouselModule {}
