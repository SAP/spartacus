import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductLoaderService } from './product.service';
import { ProductSearchLoaderService } from './product-search.service';
import { OccModule } from '../../occ/occ.module';
import { defaultOccProductConfig } from '../config/product-config';
import { ConfigModule } from '../../config/index';
import { ProductReviewsAdapter } from '../services/product-reviews-adapter';
import { OccProductReviewsAdapter } from './occ-product-reviews-adapter';
import { PRODUCT_REVIEWS_LIST_NORMALIZER } from '../services/product-reviews-connector';
import { OccProductReviewsListNormalizer } from './occ-product-reviews-list-normalizer';

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
    {
      provide: ProductReviewsAdapter,
      useClass: OccProductReviewsAdapter
    },
    {
      provide: PRODUCT_REVIEWS_LIST_NORMALIZER,
      useClass: OccProductReviewsListNormalizer,
      multi: true
    }
  ],
})
export class ProductOccModule {}
