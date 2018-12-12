export const PRODUCT_FEATURE = 'product';
import { Review, Suggestion, ProductSearchPage, Product } from '../../occ-models/occ.models';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductState;
}

export interface ProductEntity {
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
