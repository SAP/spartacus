import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Config, ConfigModule } from '@spartacus/core';

import { CmsModule } from './../cms/cms.module';
import { MediaModule } from './../ui/components/media/media.module';

import { defaultProductConfig, ProductModuleConfig } from './product-config';

import { guards } from './guards/index';
import { ProductDetailsModule } from './components/product-details/product-details.module';
import { ProductListModule } from './components/product-list/product-list.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    CmsModule,
    ConfigModule.withConfig(defaultProductConfig)
  ],
  exports: [ProductListModule, ProductDetailsModule],
  providers: [...guards, { provide: ProductModuleConfig, useExisting: Config }]
})
export class ProductModule {}
