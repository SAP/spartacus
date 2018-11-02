import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import * as fromRoot from '../../routing/store';
import * as fromStore from '../store';

import { ProductSearchService } from './product-search.service';
import { SearchConfig } from '../search-config';
import { EMPTY, of } from 'rxjs';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let store: Store<fromStore.ProductsState>;

  const mockSearchResults = {
    results: {
      0: 'p1',
      1: 'p2',
      2: 'p3'
    }
  };

  const mockAuxSearchResults = {
    results: {
      0: 'ap1',
      1: 'ap2'
    }
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
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [ProductSearchService]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ProductSearchService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ProductSearchService is injected', inject(
    [ProductSearchService],
    (productSearchService: ProductSearchService) => {
      expect(productSearchService).toBeTruthy();
    }
  ));

  it('should be able to get search results', () => {
    service.searchResults$.subscribe(results => {
      expect(results).toEqual(mockSearchResults);
    });
  });

  it('should be able to get auxiliary search results', () => {
    service.auxSearchResults$.subscribe(results => {
      expect(results).toEqual(mockAuxSearchResults);
    });
  });

  describe('search(query, searchConfig)', () => {
    it('should be able to search products', () => {
      const searchConfig = new SearchConfig();
      service.search('test query', searchConfig);
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
      const searchConfig = new SearchConfig();
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
      const searchConfig = new SearchConfig();
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
