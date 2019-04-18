import { ProductReferencesEffects } from './product-references.effect';
import { ProductReviewsEffects } from './product-reviews.effect';
import { ProductsSearchEffects } from './product-search.effect';
import { ProductEffects } from './product.effect';

export const effects: any[] = [
  ProductsSearchEffects,
  ProductEffects,
  ProductReviewsEffects,
  ProductReferencesEffects,
];

export * from './product-references.effect';
export * from './product-reviews.effect';
export * from './product-search.effect';
export * from './product.effect';
