import { CmsComponentData } from '@spartacus/storefront';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from './product-carousel.component';
import { MediaModule } from '../../ui/components/media/media.module';
import {
  ConfigModule,
  UrlTranslationModule,
  ProductService
} from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';
import { ProductCarouselService } from './product-carousel.service';

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
              deps: [CmsComponentData, ProductService]
            }
          ]
        }
      }
    }),
    UrlTranslationModule
  ],
  declarations: [ProductCarouselComponent],
  entryComponents: [ProductCarouselComponent],
  exports: [ProductCarouselComponent]
})
export class ProductCarouselModule {}
