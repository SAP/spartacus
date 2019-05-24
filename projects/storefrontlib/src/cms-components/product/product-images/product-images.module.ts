import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { MediaModule } from '../../../shared/components/media/media.module';
import { ProductImagesComponent } from './product-images.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    OutletModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSProductImages: {
          selector: 'cx-product-images',
        },
      },
    }),
  ],
  declarations: [ProductImagesComponent],
  entryComponents: [ProductImagesComponent],
})
export class ProductImagesModule {}
