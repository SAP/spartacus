import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProductSearch from '../reducers/product-search.reducer';

export const getProductsSearchState: MemoizedSelector<
  any,
  fromProductSearch.ProductsSearchState
> = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.textSearch
);

export const getSearchResults: MemoizedSelector<any, any> = createSelector(
  getProductsSearchState,
  fromProductSearch.getSearchResults
);

export const getProductSuggestions: MemoizedSelector<
  any,
  any[]
> = createSelector(
  getProductsSearchState,
  fromProductSearch.getProductSuggestions
);
