import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockReplenishmentOrderList: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sorts: [{ code: 'byPage' }],
};

describe('UserReplenishmentOrdersSelectors', () => {
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

  describe('getReplenishmentOrdersState', () => {
    it('should return Replenishment Orders state', () => {
      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: StateUtils.LoaderState<ReplenishmentOrderList>;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrdersState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: mockReplenishmentOrderList,
      });
    });
  });

  describe('getReplenishmentOrders', () => {
    it('should return a user Replenishment Orders', () => {
      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: ReplenishmentOrderList;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrders))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockReplenishmentOrderList);
    });
  });

  describe('getReplenishmentOrdersLoading', () => {
    it('should return the boolean value from the loader state loading', () => {
      store.dispatch(
        new UserActions.LoadUserReplenishmentOrders({
          userId: 'test-user-id',
        })
      );

      let result: boolean;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrdersLoading))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getReplenishmentOrdersSuccess', () => {
    it('should return the boolean value from the loader state success', () => {
      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: boolean;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrdersSuccess))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });

  describe('getReplenishmentOrdersError', () => {
    it('should return the boolean value from the loader state error', () => {
      const mockError = 'test-error';

      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersFail(mockError)
      );

      let result: boolean;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrdersError))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
