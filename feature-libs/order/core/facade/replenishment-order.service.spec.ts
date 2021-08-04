import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  PROCESS_FEATURE,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import * as fromProcessReducers from 'projects/core/src/process/store/reducers/index';
import { of, throwError } from 'rxjs';
import { OrderActions } from '../store/actions/index';
import { ORDER_FEATURE, StateWithOrder } from '../store/order-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ReplenishmentOrderService } from './replenishment-order.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockReplenishmentOrderCode = 'test-repl-code';
const mockError = 'test-error';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockReplenishmentOrderList: ReplenishmentOrderList = {
  replenishmentOrders: [mockReplenishmentOrder],
  pagination: { totalPages: 3 },
  sorts: [{ selected: true }],
};

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(mockUserId);
  }
}

describe('UserReplenishmentOrderService', () => {
  let userReplenishmentOrderService: ReplenishmentOrderService;
  let userIdService: UserIdService;
  let store: Store<StateWithOrder | StateWithProcess<void>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        ReplenishmentOrderService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    userReplenishmentOrderService = TestBed.inject(ReplenishmentOrderService);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(userReplenishmentOrderService).toBeTruthy();
  });

  describe('Load replenishment order details', () => {
    it('should be able to load replenishment order details for a given current user', () => {
      userReplenishmentOrderService.loadReplenishmentOrderDetails(
        mockReplenishmentOrderCode
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadReplenishmentOrderDetails({
          userId: mockUserId,
          replenishmentOrderCode: mockReplenishmentOrderCode,
        })
      );
    });

    it('should NOT be able to load replenishment order details when user is anonymous', () => {
      spyOn(userIdService, 'takeUserId').and.callFake(() => {
        return throwError('Error');
      });

      userReplenishmentOrderService.loadReplenishmentOrderDetails(
        mockReplenishmentOrderCode
      );

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should return the value state', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: ReplenishmentOrder;

      userReplenishmentOrderService
        .getReplenishmentOrderDetails()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(mockReplenishmentOrder);
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      userReplenishmentOrderService
        .getReplenishmentOrderDetailsLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      userReplenishmentOrderService
        .getReplenishmentOrderDetailsSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsFail(mockError)
      );

      let result: boolean;

      userReplenishmentOrderService
        .getReplenishmentOrderDetailsError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should dispatch a ClearReplenishmentOrderDetails action', () => {
      userReplenishmentOrderService.clearReplenishmentOrderDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.ClearReplenishmentOrderDetails()
      );
    });
  });

  describe('Cancel a specific replenishment order', () => {
    it('should be able to cancel a replenishment order for a given current user', () => {
      userReplenishmentOrderService.cancelReplenishmentOrder(
        mockReplenishmentOrderCode
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.CancelReplenishmentOrder({
          userId: mockUserId,
          replenishmentOrderCode: mockReplenishmentOrderCode,
        })
      );
    });

    it('should NOT be able to load replenishment order details when user is anonymous', () => {
      spyOn(userIdService, 'takeUserId').and.callFake(() => {
        return throwError('Error');
      });

      userReplenishmentOrderService.cancelReplenishmentOrder(
        mockReplenishmentOrderCode
      );

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new OrderActions.CancelReplenishmentOrderSuccess(mockReplenishmentOrder)
      );

      let result: boolean;

      userReplenishmentOrderService
        .getCancelReplenishmentOrderLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new OrderActions.CancelReplenishmentOrderSuccess(mockReplenishmentOrder)
      );

      let result: boolean;

      userReplenishmentOrderService
        .getCancelReplenishmentOrderSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should return the error flag', () => {
      store.dispatch(new OrderActions.CancelReplenishmentOrderFail(mockError));

      let result: boolean;

      userReplenishmentOrderService
        .getCancelReplenishmentOrderError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should dispatch a ClearCancelReplenishmentOrder action', () => {
      userReplenishmentOrderService.clearCancelReplenishmentOrderProcessState();

      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.ClearCancelReplenishmentOrder()
      );
    });
  });

  describe('Replenishment Order List', () => {
    it('should be able to get replenishment order history list', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersSuccess({
          replenishmentOrders: [],
          pagination: {},
          sorts: [],
        })
      );

      let result: ReplenishmentOrderList;
      userReplenishmentOrderService
        .getReplenishmentOrderHistoryList(1)
        .subscribe((data) => {
          result = data;
        })
        .unsubscribe();
      expect(result).toEqual({
        replenishmentOrders: [],
        pagination: {},
        sorts: [],
      });
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: boolean;

      userReplenishmentOrderService
        .getReplenishmentOrderHistoryListLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: boolean;

      userReplenishmentOrderService
        .getReplenishmentOrderHistoryListSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersFail(mockError)
      );

      let result: boolean;

      userReplenishmentOrderService
        .getReplenishmentOrderHistoryListError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should be able to load replenishment order list data', () => {
      userReplenishmentOrderService.loadReplenishmentOrderList(10, 1, 'byDate');
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadUserReplenishmentOrders({
          userId: mockUserId,
          pageSize: 10,
          currentPage: 1,
          sort: 'byDate',
        })
      );
    });

    it('should be able to clear replenishment order list', () => {
      userReplenishmentOrderService.clearReplenishmentOrderList();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.ClearUserReplenishmentOrders()
      );
    });
  });
});
