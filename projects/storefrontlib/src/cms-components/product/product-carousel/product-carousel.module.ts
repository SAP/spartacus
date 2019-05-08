import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  ProductService,
  UrlModule,
} from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaModule } from '../../../shared/components/media/media.module';
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
          ],
        },
      },
    }),
    UrlModule,
  ],
  declarations: [ProductCarouselComponent],
  entryComponents: [ProductCarouselComponent],
  exports: [ProductCarouselComponent],
})
export class ProductCarouselModule {}
