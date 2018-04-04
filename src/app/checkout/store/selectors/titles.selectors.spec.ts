import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

describe('Titles Selectors', () => {
  let store: Store<fromReducers.CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          checkout: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllTitles', () => {
    it('should return all titles', () => {
      const mockTitles = [
        {
          code: 'mr',
          name: 'Mr.'
        },
        {
          code: 'mrs',
          name: 'Mrs.'
        }
      ];

      let result;
      store
        .select(fromSelectors.getAllTitles)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadTitlesSuccess(mockTitles));

      expect(result).toEqual(mockTitles);
    });
  });

  describe('titleSelectorFactory', () => {
    it('should return title', () => {
      let code = 'mr';
      const mockTitles = [
        {
          code: 'mr',
          name: 'Mr.'
        },
        {
          code: 'mrs',
          name: 'Mrs.'
        }
      ];

      let result;

      store
        .select(fromSelectors.titleSelectorFactory(code))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadTitlesSuccess(mockTitles));
      expect(result).toEqual(mockTitles[0]);
    });
  });
});
