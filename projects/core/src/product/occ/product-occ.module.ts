import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductLoaderService } from './product.service';
import { ProductSearchLoaderService } from './product-search.service';
import { OccModule } from '../../occ/occ.module';
import { defaultOccProductConfig } from '../config/product-config';
import { ConfigModule } from '../../config/index';
import { ProductReviewsLoaderService } from './product-reviews.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OccModule,
    ConfigModule.withConfig(defaultOccProductConfig),
  ],
  providers: [
    ProductLoaderService,
    ProductSearchLoaderService,
    ProductReviewsLoaderService,
  ],
})
export class ProductOccModule {}
