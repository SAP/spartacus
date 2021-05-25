import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { ProductAdapter } from '../../../product/connectors/product/product.adapter';
import { PRODUCT_REFERENCES_NORMALIZER } from '../../../product/connectors/references/converters';
import { ProductReferencesAdapter } from '../../../product/connectors/references/product-references.adapter';
import { ProductReviewsAdapter } from '../../../product/connectors/reviews/product-reviews.adapter';
import { PRODUCT_SEARCH_PAGE_NORMALIZER } from '../../../product/connectors/search/converters';
import { ProductSearchAdapter } from '../../../product/connectors/search/product-search.adapter';
import { OccProductReferencesListNormalizer } from './converters/occ-product-references-list-normalizer';
import { OccProductSearchPageNormalizer } from './converters/occ-product-search-page-normalizer';
import { ProductImageNormalizer } from './converters/product-image-normalizer';
import { OccProductReferencesAdapter } from './occ-product-references.adapter';
import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import { OccProductSearchAdapter } from './occ-product-search.adapter';
import { OccProductAdapter } from './occ-product.adapter';
import { ProductNameNormalizer } from './converters/product-name-normalizer';
import { defaultOccProductConfig } from './default-occ-product-config';
import './product-occ-config';
import { provideDefaultConfig } from '../../../config/config-providers';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccProductConfig),
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
      useExisting: ProductNameNormalizer,
      multi: true,
    },
    {
      provide: ProductReferencesAdapter,
      useClass: OccProductReferencesAdapter,
    },
    {
      provide: PRODUCT_REFERENCES_NORMALIZER,
      useExisting: OccProductReferencesListNormalizer,
      multi: true,
    },
    {
      provide: ProductSearchAdapter,
      useClass: OccProductSearchAdapter,
    },
    {
      provide: PRODUCT_SEARCH_PAGE_NORMALIZER,
      useExisting: OccProductSearchPageNormalizer,
      multi: true,
    },
    {
      provide: ProductReviewsAdapter,
      useClass: OccProductReviewsAdapter,
    },
  ],
})
export class ProductOccModule {}
