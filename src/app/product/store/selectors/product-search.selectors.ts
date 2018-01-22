import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProductSearch from '../reducers/product-search.reducer';

export const getProductsSearchState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.textSearch
);

export const getSearchResults = createSelector(
  getProductsSearchState,
  fromProductSearch.getSearchResults
);

export const getProductSuggestions = createSelector(
  getProductsSearchState,
  fromProductSearch.getProductSuggestions
);
