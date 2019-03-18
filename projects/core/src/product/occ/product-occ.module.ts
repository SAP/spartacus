import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductLoaderService } from './product.service';
import { ProductSearchLoaderService } from './product-search.service';
import { OccModule } from '../../occ/occ.module';
import {
  defaultOccProductConfig,
  OccProductConfig
} from '../config/product-config';
import { ConfigModule, Config } from '../../config/index';
import { ProductReviewsLoaderService } from './product-reviews.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OccModule,
    ConfigModule.withConfig(defaultOccProductConfig)
  ],
  providers: [
    ProductLoaderService,
    ProductSearchLoaderService,
    ProductReviewsLoaderService,
    { provide: OccProductConfig, useExisting: Config }
  ]
})
export class ProductOccModule {}
