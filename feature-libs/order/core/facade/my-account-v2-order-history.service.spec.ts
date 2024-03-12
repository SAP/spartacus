import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  PROCESS_FEATURE,
  UserIdService,
} from '@spartacus/core';
import {
  ConsignmentTracking,
  Order,
  OrderHistoryListView,
} from '@spartacus/order/root';
import * as fromProcessReducers from 'projects/core/src/process/store/reducers/index';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderActions } from '../store';
import { ORDER_FEATURE, StateWithOrder } from '../store/order-state';
import * as fromStoreReducers from '../store/reducers/index';
import { MyAccountV2OrderHistoryService } from './my-account-v2-order-history.service';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import createSpy = jasmine.createSpy;
const orderCode = 'order1';
const consignmentCode = 'cons1';
const orderCode2 = 'order2';
const consignmentCode2 = 'cons2';
const trackingID = 't1';
const consignments1 = [{ code: consignmentCode, trackingID: trackingID }];
const consignments2 = [{ code: consignmentCode2 }];
const order1: Order = {
  code: orderCode,
  status: 'pending',
  consignments: consignments1,
};
const order2: Order = {
  code: orderCode2,
  status: 'pending',
  consignments: consignments2,
};
const tracking1: ConsignmentTracking = {
  trackingID: trackingID,
  trackingUrl: 'yyy',
};
const list = {
  orders: [
    { code: orderCode, status: 'pending' },
    { code: orderCode2, status: 'pending' },
  ],
  pagination: {},
  sorts: [],
};
const return1 = { code: 'return1', order: { code: orderCode } };
const return2 = { code: 'return2', order: { code: orderCode2 } };
const returnList = {
  returnRequests: [return1, return2],
  pagination: {},
  sorts: [],
};
class MockOrderHistoryService implements Partial<OrderHistoryService> {
  clearOrderList = createSpy();
  getOrderHistoryList = createSpy();
}
class MockOrderReturnRequestService
  implements Partial<OrderReturnRequestService>
{
  getOrderReturnRequestList = createSpy();
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('MyAccountV2OrderHistoryService', () => {
  let service: MyAccountV2OrderHistoryService;
  let returnService: OrderReturnRequestService;
  let userService: UserIdService;
  let historyService: OrderHistoryService;
  let store: Store<StateWithOrder>;
  let actions$: ActionsSubject;

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
        MyAccountV2OrderHistoryService,
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: OrderHistoryService, useClass: MockOrderHistoryService },
      ],
    });

    service = TestBed.inject(MyAccountV2OrderHistoryService);
    returnService = TestBed.inject(OrderReturnRequestService);
    userService = TestBed.inject(UserIdService);
    historyService = TestBed.inject(OrderHistoryService);
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(ActionsSubject);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be injected', inject(
    [MyAccountV2OrderHistoryService],
    (service: MyAccountV2OrderHistoryService) => {
      expect(service).toBeTruthy();
    }
  ));
  it('should clear order history list', () => {
    historyService.clearOrderList = createSpy().and.stub();
    service.clearOrderList();
    expect(historyService.clearOrderList).toHaveBeenCalled();
  });
  describe('getConsignmentTracking', () => {
    it('should load consignment tracking when not present in the store', fakeAsync(() => {
      spyOn(userService, 'takeUserId').and.callThrough();
      const sub = service
        .getConsignmentTracking(orderCode, consignmentCode)
        .subscribe();

      actions$
        .pipe(ofType(OrderActions.LOAD_CONSIGNMENT_TRACKING_BY_ID), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new OrderActions.LoadConsignmentTrackingById({
              orderCode,
              consignmentCode,
              userId: OCC_USER_ID_CURRENT,
            })
          );
        });

      tick();
      expect(userService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadConsignmentTrackingById({
          orderCode,
          consignmentCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
      sub.unsubscribe();
    }));

    it('should be able to return consignment tracking without loading when present in the store', () => {
      spyOn(userService, 'takeUserId').and.callThrough();
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode,
          consignmentCode,
          consignmentTracking: tracking1,
        })
      );
      service
        .getConsignmentTracking(orderCode, consignmentCode)
        .subscribe((data) => {
          expect(data).toEqual(tracking1);
        })
        .unsubscribe();
      expect(userService.takeUserId).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrderActions.LoadConsignmentTrackingById({
          orderCode,
          consignmentCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
    });
  });

  describe('getOrderDetails', () => {
    it('should load order details when not present in the store', fakeAsync(() => {
      spyOn(userService, 'takeUserId').and.callThrough();
      const sub = service.getOrderDetails(orderCode).subscribe();

      actions$
        .pipe(ofType(OrderActions.LOAD_ORDER_BY_ID), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new OrderActions.LoadOrderById({
              userId: OCC_USER_ID_CURRENT,
              code: orderCode,
            })
          );
        });

      tick();
      expect(userService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadOrderById({
          code: orderCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
      sub.unsubscribe();
    }));

    it('should be able to return order without loading when present in the store', () => {
      spyOn(userService, 'takeUserId').and.callThrough();
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order1));
      service
        .getOrderDetails(orderCode)
        .subscribe((data) => {
          expect(data).toEqual(order1);
        })
        .unsubscribe();
      expect(userService.takeUserId).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrderActions.LoadOrderById({
          code: orderCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
    });
  });
  describe('getOrderDetailsV2', () => {
    it('should load order details when not present in the store', fakeAsync(() => {
      spyOn(userService, 'takeUserId').and.callThrough();
      const sub = service.getOrderDetailsV2(orderCode).subscribe();

      actions$
        .pipe(ofType(OrderActions.LOAD_ORDER_BY_ID), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new OrderActions.LoadOrderById({
              userId: OCC_USER_ID_CURRENT,
              code: orderCode,
            })
          );
        });

      tick();
      expect(userService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadOrderById({
          code: orderCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
      sub.unsubscribe();
    }));

    it('should be able to return order without loading when present in the store', () => {
      spyOn(userService, 'takeUserId').and.callThrough();
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order1));
      service
        .getOrderDetailsV2(orderCode)
        .subscribe((data) => {
          expect(data).toEqual(order1);
        })
        .unsubscribe();
      expect(userService.takeUserId).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrderActions.LoadOrderById({
          code: orderCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
    });
    it('should return `undefined` in case of error when loading order', () => {
      spyOn(userService, 'takeUserId').and.callThrough();
      store.dispatch(
        new OrderActions.LoadOrderByIdFail({
          code: 'orderX',
          error: 'Product not found',
        })
      );
      service
        .getOrderDetailsV2('orderX')
        .subscribe((data) => {
          expect(data).toEqual(undefined);
        })
        .unsubscribe();
    });
  });
  describe('getOrderDetailsWithTracking', () => {
    it('should return order details with consignment tracking', () => {
      spyOn(service, 'getOrderDetailsV2').and.returnValue(of(order1));
      spyOn(service, 'getConsignmentTracking').and.returnValue(of(tracking1));
      service.getOrderDetailsWithTracking(orderCode).subscribe((result) => {
        expect(result).toEqual({
          code: orderCode,
          status: 'pending',
          consignments: [
            {
              code: consignmentCode,
              trackingID: trackingID,
              consignmentTracking: {
                trackingID: trackingID,
                trackingUrl: 'yyy',
              },
            },
          ],
        });
        expect(service.getOrderDetailsV2).toHaveBeenCalledWith(orderCode);
        expect(service.getConsignmentTracking).toHaveBeenCalledWith(
          orderCode,
          consignmentCode
        );
      });
    });
    it('should return order details without consignment tracking', () => {
      spyOn(service, 'getOrderDetailsV2').and.returnValue(of(order2));
      spyOn(service, 'getConsignmentTracking').and.stub();
      service.getOrderDetailsWithTracking(orderCode).subscribe((result) => {
        expect(result).toEqual({
          code: orderCode2,
          status: 'pending',
          consignments: [
            {
              code: consignmentCode2,
            },
          ],
        });
        expect(service.getOrderDetailsV2).toHaveBeenCalledWith(orderCode);
        expect(service.getConsignmentTracking).not.toHaveBeenCalled();
      });
    });
  });
  describe('getOrderHistoryListWithDetails', () => {
    it('should return order details with extra details', () => {
      historyService.getOrderHistoryList = createSpy().and.returnValue(
        of(list)
      );
      spyOn(service, 'getOrderDetailsWithTracking')
        .withArgs(orderCode2)
        .and.returnValue(of(order2))
        .withArgs(orderCode)
        .and.returnValue(of(order1));
      service.getOrderHistoryListWithDetails(2).subscribe((data) => {
        expect(data).toEqual({
          orders: [
            {
              code: orderCode,
              status: 'pending',
              consignments: consignments1,
              returnRequests: [],
              entries: undefined,
              unconsignedEntries: undefined,
              returnable: undefined,
              totalItems: undefined,
            },
            {
              code: orderCode2,
              status: 'pending',
              consignments: consignments2,
              returnRequests: [],
              entries: undefined,
              unconsignedEntries: undefined,
              returnable: undefined,
              totalItems: undefined,
            },
          ],
          pagination: {},
          sorts: [],
        });
      });
    });
  });

  describe('getOrderHistoryList', () => {
    it('should return order list wth retrurn request details', () => {
      let output: OrderHistoryListView = {
        orders: [
          {
            code: orderCode,
            status: 'pending',
            consignments: consignments1,
            returnRequests: [return1],
          },
          {
            code: orderCode2,
            status: 'pending',
            consignments: consignments2,
            returnRequests: [return2],
          },
        ],
        pagination: {},
        sorts: [],
      };
      returnService.getOrderReturnRequestList = createSpy().and.returnValue(
        of(returnList)
      );
      spyOn(service, 'getOrderHistoryListWithDetails').and.returnValue(
        of({
          orders: [
            {
              code: orderCode,
              status: 'pending',
              consignments: consignments1,
              returnRequests: [],
            },
            {
              code: orderCode2,
              status: 'pending',
              consignments: consignments2,
              returnRequests: [],
            },
          ],
          pagination: {},
          sorts: [],
        })
      );
      service
        .getOrderHistoryList(2)
        .subscribe((data: OrderHistoryListView | undefined) => {
          expect(data).toEqual(output);
        });
    });
  });
});
