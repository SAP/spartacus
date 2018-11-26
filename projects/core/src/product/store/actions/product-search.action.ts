import { Action } from '@ngrx/store';
import { SearchConfig } from '../../model/search-config';

export const SEARCH_PRODUCTS = '[Product] Search Products';
export const SEARCH_PRODUCTS_FAIL = '[Product] Search Products Fail';
export const SEARCH_PRODUCTS_SUCCESS = '[Product] Search Products Success';
export const GET_PRODUCT_SUGGESTIONS = '[Product] Get Product Suggestions';
export const GET_PRODUCT_SUGGESTIONS_SUCCESS =
  '[Product] Get Product Suggestions Success';
export const GET_PRODUCT_SUGGESTIONS_FAIL =
  '[Product] Get Product Suggestions Fail';
export const CLEAN_PRODUCT_SEARCH = '[Product] Clean Product Search State';

export class SearchProducts implements Action {
  readonly type = SEARCH_PRODUCTS;
  constructor(
    public payload: { queryText: string; searchConfig: SearchConfig },
    public auxiliary?: boolean
  ) {}
}

export class SearchProductsFail implements Action {
  readonly type = SEARCH_PRODUCTS_FAIL;
  constructor(public payload: any, public auxiliary?: boolean) {}
}

export class SearchProductsSuccess implements Action {
  readonly type = SEARCH_PRODUCTS_SUCCESS;
  constructor(public payload: any, public auxiliary?: boolean) {}
}

export class GetProductSuggestions implements Action {
  readonly type = GET_PRODUCT_SUGGESTIONS;
  constructor(public payload: { term: string; searchConfig: SearchConfig }) {}
}

export class GetProductSuggestionsSuccess implements Action {
  readonly type = GET_PRODUCT_SUGGESTIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProductSuggestionsFail implements Action {
  readonly type = GET_PRODUCT_SUGGESTIONS_FAIL;
  constructor(public payload: any) {}
}

export class CleanProductSearchState implements Action {
  readonly type = CLEAN_PRODUCT_SEARCH;
  constructor() {}
}

// action types
export type ProductSearchAction =
  | SearchProducts
  | SearchProductsFail
  | SearchProductsSuccess
  | GetProductSuggestions
  | GetProductSuggestionsSuccess
  | GetProductSuggestionsFail
  | CleanProductSearchState;
