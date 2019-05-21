import {
  ProductSearchPage,
  Suggestion,
} from '../../model/product-search.model';
import { Product, ProductReference, Review } from '../../model/product.model';
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
  references: ProductReferencesState;
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
