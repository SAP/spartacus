import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { UserState, USER_FEATURE } from '../user-state';
import { OrderHistoryList } from '../../../occ-models/index';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5
  },
  sorts: [{ code: 'byPage' }]
};

describe('User Orders Selectors', () => {
  let store: Store<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getOrderState', () => {
    it('should return the Order state from the store', () => {
      let result;
      store
        .pipe(select(fromSelectors.getOrdersState))
        .subscribe(value => (result = value));
      expect(result).toEqual({
        orders: {
          orders: [],
          pagination: {},
          sorts: []
        },
        loading: false,
        loaded: false
      });
    });
  });

  describe('getOrders', () => {
    it('should return a user Orders', () => {
      let result;
      store
        .pipe(select(fromSelectors.getOrders))
        .subscribe(value => (result = value));
      expect(result).toEqual({
        orders: [],
        pagination: {},
        sorts: []
      });

      store.dispatch(new fromActions.LoadUserOrdersSuccess(mockUserOrders));
      expect(result).toEqual(mockUserOrders);
    });
  });
});
