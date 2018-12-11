import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import * as fromStore from '../store';

import { ProductSearchService } from './product-search.service';
import { SearchConfig } from '../model/search-config';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductSearchPage } from '../../occ-models';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let routerService: Router;
  let store: Store<fromStore.ProductsState>;
  class MockRouter {
    createUrlTree() {
      return {};
    }
    navigateByUrl() {
      return {};
    }
  }
  const mockSearchResults = {
    products: [{ code: '1' }, { code: '2' }, { code: '3' }]
  };

  const mockAuxSearchResults = {
    products: [{ code: 'aux1' }, { code: 'aux2' }]
  };

  const mockSelect = selector => {
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
        StoreModule.forFeature('product', fromStore.getReducers())
      ],
      providers: [
        ProductSearchService,
        {
          provide: Router,
          useClass: MockRouter
        }
      ]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ProductSearchService);
    routerService = TestBed.get(Router);
    spyOn(routerService, 'navigateByUrl').and.callThrough();
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
      .getSearchResults()
      .subscribe(result => (tempSearchResult = result))
      .unsubscribe();
    expect(tempSearchResult).toEqual(mockSearchResults);
  });

  it('should be able to get auxiliary search results', () => {
    let tempAuxSearchResult: ProductSearchPage;
    service
      .getAuxSearchResults()
      .subscribe(result => (tempAuxSearchResult = result))
      .unsubscribe();
    expect(tempAuxSearchResult).toEqual(mockAuxSearchResults);
  });

  describe('search(query, searchConfig)', () => {
    it('should be able to search products', () => {
      const searchConfig: SearchConfig = {};

      service.search('test query', searchConfig);
      expect(routerService.navigateByUrl).toHaveBeenCalledWith({});
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SearchProducts({
          queryText: 'test query',
          searchConfig: searchConfig
        })
      );
    });
  });

  describe('searchAuxiliary(query, searchConfig)', () => {
    it('should be able to search auxiliary products', () => {
      const searchConfig: SearchConfig = {};
      service.searchAuxiliary('test query', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SearchProducts(
          {
            queryText: 'test query',
            searchConfig: searchConfig
          },
          true
        )
      );
    });
  });

  describe('getSuggestions(query, searchConfig)', () => {
    it('should be able to get suggestion for the given product', () => {
      const searchConfig: SearchConfig = {};
      service.getSuggestions('test term', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.GetProductSuggestions({
          term: 'test term',
          searchConfig: searchConfig
        })
      );
    });
  });
});
