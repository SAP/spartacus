import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { PageComponentModule } from 'projects/storefrontlib/src/cms-structure';
import { CarouselModule, MediaModule } from 'projects/storefrontlib/src/shared';
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
