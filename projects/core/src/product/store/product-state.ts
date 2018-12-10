export const PRODUCT_FEATURE = 'product';
import { Review, Suggestion, ProductSearchPage } from '../../occ-models';

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
  results: ProductSearchPage;
  suggestions: Suggestion[];
  auxResults: ProductSearchPage;
  loading: boolean;
}

export interface ProductReviewsState {
  productCode: string;
  list: Review[];
}
