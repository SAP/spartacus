import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';
import { CmsConfig, ConfigModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    CmsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductDetails: { selector: 'cx-product-details' }
      }
    })
  ]
})
export class ProductModule {}
