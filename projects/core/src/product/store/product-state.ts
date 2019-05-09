import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { Review, Product } from '../../model/product.model';
import {
  Suggestion,
  ProductSearchPage,
} from '../../model/product-search.model';

export const PRODUCT_FEATURE = 'product';
export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export interface StateWithProduct {
  [PRODUCT_FEATURE]: ProductsState;
}

export interface ProductsState {
  details: EntityLoaderState<Product>;
  search: ProductsSearchState;
  reviews: ProductReviewsState;
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
