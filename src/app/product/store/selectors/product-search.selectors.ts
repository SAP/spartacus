import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProductSearch from '../reducers/product-search.reducer';

export const getProductSearchState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.search
);

export const getSearchResults = createSelector(
  getProductSearchState,
  fromProductSearch.getSearchResults
);

export const getProductSuggestions = createSelector(
  getProductSearchState,
  fromProductSearch.getProductSuggestions
);
