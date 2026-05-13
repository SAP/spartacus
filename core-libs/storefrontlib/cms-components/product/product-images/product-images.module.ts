/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet';
import { CarouselScrollingModule } from '../../../shared/components/carousel-scrolling/carousel-scrolling.module';
import { CarouselModule } from '../../../shared/components/carousel';
import { MediaModule } from '../../../shared/components/media/media.module';
import { LcpContextDirectiveModule } from '../../../shared/lcp-context/lcp-context-directive.module';
import { ProductImagesComponent } from './product-images.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    OutletModule,
    CarouselModule,
    CarouselScrollingModule,
    LcpContextDirectiveModule,
    ProductImagesComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductImagesComponent: {
          component: ProductImagesComponent,
        },
      },
    }),
  ],
  exports: [ProductImagesComponent],
})
export class ProductImagesModule {}
