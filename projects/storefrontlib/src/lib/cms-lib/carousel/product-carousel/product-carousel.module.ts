import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  ProductService,
  UrlTranslationModule,
} from '@spartacus/core';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { MediaModule } from '../../../ui/components/media/media.module';
import { SharedCarouselService } from '../shared-carousel.service';
import { ProductCarouselComponent } from './product-carousel.component';
import { ProductCarouselService } from './product-carousel.component.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductCarouselComponent: {
          selector: 'cx-product-carousel',
          providers: [
            {
              provide: ProductCarouselService,
              useClass: ProductCarouselService,
              deps: [CmsComponentData, ProductService],
            },
            {
              provide: SharedCarouselService,
              useClass: SharedCarouselService,
              deps: [],
            },
          ],
        },
      },
    }),
    UrlTranslationModule,
  ],
  declarations: [ProductCarouselComponent],
  entryComponents: [ProductCarouselComponent],
  exports: [ProductCarouselComponent],
})
export class ProductCarouselModule {}
