import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from 'projects/storefrontlib/src/layout';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { CarouselModule } from '../../../shared/components/carousel/index';
import { MediaModule } from '../../../shared/components/media/media.module';
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
  entryComponents: [ProductImagesComponent],
  exports: [ProductImagesComponent],
})
export class ProductImagesModule {}
