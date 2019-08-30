import { ErrorModel } from '../../../model/misc.model';
import { ClearSearch, Suggestion } from '../../../model/product-search.model';
import { SearchConfig } from '../../model/search-config';
import * as fromProductSearch from './product-search.action';

describe('Product Search Actions', () => {
  let searchConfig: SearchConfig;
  beforeEach(() => {
    searchConfig = { pageSize: 10 };
  });
  describe('SearchProducts Actions', () => {
    describe('SearchProducts', () => {
      it('should create an action', () => {
        const payload = {
          queryText: 'test',
          searchConfig: searchConfig,
        };
        const action = new fromProductSearch.SearchProducts(payload);
        expect({ ...action }).toEqual({
          type: fromProductSearch.SEARCH_PRODUCTS,
          payload: payload,
          auxiliary: undefined,
        });
      });

      it('should create an action for auxiliary search', () => {
        const payload = {
          queryText: 'test',
          searchConfig: searchConfig,
        };
        const action = new fromProductSearch.SearchProducts(payload, true);
        expect({ ...action }).toEqual({
          type: fromProductSearch.SEARCH_PRODUCTS,
          payload: payload,
          auxiliary: true,
        });
      });
    });

    describe('SearchProductsFail', () => {
      it('should create an action', () => {
        const payload: ErrorModel = { message: 'Load Error' };
        const action = new fromProductSearch.SearchProductsFail(payload);

        expect({ ...action }).toEqual({
          type: fromProductSearch.SEARCH_PRODUCTS_FAIL,
          payload,
          auxiliary: undefined,
        });
      });
    });

    describe('SearchProductsSuccess', () => {
      it('should create an action', () => {
        const payload = { products: [{ code: '123' }] };
        const action = new fromProductSearch.SearchProductsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromProductSearch.SEARCH_PRODUCTS_SUCCESS,
          payload,
          auxiliary: undefined,
        });
      });
    });
  });

  describe('GetProductSuggestions Action', () => {
    describe('SearchProductSuggestions', () => {
      it('should create an action', () => {
        const payload = {
          term: 'test',
          searchConfig: searchConfig,
        };
        const action = new fromProductSearch.GetProductSuggestions(payload);
        expect({ ...action }).toEqual({
          type: fromProductSearch.GET_PRODUCT_SUGGESTIONS,
          payload: payload,
        });
      });
    });

    describe('SearchProductSuggestionsSuccess', () => {
      it('should create an action', () => {
        const payload: Suggestion[] = [];
        const action = new fromProductSearch.GetProductSuggestionsSuccess(
          payload
        );
        expect({ ...action }).toEqual({
          type: fromProductSearch.GET_PRODUCT_SUGGESTIONS_SUCCESS,
          payload: payload,
        });
      });
    });

    describe('SearchProductSuggestionsFail', () => {
      it('should create an action', () => {
        const payload: ErrorModel = { message: 'Load Error' };
        const action = new fromProductSearch.GetProductSuggestionsFail(payload);

        expect({ ...action }).toEqual({
          type: fromProductSearch.GET_PRODUCT_SUGGESTIONS_FAIL,
          payload,
        });
      });
    });
  });

  describe('CleanProductSearchState Action', () => {
    describe('Clean ProductSearch State', () => {
      it('should create an action', () => {
        const payload: ClearSearch = {
          clearPageResults: true,
          clearSearchboxResults: false,
        };
        const action = new fromProductSearch.ClearProductSearchResult({
          clearPageResults: true,
          clearSearchboxResults: false,
        });
        expect({ ...action }).toEqual({
          type: fromProductSearch.CLEAR_PRODUCT_SEARCH_RESULT,
          payload,
        });
      });
    });
  });
});
