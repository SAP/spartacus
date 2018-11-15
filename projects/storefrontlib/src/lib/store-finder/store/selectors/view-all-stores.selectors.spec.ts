import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './view-all-stores.selectors';

describe('ViewAllStores Selectors', () => {
  let store: Store<fromReducers.StoresState>;

  const searchResult = { stores: [{ name: 'test' }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.reducers)
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
});
