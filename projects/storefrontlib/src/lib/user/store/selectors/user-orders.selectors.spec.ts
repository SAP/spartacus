import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

const mockUserOrders: any = {
  orders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5
  },
  sort: [{ code: 'byPage' }]
};

describe('User Orders Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrders', () => {
    it('should return a user Orders', () => {
      let result;
      store
        .select(fromSelectors.getOrders)
        .subscribe(value => (result = value));
      expect(result).toEqual({
        orders: [],
        pagination: {},
        sort: []
      });

      store.dispatch(new fromActions.LoadUserOrdersSuccess(mockUserOrders));
      expect(result).toEqual(mockUserOrders);
    });
  });
});
