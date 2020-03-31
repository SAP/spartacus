import { inject, TestBed } from '@angular/core/testing';
import * as NgrxStore from '@ngrx/store';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductSelectors } from '../store/selectors/index';
import { ProductSearchService } from './product-search.service';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let store: Store<StateWithProduct>;
  const mockSearchResults: ProductSearchPage = {
    products: [{ code: '1' }, { code: '2' }, { code: '3' }],
  };

  const mockSelect = (
    selector: MemoizedSelector<StateWithProduct, ProductSearchPage>
  ) => {
    switch (selector) {
      case ProductSelectors.getSearchResults:
        return () => of(mockSearchResults);
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
      providers: [ProductSearchService],
    });
    store = TestBed.inject(Store);
    service = TestBed.inject(ProductSearchService);
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
      .subscribe((result) => (tempSearchResult = result))
      .unsubscribe();
    expect(tempSearchResult).toEqual(mockSearchResults);
  });

  it('should be able to clear search results', () => {
    service.clearResults();
    expect(store.dispatch).toHaveBeenCalledWith(
      new ProductActions.ClearProductSearchResult({
        clearPageResults: true,
      })
    );
  });

  describe('search(query, searchConfig)', () => {
    it('should be able to search products', () => {
      const searchConfig: SearchConfig = {};

      service.search('test query', searchConfig);
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.SearchProducts({
          queryText: 'test query',
          searchConfig: searchConfig,
        })
      );
    });
  });
});
