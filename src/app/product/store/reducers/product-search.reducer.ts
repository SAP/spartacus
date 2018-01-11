import { GET_PRODUCT_SUGGESTIONS_SUCCESS } from './../actions/product-search.action';
import * as fromProductSearch from '../actions/product-search.action';

export interface ProductSearchState {
  results: any;
  suggestions: any[];
}

export const initialState: ProductSearchState = {
  results: {},
  suggestions: []
};

export function reducer(
  state = initialState,
  action: fromProductSearch.ProductSearchAction
): ProductSearchState {
  switch (action.type) {
    case fromProductSearch.SEARCH_PRODUCTS_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        results
      };
    }

    case fromProductSearch.GET_PRODUCT_SUGGESTIONS_SUCCESS: {
      const suggestions = action.payload;

      return {
        ...state,
        suggestions
      };
    }
  }
  return state;
}

export const getSearchResults = (state: ProductSearchState) => state.results;
export const getProductSuggestions = (state: ProductSearchState) =>
  state.suggestions;
