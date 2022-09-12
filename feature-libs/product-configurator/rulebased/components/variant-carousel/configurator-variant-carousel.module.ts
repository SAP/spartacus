/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@commerce-storefront-toolset/core';
import { CarouselModule, ProductCarouselModule } from '@commerce-storefront-toolset/storefront';
import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    CarouselModule,
    ProductCarouselModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorVariantCarousel: {
          component: ConfiguratorVariantCarouselComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorVariantCarouselComponent],
  exports: [ConfiguratorVariantCarouselComponent],
})
export class ConfiguratorVariantCarouselModule {}
