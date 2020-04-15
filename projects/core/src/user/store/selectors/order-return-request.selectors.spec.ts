import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import * as fromReducers from '../reducers';
import { UsersSelectors } from './index';
import { StateWithUser, USER_FEATURE } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserActions } from '../actions/index';

const mockReturnRequestList: ReturnRequestList = {
  returnRequests: [{ rma: '01' }, { rma: '02' }],
  pagination: {
    totalPages: 13,
  },
  sorts: [{ selected: true }, { selected: false }],
};

describe('Order Return Request Selectors', () => {
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

  describe('getOrderReturnRequest', () => {
    it('should return the Order Return Request from the store', () => {
      let result: ReturnRequest;
      store
        .pipe(select(UsersSelectors.getOrderReturnRequest))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });

  describe('getOrderReturnRequestLoading', () => {
    it('should return the Order Return Request loading flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getOrderReturnRequestLoading))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });

  describe('getOrderReturnRequestSuccess', () => {
    it('should return the Order Return Request success flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getOrderReturnRequestSuccess))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });

  describe('getOrderReturnRequestListState', () => {
    it('should get order return request list state', () => {
      let result: LoaderState<ReturnRequestList>;
      store
        .pipe(select(UsersSelectors.getOrderReturnRequestListState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: {
          returnRequests: [],
          pagination: {},
          sorts: [],
        },
      });
    });
  });

  describe('getOrderReturnRequestList', () => {
    it('should get order return request list', () => {
      let result: ReturnRequestList;
      store
        .pipe(select(UsersSelectors.getOrderReturnRequestList))
        .subscribe((value) => (result = value));

      expect(result).toEqual({
        returnRequests: [],
        pagination: {},
        sorts: [],
      });

      store.dispatch(
        new UserActions.LoadOrderReturnRequestListSuccess(mockReturnRequestList)
      );
      expect(result).toEqual(mockReturnRequestList);
    });
  });
});
