import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StoreFinderActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { StoreFinderSelectors } from '../selectors/index';
import {
  StateWithStoreFinder,
  STORE_FINDER_FEATURE,
} from '../store-finder-state';

describe('FindStores Selectors', () => {
  let store: Store<StateWithStoreFinder>;

  const searchResult = { stores: [{ name: 'test' }] };

  const data = {
    entities: [
      {
        count: 1,
        isoCode: 'DE',
        name: 'Germany',
        type: 'COUNTRY',
      },
      {
        count: 1,
        isoCode: 'PL',
        name: 'Poland',
        type: 'COUNTRY',
      },
      {
        count: 49,
        isoCode: 'JP',
        name: 'Japan',
        type: 'COUNTRY',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          STORE_FINDER_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithStoreFinder>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('findStores', () => {
    it('should return the store entities', () => {
      let result;
      store
        .pipe(select(StoreFinderSelectors.getEntitiesState))
        .subscribe(value => (result = value));

      store.dispatch(new StoreFinderActions.StoreEntities(data));

      expect(result).toEqual(data);
    });
  });
});
