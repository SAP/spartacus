import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';

// guards
import { guards } from './guards/index';


// converter
import { converterServices } from './converters/index';

import { ProductListModule } from './components/product-list/product-list.module';
import { ProductDetailsModule } from './components/product-details/product-details.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    CmsModule,
  ],
  exports: [ProductListModule, ProductDetailsModule],
  providers: [...guards, ...converterServices]
})
export class ProductModule {}
