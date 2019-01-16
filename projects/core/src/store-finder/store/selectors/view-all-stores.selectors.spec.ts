import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './view-all-stores.selectors';
import { StoresState } from '../store-finder-state';

describe('ViewAllStores Selectors', () => {
  let store: Store<StoresState>;

  const searchResult = { stores: [{ name: 'test' }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('viewAllStores', () => {
    it('should return the stores search results', () => {
      let result;
      store
        .pipe(select(fromSelectors.getViewAllStoresEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.ViewAllStoresSuccess(searchResult));

      expect(result).toEqual(searchResult);
    });
  });

  describe('getViewAllStoresLoading', () => {
    it('should return isLoading flag', () => {
      let result;
      store
        .pipe(select(fromSelectors.getViewAllStoresLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.ViewAllStores());

      expect(result).toEqual(true);
    });
  });
});
