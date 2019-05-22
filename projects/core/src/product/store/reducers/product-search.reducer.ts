import {
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';
import * as fromProductsSearch from '../actions/product-search.action';
import { ProductsSearchState } from '../product-state';

export const initialState: ProductsSearchState = {
  results: {},
  suggestions: [],
  auxResults: {},
};

export function reducer(
  state = initialState,
  action: fromProductsSearch.ProductSearchAction
): ProductsSearchState {
  switch (action.type) {
    case fromProductsSearch.SEARCH_PRODUCTS_SUCCESS: {
      const results = action.payload;
      const res = action.auxiliary ? { auxResults: results } : { results };
      return {
        ...state,
        ...res,
      };
    }

    case fromProductsSearch.GET_PRODUCT_SUGGESTIONS_SUCCESS: {
      const suggestions: Suggestion[] = action.payload;

      return {
        ...state,
        suggestions,
      };
    }

    case fromProductsSearch.CLEAR_PRODUCT_SEARCH: {
      return {
        ...state,
        results: action.payload.clearPageResults ? {} : state.results,
        suggestions: action.payload.clearSearchboxResults
          ? []
          : state.suggestions,
        auxResults: action.payload.clearSearchboxResults
          ? {}
          : state.auxResults,
      };
    }
  }
  return state;
}

export const getSearchResults = (
  state: ProductsSearchState
): ProductSearchPage => state.results;
export const getAuxSearchResults = (
  state: ProductsSearchState
): ProductSearchPage => state.auxResults;
export const getProductSuggestions = (
  state: ProductsSearchState
): Suggestion[] => state.suggestions;
