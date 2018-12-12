export const PRODUCT_FEATURE = 'product';
import { Review, Suggestion, ProductSearchPage } from '../../occ-models/occ.models';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductState;
}

export interface ProductEntity {
  loading: boolean;
  value: any;
}

export interface ProductState {
  entities: {
    [productCode: string]: ProductEntity;
  };
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
