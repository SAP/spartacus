import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../config/index';
import { OccModule } from '../../occ/occ.module';
import { defaultOccProductConfig } from '../config/product-config';
import { PRODUCT_REVIEWS_NORMALIZER } from '../connectors/reviews/converters';
import { ProductReviewsAdapter } from '../connectors/reviews/product-reviews.adapter';
import { OccProductReviewsListNormalizer } from './converters/occ-product-reviews-list-normalizer';
import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import { ProductSearchLoaderService } from './product-search.service';
import { ProductLoaderService } from './product.service';

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
      useClass: OccProductReviewsAdapter,
    },
    {
      provide: PRODUCT_REVIEWS_NORMALIZER,
      useClass: OccProductReviewsListNormalizer,
      multi: true,
    },
  ],
})
export class ProductOccModule {}
