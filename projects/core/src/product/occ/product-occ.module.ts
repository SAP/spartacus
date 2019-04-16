import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../config/index';
import { OccModule } from '../../occ/occ.module';
import { defaultOccProductConfig } from '../config/product-config';
import { PRODUCT_NORMALIZER } from '../connectors/product/converters';
import { ProductAdapter } from '../connectors/product/product.adapter';
import { PRODUCT_REFERENCES_NORMALIZER } from '../connectors/references/converters';
import { ProductReferencesAdapter } from '../connectors/references/product-references.adapter';
import { PRODUCT_REVIEWS_NORMALIZER } from '../connectors/reviews/converters';
import { ProductReviewsAdapter } from '../connectors/reviews/product-reviews.adapter';
// import { ProductReferenceNormalizer } from './converters/product-reference-normalizer';
import { OccProductReferencesListNormalizer } from './converters/occ-product-references-list-normalizer';
import { OccProductReviewsListNormalizer } from './converters/occ-product-reviews-list-normalizer';
import { ProductImageNormalizer } from './converters/product-image-normalizer';
import { OccProductReferencesAdapter } from './occ-product-references.adapter';
import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import { OccProductAdapter } from './occ-product.adapter';
import { ProductSearchLoaderService } from './product-search.service';

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
      provide: ProductReferencesAdapter,
      useClass: OccProductReferencesAdapter,
    },
    {
      provide: PRODUCT_REFERENCES_NORMALIZER,
      useClass: OccProductReferencesListNormalizer,
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
