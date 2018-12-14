import { ProductsSearchState } from '../product-state';
import * as fromActions from '../actions/product-search.action';
import { SearchConfig } from '../../model/search-config';
import { ProductList, Suggestion } from '../../../occ/occ-models';

import * as fromProductSearch from './product-search.reducer';

describe('Product Search Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromProductSearch;
      const action = {} as fromActions.ProductSearchAction;
      const state: ProductsSearchState = fromProductSearch.reducer(
        undefined,
        action
      );

      expect(state).toBe(initialState);
    });
  });

  describe('SEARCH_PRODUCTS action', () => {
    it('should set loading to true', () => {
      const mockSearchConfig: SearchConfig = { pageSize: 10 };

      const { initialState } = fromProductSearch;
      const action = new fromActions.SearchProducts({
        queryText: 'test',
        searchConfig: mockSearchConfig
      });
      const state: ProductsSearchState = fromProductSearch.reducer(
        initialState,
        action
      );

      expect(state.loading).toEqual(true);
    });
  });

  describe('SEARCH_PRODUCTS_SUCCESS action', () => {
    it('should populate search results after loading', () => {
      const mockSearchConfig: SearchConfig = { pageSize: 10 };

      const results: ProductList = { products: [{ code: '123' }] };
      const { initialState } = fromProductSearch;
      const loadAction = new fromActions.SearchProducts({
        queryText: 'test',
        searchConfig: mockSearchConfig
      });
      const loadingState = fromProductSearch.reducer(initialState, loadAction);
      const resultAction = new fromActions.SearchProductsSuccess(results);
      const state: ProductsSearchState = fromProductSearch.reducer(
        loadingState,
        resultAction
      );

      expect(state.loading).toEqual(false);
      expect(state.results).toEqual(results);
    });

    it('should populate auxiliary search results after loading', () => {
      const mockSearchConfig: SearchConfig = { pageSize: 10 };

      const results: ProductList = { products: [{ code: '123' }] };
      const { initialState } = fromProductSearch;
      const loadAction = new fromActions.SearchProducts(
        {
          queryText: 'test',
          searchConfig: mockSearchConfig
        },
        true
      );
      const loadingState = fromProductSearch.reducer(initialState, loadAction);
      const resultAction = new fromActions.SearchProductsSuccess(results, true);
      const state: ProductsSearchState = fromProductSearch.reducer(
        loadingState,
        resultAction
      );

      expect(state.loading).toEqual(false);
      expect(state.auxResults).toEqual(results);
    });

    it('should return the previous state if not loading', () => {
      const { initialState } = fromProductSearch;
      const previousState = { ...initialState, loading: false };
      const action = new fromActions.SearchProductsSuccess({});
      const state: ProductsSearchState = fromProductSearch.reducer(
        previousState,
        action
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('GET_PRODUCT_SUGGESTIONS_SUCCESS action', () => {
    it('should populate product suggestions', () => {
      const suggestions: Suggestion[] = [{ value: '123' }];

      const { initialState } = fromProductSearch;
      const action = new fromActions.GetProductSuggestionsSuccess(suggestions);
      const state: ProductsSearchState = fromProductSearch.reducer(
        initialState,
        action
      );

      expect(state.suggestions).toEqual(suggestions);
    });
  });

  describe('CLEAN_PRODUCT_SEARCH action', () => {
    it('should clean the Product Search State', () => {
      const results: ProductList = { products: [{ code: '123' }] };
      const suggestions: Suggestion[] = [];

      const { initialState } = fromProductSearch;
      const queryAction = new fromActions.SearchProductsSuccess(results);
      const querySuggestionAction = new fromActions.GetProductSuggestionsSuccess(
        suggestions
      );
      fromProductSearch.reducer(initialState, queryAction);
      fromProductSearch.reducer(initialState, querySuggestionAction);

      const cleanAction = new fromActions.CleanProductSearchState();
      const newState: ProductsSearchState = fromProductSearch.reducer(
        initialState,
        cleanAction
      );

      expect(newState).toEqual(initialState);
    });
  });
});
