import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';
import { OccModule } from '../../occ/occ.module';
import { defaultOccProductConfig, OccProductConfig } from './product-config';
import { ConfigModule, Config } from '../../config/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OccModule,
    ConfigModule.withConfig(defaultOccProductConfig)
  ],
  providers: [
    OccProductService,
    OccProductSearchService,
    { provide: OccProductConfig, useExisting: Config }
  ]
})
export class ProductOccModule {}
