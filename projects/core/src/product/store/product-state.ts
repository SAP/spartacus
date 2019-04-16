import {
  Product,
  ProductReference,
  ProductSearchPage,
  Review,
  Suggestion,
} from '../../occ/occ-models/occ.models';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const PRODUCT_FEATURE = 'product';
export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductsState;
}

export interface ProductsState {
  details: EntityLoaderState<Product>;
  search: ProductsSearchState;
  reviews: ProductReviewsState;
  productReferences: ProductReferencesState;
}

export interface ProductsSearchState {
  results: ProductSearchPage;
  suggestions: Suggestion[];
  auxResults: ProductSearchPage;
}

export interface ProductReviewsState {
  productCode: string;
  list: Review[];
}

export interface ProductReferencesState {
  productCode: string;
  list: ProductReference[];
}
