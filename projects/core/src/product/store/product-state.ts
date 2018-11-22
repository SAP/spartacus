export const PRODUCT_FEATURE = 'product';
import { Review, Suggestion, ProductList } from '../../occ-models';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductState;
}

export interface ProductState {
  entities: { [productCode: string]: any };
}

export interface ProductsState {
  details: ProductState;
  search: ProductsSearchState;
  reviews: ProductReviewsState;
}

export interface ProductsSearchState {
  results: Review[];
  suggestions: Suggestion[];
  auxResults: ProductList;
  loading: boolean;
}

export interface ProductReviewsState {
  productCode: string;
  list: Review[];
}
