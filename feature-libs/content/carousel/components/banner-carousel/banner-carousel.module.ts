import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { MediaModule, PageComponentModule } from '@spartacus/storefront';
import { CarouselModule } from '../carousel/carousel.module';
import { BannerCarouselComponent } from './banner-carousel.component';

@NgModule({
  imports: [CommonModule, PageComponentModule, CarouselModule, MediaModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        RotatingImagesComponent: {
          component: BannerCarouselComponent,
        },
      },
    } as CmsConfig),
  ],
  declarations: [BannerCarouselComponent],
  exports: [BannerCarouselComponent],
})
export class BannerCarouselModule {}
