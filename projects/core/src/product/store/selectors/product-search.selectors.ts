import { createSelector, MemoizedSelector } from '@ngrx/store';

import { getProductsState } from './feature.selector';
import * as fromProductSearch from '../reducers/product-search.reducer';
import {
  ProductsSearchState,
  ProductsState,
  StateWithProduct
} from '../product-state';
import { ProductSearchPage, Suggestion } from '../../../occ-models/occ.models';

export const getProductsSearchState: MemoizedSelector<
  StateWithProduct,
  ProductsSearchState
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.search
);

export const getSearchResults: MemoizedSelector<StateWithProduct, ProductSearchPage> = createSelector(
  getProductsSearchState,
  fromProductSearch.getSearchResults
);

export const getAuxSearchResults: MemoizedSelector<StateWithProduct, ProductSearchPage> = createSelector(
  getProductsSearchState,
  fromProductSearch.getAuxSearchResults
);

export const getProductSuggestions: MemoizedSelector<
  StateWithProduct,
  Suggestion[]
> = createSelector(
  getProductsSearchState,
  fromProductSearch.getProductSuggestions
);
