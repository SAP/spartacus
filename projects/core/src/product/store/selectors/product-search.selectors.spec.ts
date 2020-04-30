import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import {
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';
import { SearchConfig } from '../../model/search-config';
import { ProductActions } from '../actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';
import * as fromReducers from '../reducers/index';
import { ProductSelectors } from '../selectors/index';

describe('ProductSearch Selectors', () => {
  let store: Store<StateWithProduct>;

  const searchResults: ProductSearchPage = { products: [{ code: '123' }] };
  const suggestions: Suggestion[] = [{ value: 'test' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PRODUCT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSearchResults', () => {
    it('should return the product search results', () => {
      let result: ProductSearchPage;
      const searchConfig: SearchConfig = { pageSize: 10 };
      store
        .pipe(select(ProductSelectors.getSearchResults))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new ProductActions.SearchProducts({
          queryText: 'test',
          searchConfig: searchConfig,
        })
      );
      store.dispatch(new ProductActions.SearchProductsSuccess(searchResults));

      expect(result).toEqual(searchResults);
    });
  });

  describe('getAuxSearchResults', () => {
    it('should return the auxiliary product search results', () => {
      let result: ProductSearchPage;
      const searchConfig: SearchConfig = { pageSize: 10 };
      store
        .pipe(select(ProductSelectors.getAuxSearchResults))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new ProductActions.SearchProducts(
          {
            queryText: 'test',
            searchConfig: searchConfig,
          },
          true
        )
      );
      store.dispatch(
        new ProductActions.SearchProductsSuccess(searchResults, true)
      );

      expect(result).toEqual(searchResults);
    });
  });

  describe('getProductSuggestions', () => {
    it('should return the product suggestions', () => {
      let result: Suggestion[];
      store
        .pipe(select(ProductSelectors.getProductSuggestions))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new ProductActions.GetProductSuggestionsSuccess(suggestions)
      );

      expect(result).toEqual(suggestions);
    });
  });
});
