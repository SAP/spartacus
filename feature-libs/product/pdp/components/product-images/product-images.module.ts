import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '@spartacus/content/carousel';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { MediaModule, OutletModule } from '@spartacus/storefront';
import { KeyboardFocusModule } from 'projects/storefrontlib/src/layout';
import { ProductImagesComponent } from './product-images.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    OutletModule,
    CarouselModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductImagesComponent: {
          component: ProductImagesComponent,
        },
      },
    }),
  ],
  declarations: [ProductImagesComponent],
})
export class ProductImagesModule {}
