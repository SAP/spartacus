import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import * as NgrxStore from '@ngrx/store';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  ProductSearchPage,
  Suggestion,
} from '../../model/product-search.model';
import { SearchConfig } from '../model/index';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductSelectors } from '../store/selectors/index';
import { ProductSearchService } from './product-search.service';
import { SearchboxService } from './searchbox.service';

describe('SearchboxService', () => {
  let service: SearchboxService;
  let store: Store<StateWithProduct>;
  class MockRouter {
    createUrlTree() {
      return {};
    }
    navigateByUrl() {
      return {};
    }
  }
  const mockSearchResults: ProductSearchPage = {
    products: [{ code: '1' }, { code: '2' }, { code: '3' }],
  };

  const mockAuxSearchResults: ProductSearchPage = {
    products: [{ code: 'aux1' }, { code: 'aux2' }],
  };

  const mockSuggestions: Suggestion[] = [
    {
      value: 'sug1',
    },
    { value: 'sug2' },
  ];

  const mockSelect = (
    selector: MemoizedSelector<StateWithProduct, ProductSearchPage>
  ) => {
    switch (selector) {
      case ProductSelectors.getSearchResults:
        return () => of(mockSearchResults);
      case ProductSelectors.getAuxSearchResults:
        return () => of(mockAuxSearchResults);
      case ProductSelectors.getProductSuggestions:
        return () => of(mockSuggestions);
      default:
        return () => EMPTY;
    }
  };

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [
        ProductSearchService,
        SearchboxService,
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    });
    store = TestBed.inject(Store);
    service = TestBed.inject(SearchboxService);

    spyOn(service, 'search').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ProductSearchService is injected', inject(
    [ProductSearchService],
    (productSearchService: ProductSearchService) => {
      expect(productSearchService).toBeTruthy();
    }
  ));

  it('should be able to clear search results', () => {
    service.clearResults();
    expect(store.dispatch).toHaveBeenCalledWith(
      new ProductActions.ClearProductSearchResult({
        clearSearchboxResults: true,
      })
    );
  });

  describe('search products', () => {
    it('should be able to search products', () => {
      const searchConfig: SearchConfig = {};

      service.search('test query', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.SearchProducts(
          {
            queryText: 'test query',
            searchConfig: searchConfig,
          },
          true
        )
      );
    });

    it('should be able to get search results', () => {
      let tempSearchResult: ProductSearchPage;
      service
        .getResults()
        .subscribe((result) => (tempSearchResult = result))
        .unsubscribe();
      expect(tempSearchResult).toEqual(mockAuxSearchResults);
    });
  });

  describe('search suggestions', () => {
    it('should be able to search suggestions', () => {
      const searchConfig: SearchConfig = {};
      service.searchSuggestions('test term', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.GetProductSuggestions({
          term: 'test term',
          searchConfig: searchConfig,
        })
      );
    });

    it('should be able to get search suggestions', () => {
      let tempSearchResult: Suggestion[];
      service
        .getSuggestionResults()
        .subscribe((result) => (tempSearchResult = result))
        .unsubscribe();
      expect(tempSearchResult).toEqual(mockSuggestions);
    });
  });
});
