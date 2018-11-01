import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers, select } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './find-stores.selectors';

describe('FindStores Selectors', () => {
  let store: Store<fromReducers.StoresState>;

  const searchResult = { stores: [{ name: 'test' }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
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

      expect(result).toEqual({});

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
