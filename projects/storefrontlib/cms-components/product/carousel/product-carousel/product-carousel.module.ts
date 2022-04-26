import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CarouselModule,
  MediaModule,
} from '../../../../shared/components/index';
import { ProductCarouselComponent } from './product-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MediaModule,
    RouterModule,
    UrlModule,
    I18nModule,
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
  declarations: [ProductCarouselComponent],
  exports: [ProductCarouselComponent],
})
export class ProductCarouselModule {}
