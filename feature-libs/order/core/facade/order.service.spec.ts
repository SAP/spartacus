import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  Order,
  OrderHistoryList,
  PROCESS_FEATURE,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import * as fromProcessReducers from 'projects/core/src/process/store/reducers/index';
import { Observable, of, throwError } from 'rxjs';
import { OrderActions } from '../store/actions/index';
import { ORDER_FEATURE, StateWithOrder } from '../store/order-state';
import * as fromStoreReducers from '../store/reducers/index';
import { OrderService } from './order.service';

const mockReplenishmentOrderCode = 'test-repl-code';

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of();
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('OrderService', () => {
  let userOrderService: OrderService;
  let userIdService: UserIdService;
  let routingService: RoutingService;
  let store: Store<StateWithOrder>;

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
        OrderService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    userOrderService = TestBed.inject(OrderService);
    userIdService = TestBed.inject(UserIdService);
    routingService = TestBed.inject(RoutingService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should OrderService is injected', inject(
    [OrderService],
    (service: OrderService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be able to get order details', () => {
    store.dispatch(
      new OrderActions.LoadOrderDetailsSuccess({ code: 'testOrder' })
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
      new OrderActions.LoadOrderDetails({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'orderCode',
      })
    );
  });

  it('should be able to clear order details', () => {
    userOrderService.clearOrderDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ClearOrderDetails()
    );
  });

  it('should be able to get order history list', () => {
    store.dispatch(
      new OrderActions.LoadUserOrdersSuccess({
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
    store.dispatch(new OrderActions.LoadUserOrdersSuccess({}));

    let orderListLoaded: boolean;
    userOrderService
      .getOrderHistoryListLoaded()
      .subscribe((data) => {
        orderListLoaded = data;
      })
      .unsubscribe();
    expect(orderListLoaded).toEqual(true);
  });

  it('should be able to load order list data when replenishment order code is NOT defined', () => {
    userOrderService.loadOrderList(10, 1, 'byDate');

    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.LoadUserOrders({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
        replenishmentOrderCode: undefined,
      })
    );
  });

  it('should be able to load order list data when replenishment order code is defined', () => {
    spyOn(routingService, 'getRouterState').and.returnValue(
      of({
        state: {
          params: {
            replenishmentOrderCode: mockReplenishmentOrderCode,
          },
        },
      } as any)
    );

    userOrderService.loadOrderList(10, 1, 'byDate');

    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.LoadUserOrders({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
        replenishmentOrderCode: mockReplenishmentOrderCode,
      })
    );
  });

  it('should NOT load order list data when user is anonymous', () => {
    spyOn(userIdService, 'takeUserId').and.callFake(() => {
      return throwError('Error');
    });

    userOrderService.loadOrderList(10, 1, 'byDate');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should be able to clear order list', () => {
    userOrderService.clearOrderList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ClearUserOrders()
    );
  });

  it('should be able to get consignment tracking', () => {
    store.dispatch(
      new OrderActions.LoadConsignmentTrackingSuccess({
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
      new OrderActions.LoadConsignmentTracking({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'orderCode',
        consignmentCode: 'consignmentCode',
      })
    );
  });

  it('should be able to clear consignment tracking', () => {
    userOrderService.clearConsignmentTracking();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ClearConsignmentTracking()
    );
  });

  it('should be able to cancel an order', () => {
    userOrderService.cancelOrder('test', {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.CancelOrder({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'test',
        cancelRequestInput: {},
      })
    );
  });

  it('should be able to get CancelOrder loading flag', () => {
    store.dispatch(
      new OrderActions.CancelOrder({
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
    store.dispatch(new OrderActions.CancelOrderSuccess());
    userOrderService
      .getCancelOrderSuccess()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to reset CancelOrder process state', () => {
    userOrderService.resetCancelOrderProcessState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ResetCancelOrderProcess()
    );
  });
});
