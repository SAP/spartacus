import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Order, OrderHistoryList } from '../../model/order.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { RoutingService } from '../../routing/facade/routing.service';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserOrderService } from './user-order.service';

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

describe('UserOrderService', () => {
  let userOrderService: UserOrderService;
  let userIdService: UserIdService;
  let routingService: RoutingService;
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
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    userOrderService = TestBed.inject(UserOrderService);
    userIdService = TestBed.inject(UserIdService);
    routingService = TestBed.inject(RoutingService);
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

  it('should be able to load order list data when replenishment order code is NOT defined', () => {
    userOrderService.loadOrderList(10, 1, 'byDate');

    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadUserOrders({
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
      new UserActions.LoadUserOrders({
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
