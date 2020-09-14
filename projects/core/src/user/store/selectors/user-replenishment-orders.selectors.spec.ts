import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockEmptyReplenishmentOrderList: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

const mockReplenishmentOrderList: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sorts: [{ code: 'byPage' }],
};

fdescribe('User Replenishment Orders Selectors', () => {
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
      let result: LoaderState<ReplenishmentOrderList>;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrdersState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: mockEmptyReplenishmentOrderList,
      });
    });
  });

  describe('getReplenishmentOrders', () => {
    it('should return a user Replenishment Orders', () => {
      let result: ReplenishmentOrderList;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrders))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockEmptyReplenishmentOrderList);

      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );
      expect(result).toEqual(mockReplenishmentOrderList);
    });
  });

  describe('getReplenishmentOrdersError', () => {
    it('should return success flag of Replenishment Orders state', () => {
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

  describe('getReplenishmentOrdersSuccess', () => {
    it('should return success flag of Replenishment Orders state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getReplenishmentOrdersSuccess))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(false);

      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );
      expect(result).toEqual(true);
    });
  });
});
