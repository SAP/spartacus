import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { StateWithUser, USER_FEATURE, UserOrdersState } from '../user-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { OrderHistoryList } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';

const emptyOrder: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: []
};

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5
  },
  sorts: [{ code: 'byPage' }]
};

describe('User Orders Selectors', () => {
  let store: Store<StateWithUser>;

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

  describe('getOrdersLoaderState', () => {
    it('should return a loading state', () => {
      let result: LoaderState<UserOrdersState>;
      store
        .pipe(select(fromSelectors.getOrdersLoaderState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: {
          orders: emptyOrder
        }
      });
    });
  });

  describe('getOrderState', () => {
    it('should return the Order state from the store', () => {
      let result: UserOrdersState;
      store
        .pipe(select(fromSelectors.getOrdersState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        orders: emptyOrder
      });
    });
  });

  describe('getOrders', () => {
    it('should return a user Orders', () => {
      let result: OrderHistoryList;
      store
        .pipe(select(fromSelectors.getOrders))
        .subscribe(value => (result = value));

      expect(result).toEqual(emptyOrder);

      store.dispatch(new fromActions.LoadUserOrdersSuccess(mockUserOrders));
      expect(result).toEqual(mockUserOrders);
    });
  });
});
