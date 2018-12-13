import { EntityState } from '../../store-entities/entity-state';
import {
  Product,
  ProductSearchPage,
  Review,
  Suggestion
} from '../../occ-models/occ.models';

export const PRODUCT_FEATURE = 'product';
export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductsState;
}

export interface ProductsState {
  details: EntityState<Product>;
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
