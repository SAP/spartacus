import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './find-stores.selectors';
import { StateWithStoreFinder } from '../store-finder-state';

describe('FindStores Selectors', () => {
  let store: Store<StateWithStoreFinder>;

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

  describe('findStores', () => {
    it('should return the stores search results', () => {
      let result;
      store
        .pipe(select(fromSelectors.getFindStoresEntities))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.FindStores({ queryText: 'test' }));
      store.dispatch(new fromActions.FindStoresSuccess(searchResult));

      expect(result).toEqual(searchResult);
    });
  });

  describe('getStoresLoading', () => {
    it('should return isLoading flag', () => {
      let result;
      store
        .pipe(select(fromSelectors.getStoresLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.FindStores({ queryText: '' }));

      expect(result).toEqual(true);
    });
  });
});
