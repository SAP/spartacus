import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StoreFinderActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { StoreFinderSelectors } from '../selectors/index';
import {
  StateWithStoreFinder,
  STORE_FINDER_FEATURE,
} from '../store-finder-state';

describe('ViewAllStores Selectors', () => {
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

  describe('viewAllStores', () => {
    it('should return the stores search results', () => {
      store.dispatch(new StoreFinderActions.ViewAllStoresSuccess(searchResult));

      let result;
      store
        .pipe(select(StoreFinderSelectors.getViewAllStoresEntities))
        .subscribe((value) => (result = value.viewAllStoresEntities))
        .unsubscribe();

      expect(result).toEqual(searchResult);
    });
  });

  describe('getViewAllStoresLoading', () => {
    it('should return isLoading flag', () => {
      let result: boolean;
      store
        .pipe(select(StoreFinderSelectors.getViewAllStoresLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new StoreFinderActions.ViewAllStores());

      expect(result).toEqual(true);
    });
  });
});
