import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './store-finder.selectors';
import { SearchConfig } from '../../models/search-config';

describe('StoreFinder Selectors', () => {
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
    store = TestBed.get(store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('findStores', () => {
    it('should return the stores search results', () => {
      let result;
      const searchConfig: SearchConfig = { pageSize: 10 };
      store
        .select(fromSelectors.getAllStores)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new fromActions.FindStores({ queryText: 'test', searchConfig })
      );
      store.dispatch(new fromActions.FindStoresSuccess(searchResult));

      expect(result).toEqual(searchResult);
    });
  });
});
