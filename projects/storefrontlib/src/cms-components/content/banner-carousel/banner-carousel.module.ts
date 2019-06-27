import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CarouselModule, MediaModule } from 'projects/storefrontlib/src/shared';
import { PageComponentModule } from '../../../cms-structure/page/index';
import { BannerCarouselComponent } from './banner-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        RotatingImagesComponent: {
          component: BannerCarouselComponent,
        },
      },
    } as CmsConfig),
    PageComponentModule,
    CarouselModule,
    MediaModule,
  ],
  declarations: [BannerCarouselComponent],
  entryComponents: [BannerCarouselComponent],
})
export class BannerCarouselModule {}
