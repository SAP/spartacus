import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductSearchLoaderService } from './product-search.service';
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
import { OccProductAdapter } from './occ-product.adapter';
import { ProductAdapter } from '../connectors/product/product.adapter';
import { PRODUCT_NORMALIZER } from '../connectors/product/converters';
import { ProductImageNormalizer } from './converters/product-image-normalizer';
import { ProductReferenceNormalizer } from './converters/product-reference-normalizer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OccModule,
    ConfigModule.withConfig(defaultOccProductConfig),
  ],
  providers: [
    ProductSearchLoaderService,
    {
      provide: ProductAdapter,
      useClass: OccProductAdapter,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useExisting: ProductImageNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useClass: ProductReferenceNormalizer,
      multi: true,
    },
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
