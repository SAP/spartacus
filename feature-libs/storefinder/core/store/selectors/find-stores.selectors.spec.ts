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

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('findStores', () => {
    it('should return the stores search results', () => {
      let result;
      store
        .pipe(select(StoreFinderSelectors.getFindStoresEntities))
        .subscribe((value) => (result = value.findStoresEntities));
      store.dispatch(new StoreFinderActions.FindStores({ queryText: 'test' }));
      store.dispatch(new StoreFinderActions.FindStoresSuccess(searchResult));

      expect(result).toEqual(searchResult);
    });
  });

  describe('getStoresLoading', () => {
    it('should return isLoading flag', () => {
      let result: boolean;
      store
        .pipe(select(StoreFinderSelectors.getStoresLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new StoreFinderActions.FindStores({ queryText: '' }));

      expect(result).toEqual(true);
    });
  });

  describe('getStoresSuccess', () => {
    it('should return isLoaded flag', () => {
      let result: boolean;
      store
        .pipe(select(StoreFinderSelectors.getStoresSuccess))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new StoreFinderActions.FindStoresSuccess({ queryText: '' })
      );

      expect(result).toEqual(true);
    });
  });
});
