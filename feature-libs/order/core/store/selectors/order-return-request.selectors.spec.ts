import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReturnRequest, ReturnRequestList, StateUtils } from '@spartacus/core';
import { OrderActions } from '../actions/index';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers';
import { OrderSelectors } from './index';

const mockReturnRequestList: ReturnRequestList = {
  returnRequests: [{ rma: '01' }, { rma: '02' }],
  pagination: {
    totalPages: 13,
  },
  sorts: [{ selected: true }, { selected: false }],
};

describe('Order Return Request Selectors', () => {
  let store: Store<StateWithOrder>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrderReturnRequest', () => {
    it('should return the Order Return Request from the store', () => {
      let result: ReturnRequest;
      store
        .pipe(select(OrderSelectors.getOrderReturnRequest))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });

  describe('getOrderReturnRequestLoading', () => {
    it('should return the Order Return Request loading flag', () => {
      let result: boolean;
      store
        .pipe(select(OrderSelectors.getOrderReturnRequestLoading))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });

  describe('getOrderReturnRequestSuccess', () => {
    it('should return the Order Return Request success flag', () => {
      let result: boolean;
      store
        .pipe(select(OrderSelectors.getOrderReturnRequestSuccess))
        .subscribe((value) => (result = value));
      expect(result).not.toBeNull();
    });
  });

  describe('getOrderReturnRequestListState', () => {
    it('should get order return request list state', () => {
      let result: StateUtils.LoaderState<ReturnRequestList>;
      store
        .pipe(select(OrderSelectors.getOrderReturnRequestListState))
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
        .pipe(select(OrderSelectors.getOrderReturnRequestList))
        .subscribe((value) => (result = value));

      expect(result).toEqual({
        returnRequests: [],
        pagination: {},
        sorts: [],
      });

      store.dispatch(
        new OrderActions.LoadOrderReturnRequestListSuccess(
          mockReturnRequestList
        )
      );
      expect(result).toEqual(mockReturnRequestList);
    });
  });
});
