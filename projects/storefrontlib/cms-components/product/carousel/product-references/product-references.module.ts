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
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CarouselScrollingModule } from '../../../../shared/components/carousel-scrolling/carousel-scrolling.module';
import { CarouselModule } from '../../../../shared/components/carousel/carousel.module';
import { MediaModule } from '../../../../shared/components/media/media.module';
import { ProductReferencesComponent } from './product-references.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    CarouselScrollingModule,
    MediaModule,
    RouterModule,
    UrlModule,
    FeaturesConfigModule,
    ProductReferencesComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductReferencesComponent: {
          component: ProductReferencesComponent,
        },
      },
    }),
  ],
  exports: [ProductReferencesComponent],
})
export class ProductReferencesModule {}
