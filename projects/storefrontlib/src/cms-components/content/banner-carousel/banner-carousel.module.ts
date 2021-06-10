import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { CarouselModule, MediaModule } from '../../../shared/components/index';
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
