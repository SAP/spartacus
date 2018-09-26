import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromStore from '../store';

import { ProductSearchService } from './product-search.service';
import { SearchConfig } from '../search-config';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let store: Store<fromStore.ProductsState>;

  beforeEach(() => {
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
    const mockResults = 'mock search results';
    spyOn(store, 'select').and.returnValue(of(mockResults));
    service.searchResults$.subscribe(results => {
      expect(results).toEqual(mockResults);
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
