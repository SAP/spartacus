import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '../../../../cms-structure/page/component/page-component.module';
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
    PageComponentModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductCarouselComponent: {
          component: ProductCarouselComponent,
          data: {
            composition: {
              inner: ['ProductAddToCartComponent'],
            },
          },
        },
      },
    }),
  ],
  declarations: [ProductCarouselComponent],
  exports: [ProductCarouselComponent],
})
export class ProductCarouselModule {}
