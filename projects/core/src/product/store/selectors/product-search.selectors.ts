/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  ProductSearchPage, ProductsListMap,
  Suggestion
} from '../../../model/product-search.model';
import {
  ProductsSearchState,
  ProductsState,
  StateWithProduct,
} from '../product-state';
import * as fromProductSearch from '../reducers/product-search.reducer';
import { getProductsState } from './feature.selector';

export const getProductsSearchState: MemoizedSelector<
  StateWithProduct,
  ProductsSearchState
> = createSelector(getProductsState, (state: ProductsState) => state.search);

export const getSearchResults: MemoizedSelector<
  StateWithProduct,
  ProductSearchPage
> = createSelector(getProductsSearchState, fromProductSearch.getSearchResults);

export const getAuxSearchResults: MemoizedSelector<
  StateWithProduct,
  ProductSearchPage
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

export const getProductsListResults: MemoizedSelector<
  StateWithProduct,
  ProductsListMap
> = createSelector(
  getProductsSearchState,
  fromProductSearch.getProductsListResults
);
