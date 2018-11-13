import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProductSearch from '../reducers/product-search.reducer';
import { ProductsSearchState, ProductsState } from '../product-state';

export const getProductsSearchState: MemoizedSelector<
  any,
  ProductsSearchState
> = createSelector(
  fromFeature.getProductsState,
  (state: ProductsState) => state.search
);

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
