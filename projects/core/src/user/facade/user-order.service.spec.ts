import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../../auth/facade/auth.service';
import { Order, OrderHistoryList } from '../../model/order.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserOrderService } from './user-order.service';

class MockAuthService {
  invokeWithUserId(cb) {
    cb(OCC_USER_ID_CURRENT);
  }
}

describe('UserOrderService', () => {
  let userOrderService: UserOrderService;
  let authService: AuthService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UserOrderService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    userOrderService = TestBed.inject(UserOrderService);
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should UserOrderService is injected', inject(
    [UserOrderService],
    (service: UserOrderService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be able to get order details', () => {
    store.dispatch(
      new UserActions.LoadOrderDetailsSuccess({ code: 'testOrder' })
    );

    let order: Order;
    userOrderService
      .getOrderDetails()
      .subscribe((data) => {
        order = data;
      })
      .unsubscribe();
    expect(order).toEqual({ code: 'testOrder' });
  });

  it('should be able to load order details', () => {
    userOrderService.loadOrderDetails('orderCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadOrderDetails({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'orderCode',
      })
    );
  });

  it('should be able to clear order details', () => {
    userOrderService.clearOrderDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearOrderDetails()
    );
  });

  it('should be able to get order history list', () => {
    store.dispatch(
      new UserActions.LoadUserOrdersSuccess({
        orders: [],
        pagination: {},
        sorts: [],
      })
    );

    let orderList: OrderHistoryList;
    userOrderService
      .getOrderHistoryList(1)
      .subscribe((data) => {
        orderList = data;
      })
      .unsubscribe();
    expect(orderList).toEqual({
      orders: [],
      pagination: {},
      sorts: [],
    });
  });

  it('should be able to get order list loaded flag', () => {
    store.dispatch(new UserActions.LoadUserOrdersSuccess({}));

    let orderListLoaded: boolean;
    userOrderService
      .getOrderHistoryListLoaded()
      .subscribe((data) => {
        orderListLoaded = data;
      })
      .unsubscribe();
    expect(orderListLoaded).toEqual(true);
  });

  it('should be able to load order list data', () => {
    const PAGE_SIZE = 10;
    userOrderService.loadOrderList(PAGE_SIZE, 1, 'byDate');

    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadUserOrders({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );
  });

  it('should NOT load order list data when user is anonymous', () => {
    const PAGE_SIZE = 10;
    spyOn(authService, 'invokeWithUserId').and.callFake((cb) =>
      cb(OCC_USER_ID_ANONYMOUS)
    );

    userOrderService.loadOrderList(PAGE_SIZE, 1, 'byDate');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should be able to clear order list', () => {
    userOrderService.clearOrderList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearUserOrders()
    );
  });

  it('should be able to get consignment tracking', () => {
    store.dispatch(
      new UserActions.LoadConsignmentTrackingSuccess({
        trackingID: '1234567890',
      })
    );
    userOrderService
      .getConsignmentTracking()
      .subscribe((r) => expect(r).toEqual({ trackingID: '1234567890' }))
      .unsubscribe();
  });

  it('should be able to load consignment tracking', () => {
    userOrderService.loadConsignmentTracking('orderCode', 'consignmentCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadConsignmentTracking({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'orderCode',
        consignmentCode: 'consignmentCode',
      })
    );
  });

  it('should be able to clear consignment tracking', () => {
    userOrderService.clearConsignmentTracking();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearConsignmentTracking()
    );
  });

  it('should be able to cancel an order', () => {
    userOrderService.cancelOrder('test', {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.CancelOrder({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'test',
        cancelRequestInput: {},
      })
    );
  });

  it('should be able to get CancelOrder loading flag', () => {
    store.dispatch(
      new UserActions.CancelOrder({
        userId: 'current',
        orderCode: 'test',
        cancelRequestInput: {},
      })
    );
    userOrderService
      .getCancelOrderLoading()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to get CancelOrder Success flag', () => {
    store.dispatch(new UserActions.CancelOrderSuccess());
    userOrderService
      .getCancelOrderSuccess()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to reset CancelOrder process state', () => {
    userOrderService.resetCancelOrderProcessState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ResetCancelOrderProcess()
    );
  });
});
