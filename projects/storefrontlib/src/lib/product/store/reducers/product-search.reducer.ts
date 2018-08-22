import * as fromProductsSearch from '../actions/product-search.action';

export interface ProductsSearchState {
  results: any;
  suggestions: any[];
  loading: boolean;
}

export const initialState: ProductsSearchState = {
  results: {},
  suggestions: [],
  loading: false
};

export function reducer(
  state = initialState,
  action: fromProductsSearch.ProductSearchAction
): ProductsSearchState {
  switch (action.type) {
    case fromProductsSearch.SEARCH_PRODUCTS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProductsSearch.SEARCH_PRODUCTS_SUCCESS: {
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

    case fromProductsSearch.GET_PRODUCT_SUGGESTIONS_SUCCESS: {
      const suggestions = action.payload;

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

export const getSearchResults = (state: ProductsSearchState) => state.results;
export const getSearchResultsPagination = (state: ProductsSearchState) => state.results.pagination;
export const getSearchResultsLoading = (state: ProductsSearchState) =>
  state.loading;
export const getProductSuggestions = (state: ProductsSearchState) =>
  state.suggestions;
