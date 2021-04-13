import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { BundleActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { BundleSelectors } from './index';
import { BUNDLE_FEATURE, StateWithBundle } from '../bundle-state';
import { SearchConfig } from '@spartacus/core';

describe('AvailableEntries Selectors', () => {
  let store: Store<StateWithBundle>;

  const userId = 'anonymous';
  const cartId = 'xxxxx';
  const entryGroupNumber = 5;
  const searchConfig: SearchConfig = { pageSize: 5 };
  const params = {
    userId,
    cartId,
    entryGroupNumber,
    searchConfig,
  };

  const searchResult = {
    availableEntriesEntities: {
      [cartId]: { [entryGroupNumber]: { ...params, products: [] } },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(BUNDLE_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAvailableEntries', () => {
    it('should return the product search results', () => {
      let result;
      store
        .pipe(select(BundleSelectors.getAvailableEntriesEntities))
        .subscribe((value) => (result = value));
      store.dispatch(new BundleActions.GetBundleAllowedProducts(params));
      store.dispatch(
        new BundleActions.GetBundleAllowedProductsSuccess(<any>{
          ...params,
          products: [],
        })
      );

      expect(result).toEqual(searchResult);
    });
  });

  describe('getAvailableEntriesLoading', () => {
    it('should return isLoading flag', () => {
      let result: boolean;
      store
        .pipe(select(BundleSelectors.getAvailableEntriesLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new BundleActions.GetBundleAllowedProducts(params));

      expect(result).toEqual(true);
    });
  });

  describe('getStoresSuccess', () => {
    it('should return isLoaded flag', () => {
      let result: boolean;
      store
        .pipe(select(BundleSelectors.getAvailableEntriesSuccess))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new BundleActions.GetBundleAllowedProductsSuccess(<any>{
          ...params,
          products: [],
        })
      );

      expect(result).toEqual(true);
    });
  });
});
