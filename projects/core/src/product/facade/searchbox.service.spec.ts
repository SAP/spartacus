import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import * as NgrxStore from '@ngrx/store';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model';
import * as fromStore from '../store';
import { StateWithProduct } from '../store/product-state';
import { ProductSearchService } from './product-search.service';
import { SearchboxService } from './searchbox.service';

describe('SearchboxService', () => {
  let service: SearchboxService;
  //   let routerService: Router;
  let store: Store<fromStore.ProductsState>;
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

  const mockSelect = (
    selector: MemoizedSelector<StateWithProduct, ProductSearchPage>
  ) => {
    switch (selector) {
      case fromStore.getSearchResults:
        return () => of(mockSearchResults);
      case fromStore.getAuxSearchResults:
        return () => of(mockAuxSearchResults);
      default:
        return () => EMPTY;
    }
  };

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('product', fromStore.getReducers()),
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

    store = TestBed.get(Store);
    service = TestBed.get(SearchboxService);
    // routerService = TestBed.get(Router);
    spyOn(service, 'search').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ProductSearchService is injected', inject(
    [ProductSearchService],
    (productSearchService: ProductSearchService) => {
      expect(productSearchService).toBeTruthy();
    }
  ));

  it('should be able to get search results', () => {
    let tempSearchResult: ProductSearchPage;
    service
      .getResults()
      .subscribe(result => (tempSearchResult = result))
      .unsubscribe();
    expect(tempSearchResult).toEqual(mockAuxSearchResults);
  });

  it('should be able to clear search results', () => {
    service.clearResults();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearProductSearchResult({
        clearSearchboxResults: true,
      })
    );
  });

  describe('search(query, searchConfig)', () => {
    it('should be able to search products', () => {
      const searchConfig: SearchConfig = {};

      service.search('test query', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SearchProducts(
          {
            queryText: 'test query',
            searchConfig: searchConfig,
          },
          true
        )
      );
    });
  });

  describe('getSuggestions(query, searchConfig)', () => {
    it('should be able to get suggestion for the given product', () => {
      const searchConfig: SearchConfig = {};
      service.getSuggestionResults('test term', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.GetProductSuggestions({
          term: 'test term',
          searchConfig: searchConfig,
        })
      );
    });
  });
});
