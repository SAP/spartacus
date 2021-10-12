import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ImageZoomModule } from '../image-zoom-components.module';
import {
  CarouselModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { ImageZoomProductImagesComponent } from './image-zoom-product-images.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    OutletModule,
    ImageZoomModule,
    CarouselModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductImagesComponent: {
          component: ImageZoomProductImagesComponent,
        },
      },
    }),
  ],
  declarations: [ImageZoomProductImagesComponent],
  exports: [ImageZoomProductImagesComponent],
})
export class ProductImagesModule {}
