import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Config, ConfigModule } from '@spartacus/core';

import { CmsModule } from './../cms/cms.module';
import { MediaModule } from './../ui/components/media/media.module';

import { defaultProductConfig, ProductModuleConfig } from './product-config';

import { guards } from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    CmsModule,
    ConfigModule.withConfig(defaultProductConfig)
  ],
  providers: [...guards, { provide: ProductModuleConfig, useExisting: Config }]
})
export class ProductModule {}
