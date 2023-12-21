import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  PROCESS_FEATURE,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import * as fromProcessReducers from 'projects/core/src/process/store/reducers/index';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { UnitOrderActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import {
  StateWithUnitOrder,
  UNIT_ORDER_FEATURE,
} from '../store/unit-order-state';
import { UnitOrderService } from './unit-order.service';

class MockRoutingService {
  getRouterState(): Observable<any> {
    return EMPTY;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UnitOrderService', () => {
  let unitOrderService: UnitOrderService;
  let userIdService: UserIdService;
  let store: Store<StateWithUnitOrder>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          UNIT_ORDER_FEATURE,
          fromStoreReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UnitOrderService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    unitOrderService = TestBed.inject(UnitOrderService);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should inject UnitOrderService', inject(
    [UnitOrderService],
    (service: UnitOrderService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be able to get unit order history list', () => {
    store.dispatch(
      new UnitOrderActions.LoadUnitOrdersSuccess({
        orders: [],
        pagination: {},
        sorts: [],
      })
    );

    let orderList: OrderHistoryList | undefined;
    unitOrderService
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

  it('should be able to get unit order list loaded flag', () => {
    store.dispatch(new UnitOrderActions.LoadUnitOrdersSuccess({}));

    let orderListLoaded: boolean | undefined;
    unitOrderService
      .getOrderHistoryListLoaded()
      .subscribe((data) => {
        orderListLoaded = data;
      })
      .unsubscribe();
    expect(orderListLoaded).toEqual(true);
  });

  it('should be able to load unit order list data', () => {
    unitOrderService.loadOrderList(10, 1, '', 'byDate');

    expect(store.dispatch).toHaveBeenCalledWith(
      new UnitOrderActions.LoadUnitOrders({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        filters: '',
        sort: 'byDate',
      })
    );
  });

  it('should NOT load order list data when user is anonymous', () => {
    spyOn(userIdService, 'takeUserId').and.callFake(() => {
      return throwError(() => 'Error');
    });

    unitOrderService.loadOrderList(10, 1, 'byDate');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should be able to clear order list', () => {
    unitOrderService.clearOrderList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UnitOrderActions.ClearUnitOrders()
    );
  });

  it('should be able to get order details', () => {
    store.dispatch(
      new UnitOrderActions.LoadOrderDetailsSuccess({ code: 'testOrder' })
    );

    let order: Order | undefined;
    unitOrderService
      .getOrderDetails()
      .subscribe((data) => {
        order = data;
      })
      .unsubscribe();
    expect(order).toEqual({ code: 'testOrder' });
  });

  it('should be able to load order details', () => {
    unitOrderService.loadOrderDetails('orderCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UnitOrderActions.LoadOrderDetails({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'orderCode',
      })
    );
  });

  it('should be able to clear order details', () => {
    unitOrderService.clearOrderDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UnitOrderActions.ClearOrderDetails()
    );
  });
});
