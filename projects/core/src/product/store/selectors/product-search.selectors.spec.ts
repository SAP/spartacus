import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import * as fromActions from '../actions';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import * as fromReducers from '../reducers';
import { SearchConfig } from '../../model/search-config';
import {
  ProductSearchPage,
  Suggestion
} from '../../../occ/occ-models/occ.models';

import * as fromSelectors from './product-search.selectors';

describe('ProductSearch Selectors', () => {
  let store: Store<StateWithProduct>;

  const searchResults: ProductSearchPage = { products: [{ code: '123' }] };
  const suggestions: Suggestion[] = [{ value: 'test' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PRODUCT_FEATURE, fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSearchResults', () => {
    it('should return the product search results', () => {
      let result: ProductSearchPage;
      const searchConfig: SearchConfig = { pageSize: 10 };
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
      let result: ProductSearchPage;
      const searchConfig: SearchConfig = { pageSize: 10 };
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
      let result: Suggestion[];
      store
        .pipe(select(fromSelectors.getProductSuggestions))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.GetProductSuggestionsSuccess(suggestions));

      expect(result).toEqual(suggestions);
    });
  });
});
