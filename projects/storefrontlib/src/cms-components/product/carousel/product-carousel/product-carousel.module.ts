import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CarouselModule } from 'projects/storefrontlib/src/shared/components/carousel/carousel.module';
import { ProductCarouselComponent } from './product-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductCarouselComponent: {
          selector: 'cx-product-carousel',
        },
      },
    }),
  ],
  declarations: [ProductCarouselComponent],
  entryComponents: [ProductCarouselComponent],
  exports: [ProductCarouselComponent],
})
export class ProductCarouselModule {}
