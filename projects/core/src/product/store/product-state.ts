export const PRODUCT_FEATURE = 'product';

import {
  Product,
  Review,
  Suggestion,
  ProductSearchPage
} from '../../occ/occ-models';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductState;
}

export interface ProductEntity {
  error: boolean;
  loading: boolean;
  value?: Product;
}

export interface ProductState {
  [productCode: string]: ProductEntity;
}

export interface ProductsState {
  details: ProductState;
  search: ProductsSearchState;
  reviews: ProductReviewsState;
}

export interface ProductsSearchState {
  results: ProductSearchPage;
  suggestions: Suggestion[];
  auxResults: ProductSearchPage;
  loading: boolean;
}

export interface ProductReviewsState {
  productCode: string;
  list: Review[];
}
