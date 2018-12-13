import { EntityState } from '../../store-entities/entity-state';

export const PRODUCT_FEATURE = 'product';
import {
  Review,
  Suggestion,
  ProductSearchPage,
  Product
} from '../../occ-models/occ.models';

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
