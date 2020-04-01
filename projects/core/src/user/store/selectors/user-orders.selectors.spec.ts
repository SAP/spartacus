import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { OrderHistoryList } from '../../../model/order.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const emptyOrder: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sorts: [{ code: 'byPage' }],
};

describe('User Orders Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrdersLoaderState', () => {
    it('should return orders state', () => {
      let result: LoaderState<OrderHistoryList>;
      store
        .pipe(select(UsersSelectors.getOrdersState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: emptyOrder,
      });
    });
  });

  describe('getOrders', () => {
    it('should return a user Orders', () => {
      let result: OrderHistoryList;
      store
        .pipe(select(UsersSelectors.getOrders))
        .subscribe((value) => (result = value));

      expect(result).toEqual(emptyOrder);

      store.dispatch(new UserActions.LoadUserOrdersSuccess(mockUserOrders));
      expect(result).toEqual(mockUserOrders);
    });
  });

  describe('getOrdersLoaded', () => {
    it('should return success flag of orders state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getOrdersLoaded))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new UserActions.LoadUserOrdersSuccess(mockUserOrders));
      expect(result).toEqual(true);
    });
  });
});
