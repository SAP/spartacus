import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UIProductSearchPage } from '../../model/product-search-page';

import {
  ProductsSearchState,
  ProductsState,
  StateWithProduct,
} from '../product-state';
import * as fromProductSearch from '../reducers/product-search.reducer';
import { Suggestion } from '../../../occ/occ-models/occ.models';

import { getProductsState } from './feature.selector';

export const getProductsSearchState: MemoizedSelector<
  StateWithProduct,
  ProductsSearchState
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.search
);

export const getSearchResults: MemoizedSelector<
  StateWithProduct,
  UIProductSearchPage
> = createSelector(
  getProductsSearchState,
  fromProductSearch.getSearchResults
);

export const getAuxSearchResults: MemoizedSelector<
  StateWithProduct,
  UIProductSearchPage
> = createSelector(
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
