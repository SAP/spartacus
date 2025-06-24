/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '../../../../cms-structure';
import {
  CarouselModule,
  MediaModule,
} from '../../../../shared/components/index';
import { LcpContextDirectiveModule } from '../../../../shared/directives/lcp-context/lcp-context-directive.module';
import { ProductCarouselItemComponent } from '../product-carousel-item/product-carousel-item.component';
import { ProductCarouselComponent } from './product-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MediaModule,
    RouterModule,
    UrlModule,
    I18nModule,
    PageComponentModule,
    LcpContextDirectiveModule,
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
  declarations: [ProductCarouselComponent, ProductCarouselItemComponent],
  exports: [ProductCarouselComponent, ProductCarouselItemComponent],
})
export class ProductCarouselModule {}
