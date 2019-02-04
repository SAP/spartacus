import { ProductsSearchState } from '../product-state';
import * as fromProductsSearch from '../actions/product-search.action';
import { Suggestion, ProductSearchPage } from '../../../occ/occ-models';

export const initialState: ProductsSearchState = {
  results: {},
  suggestions: [],
  auxResults: {}
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
        ...res
      };
    }

    case fromProductsSearch.GET_PRODUCT_SUGGESTIONS_SUCCESS: {
      const suggestions: Suggestion[] = action.payload;

      return {
        ...state,
        suggestions
      };
    }

    case fromProductsSearch.CLEAN_PRODUCT_SEARCH: {
      return initialState;
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
