import { ProductsSearchEffects } from './product-search.effect';
import { ProductEffects } from './product.effect';
import { ProductReviewsEffects } from './product-reviews.effect';

export const effects: any[] = [
  ProductsSearchEffects,
  ProductEffects,
  ProductReviewsEffects
];

export * from './product-search.effect';
export * from './product.effect';
export * from './product-reviews.effect';
