import { Suggestion } from '../../../model/product-search.model';
import { SearchConfig } from '../../model/search-config';
import { ProductActions } from '../actions/index';
import { ProductsSearchState } from '../product-state';
import * as fromProductSearch from './product-search.reducer';

describe('Product Search Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromProductSearch;
      const action = {} as ProductActions.ProductSearchAction;
      const state: ProductsSearchState = fromProductSearch.reducer(
        undefined,
        action
      );

      expect(state).toBe(initialState);
    });
  });

  describe('SEARCH_PRODUCTS_SUCCESS action', () => {
    it('should populate search results after loading', () => {
      const mockSearchConfig: SearchConfig = { pageSize: 10 };

      const results = { products: [{ code: '123' }] };
      const { initialState } = fromProductSearch;
      const loadAction = new ProductActions.SearchProducts({
        queryText: 'test',
        searchConfig: mockSearchConfig,
      });
      const loadingState = fromProductSearch.reducer(initialState, loadAction);
      const resultAction = new ProductActions.SearchProductsSuccess(results);
      const state: ProductsSearchState = fromProductSearch.reducer(
        loadingState,
        resultAction
      );

      expect(state.results).toEqual(results);
    });

    it('should populate auxiliary search results after loading', () => {
      const mockSearchConfig: SearchConfig = { pageSize: 10 };

      const results = { products: [{ code: '123' }] };
      const { initialState } = fromProductSearch;
      const loadAction = new ProductActions.SearchProducts(
        {
          queryText: 'test',
          searchConfig: mockSearchConfig,
        },
        true
      );
      const loadingState = fromProductSearch.reducer(initialState, loadAction);
      const resultAction = new ProductActions.SearchProductsSuccess(
        results,
        true
      );
      const state: ProductsSearchState = fromProductSearch.reducer(
        loadingState,
        resultAction
      );

      expect(state.auxResults).toEqual(results);
    });
  });

  describe('GET_PRODUCT_SUGGESTIONS_SUCCESS action', () => {
    it('should populate product suggestions', () => {
      const suggestions: Suggestion[] = [{ value: '123' }];

      const { initialState } = fromProductSearch;
      const action = new ProductActions.GetProductSuggestionsSuccess(
        suggestions
      );
      const state: ProductsSearchState = fromProductSearch.reducer(
        initialState,
        action
      );

      expect(state.suggestions).toEqual(suggestions);
    });
  });

  describe('CLEAN_PRODUCT_SEARCH action', () => {
    it('should clean the Product Search State', () => {
      const results = { products: [{ code: '123' }] };
      const suggestions: Suggestion[] = [];

      const { initialState } = fromProductSearch;
      const queryAction = new ProductActions.SearchProductsSuccess(results);
      const querySuggestionAction =
        new ProductActions.GetProductSuggestionsSuccess(suggestions);
      fromProductSearch.reducer(initialState, queryAction);
      fromProductSearch.reducer(initialState, querySuggestionAction);

      const cleanAction = new ProductActions.ClearProductSearchResult();
      const newState: ProductsSearchState = fromProductSearch.reducer(
        initialState,
        cleanAction
      );

      expect(newState).toEqual(initialState);
    });
  });
});
