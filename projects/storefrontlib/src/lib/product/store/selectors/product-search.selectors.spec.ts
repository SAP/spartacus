import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers, select } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './product-search.selectors';
import { SearchConfig } from '../../search-config';

describe('ProductSearch Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const searchResults = { products: [{ code: '123' }] };
  const suggestions = [{ value: 'test' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromReducers.getReducers())
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSearchResults', () => {
    it('should return the product search results', () => {
      let result;
      const searchConfig = new SearchConfig();
      searchConfig.pageSize = 10;
      store
        .pipe(select(fromSelectors.getSearchResults))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new fromActions.SearchProducts({
          queryText: 'test',
          searchConfig: searchConfig
        })
      );
      store.dispatch(new fromActions.SearchProductsSuccess(searchResults));

      expect(result).toEqual(searchResults);
    });
  });

  describe('getAuxSearchResults', () => {
    it('should return the auxiliary product search results', () => {
      let result;
      const searchConfig = new SearchConfig();
      searchConfig.pageSize = 10;
      store
        .pipe(select(fromSelectors.getAuxSearchResults))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new fromActions.SearchProducts(
          {
            queryText: 'test',
            searchConfig: searchConfig
          },
          true
        )
      );
      store.dispatch(
        new fromActions.SearchProductsSuccess(searchResults, true)
      );

      expect(result).toEqual(searchResults);
    });
  });

  describe('getProductSuggestions', () => {
    it('should return the product suggestions', () => {
      let result;

      store
        .pipe(select(fromSelectors.getProductSuggestions))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.GetProductSuggestionsSuccess(suggestions));

      expect(result).toEqual(suggestions);
    });
  });
});
