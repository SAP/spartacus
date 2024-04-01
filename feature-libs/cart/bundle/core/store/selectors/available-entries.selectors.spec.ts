import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { BundleActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { BundleSelectors } from './index';
import { BUNDLE_FEATURE, StateWithBundle } from '../bundle-state';

describe('AvailableEntries Selectors', () => {
  let store: Store<StateWithBundle>;

  const payload = {
    userId: 'test-user',
    cartId: 'test-cart',
    entryGroupNumber: 1,
    products: [{ name: 'test' }],
    searchConfig: undefined,
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
    it('should return the search results', () => {
      let result;
      store
        .pipe(select(BundleSelectors.getAvailableEntriesEntities))
        .subscribe((value) => (result = value.availableEntriesEntities));
      store.dispatch(new BundleActions.GetBundleAllowedProducts(payload));
      store.dispatch(
        new BundleActions.GetBundleAllowedProductsSuccess(payload)
      );

      expect(result).toEqual({
        [payload.cartId]: { [payload.entryGroupNumber]: payload },
      });
    });
  });

  describe('getAvailableEntriesLoading', () => {
    it('should return isLoading flag', () => {
      let result: boolean;
      store
        .pipe(select(BundleSelectors.getAvailableEntriesLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new BundleActions.GetBundleAllowedProducts(payload));

      expect(result).toEqual(true);
    });
  });

  describe('getAvailableEntriesSuccess', () => {
    it('should return isLoaded flag', () => {
      let result: boolean;
      store
        .pipe(select(BundleSelectors.getAvailableEntriesSuccess))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new BundleActions.GetBundleAllowedProductsSuccess({ queryText: '' })
      );

      expect(result).toEqual(true);
    });
  });
});
