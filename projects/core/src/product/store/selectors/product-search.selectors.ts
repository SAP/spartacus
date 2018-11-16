import { createSelector, MemoizedSelector } from '@ngrx/store';

import { getProductsState } from './feature.selector';
import * as fromProductSearch from '../reducers/product-search.reducer';
import {
  ProductsSearchState,
  ProductsState,
  StateWithProduct
} from '../product-state';

export const getProductsSearchState: MemoizedSelector<
  StateWithProduct,
  ProductsSearchState
> = createSelector(getProductsState, (state: ProductsState) => state.search);

export const getSearchResults: MemoizedSelector<any, any> = createSelector(
  getProductsSearchState,
  fromProductSearch.getSearchResults
);

export const getAuxSearchResults: MemoizedSelector<any, any> = createSelector(
  getProductsSearchState,
  fromProductSearch.getAuxSearchResults
);

export const getProductSuggestions: MemoizedSelector<
  any,
  any[]
> = createSelector(
  getProductsSearchState,
  fromProductSearch.getProductSuggestions
);
