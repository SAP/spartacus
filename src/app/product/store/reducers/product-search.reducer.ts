import { GET_PRODUCT_SUGGESTIONS_SUCCESS } from './../actions/product-search.action';
import * as fromProductSearch from '../actions/product-search.action';

export interface ProductSearchState {
  results: any;
  suggestions: any[];
  loading: boolean;
}

export const initialState: ProductSearchState = {
  results: {},
  suggestions: [],
  loading: false
};

export function reducer(
  state = initialState,
  action: fromProductSearch.ProductSearchAction
): ProductSearchState {
  switch (action.type) {
    case fromProductSearch.SEARCH_PRODUCTS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProductSearch.SEARCH_PRODUCTS_SUCCESS: {
      const results = action.payload;

      if (state.loading) {
        return {
          ...state,
          results,
          loading: false
        };
      } else {
        return state;
      }
    }

    case fromProductSearch.GET_PRODUCT_SUGGESTIONS_SUCCESS: {
      const suggestions = action.payload;

      return {
        ...state,
        suggestions
      };
    }

    case fromProductSearch.CLEAN_PRODUCT_SEARCH: {
      return initialState;
    }
  }
  return state;
}

export const getSearchResults = (state: ProductSearchState) => state.results;
export const getSearchResultsLoading = (state: ProductSearchState) =>
  state.loading;
export const getProductSuggestions = (state: ProductSearchState) =>
  state.suggestions;
