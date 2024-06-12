/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ErrorModel } from '../../../model/misc.model';
import {
  ClearSearch,
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';
import { SearchConfig } from '../../model/search-config';

export const SEARCH_PRODUCTS = '[Product] Search Products';
export const SEARCH_PRODUCTS_FAIL = '[Product] Search Products Fail';
export const SEARCH_PRODUCTS_SUCCESS = '[Product] Search Products Success';
export const GET_PRODUCT_SUGGESTIONS = '[Product] Get Product Suggestions';
export const GET_PRODUCT_SUGGESTIONS_SUCCESS =
  '[Product] Get Product Suggestions Success';
export const GET_PRODUCT_SUGGESTIONS_FAIL =
  '[Product] Get Product Suggestions Fail';
export const CLEAR_PRODUCT_SEARCH_RESULT =
  '[Product] Clear Product Search Result';

export const GET_PRODUCTS_LIST = '[Product] Get Products List';
export const GET_PRODUCTS_LIST_SUCCESS = '[Product] Get Products List Success';
export const GET_PRODUCTS_LIST_FAIL = '[Product] Get Products List Fail';

export class SearchProducts implements Action {
  readonly type = SEARCH_PRODUCTS;
  constructor(
    public payload: { queryText: string; searchConfig?: SearchConfig },
    public auxiliary?: boolean
  ) {}
}

export class SearchProductsFail implements Action {
  readonly type = SEARCH_PRODUCTS_FAIL;
  constructor(
    public payload: ErrorModel | undefined,
    public auxiliary?: boolean
  ) {}
}

export class SearchProductsSuccess implements Action {
  readonly type = SEARCH_PRODUCTS_SUCCESS;
  constructor(
    public payload: ProductSearchPage,
    public auxiliary?: boolean
  ) {}
}

export class GetProductSuggestions implements Action {
  readonly type = GET_PRODUCT_SUGGESTIONS;
  constructor(public payload: { term: string; searchConfig?: SearchConfig }) {}
}

export class GetProductSuggestionsSuccess implements Action {
  readonly type = GET_PRODUCT_SUGGESTIONS_SUCCESS;
  constructor(public payload: Suggestion[]) {}
}

export class GetProductSuggestionsFail implements Action {
  readonly type = GET_PRODUCT_SUGGESTIONS_FAIL;
  constructor(public payload: ErrorModel | undefined) {}
}

export class GetProductsList implements Action {
  readonly type = GET_PRODUCTS_LIST;
  constructor(public payload: { codeList: string[]; componentId: string }) {}
}

export class GetProductsListSuccess implements Action {
  readonly type = GET_PRODUCTS_LIST_SUCCESS;
  constructor(public payload: {results: ProductSearchPage; componentId: string } ) {}
}

export class GetProductsListFail implements Action {
  readonly type = GET_PRODUCTS_LIST_FAIL;
  constructor(public payload: ErrorModel | undefined) {}
}

export class ClearProductSearchResult implements Action {
  readonly type = CLEAR_PRODUCT_SEARCH_RESULT;
  constructor(
    public payload: ClearSearch = {
      clearPageResults: false,
      clearSearchboxResults: false,
    }
  ) {}
}

// action types
export type ProductSearchAction =
  | SearchProducts
  | SearchProductsFail
  | SearchProductsSuccess
  | GetProductSuggestions
  | GetProductSuggestionsSuccess
  | GetProductSuggestionsFail
  | GetProductsList
  | GetProductsListSuccess
  | GetProductsListFail
  | ClearProductSearchResult;
