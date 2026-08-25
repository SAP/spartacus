import { inject, TestBed } from '@angular/core/testing';
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
import * as fromProcessReducers from '@spartacus/core/process/store/reducers';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderActions } from '../store';
import { ORDER_FEATURE, StateWithOrder } from '../store/order-state';
import * as fromStoreReducers from '../store/reducers/index';
import { MyAccountV2OrderHistoryService } from './my-account-v2-order-history.service';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
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
  clearOrderList = vi.fn();
  getOrderHistoryList = vi.fn();
}
class MockOrderReturnRequestService
  implements Partial<OrderReturnRequestService>
{
  getOrderReturnRequestList = vi.fn();
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
    vi.spyOn(store, 'dispatch');
  });

  it('should be injected', inject(
    [MyAccountV2OrderHistoryService],
    (service: MyAccountV2OrderHistoryService) => {
      expect(service).toBeTruthy();
    }
  ));
  it('should clear order history list', () => {
    historyService.clearOrderList = vi.fn().mockImplementation(() => {});
    service.clearOrderList();
    expect(historyService.clearOrderList).toHaveBeenCalled();
  });
  describe('getConsignmentTracking', () => {
    it('should load consignment tracking when not present in the store', async () => {
      vi.spyOn(userService, 'takeUserId');
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

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(userService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadConsignmentTrackingById({
          orderCode,
          consignmentCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
      sub.unsubscribe();
    });

    it('should be able to return consignment tracking without loading when present in the store', () => {
      vi.spyOn(userService, 'takeUserId');
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

  describe('getOrderDetailsV2', () => {
    it('should load order details when not present in the store', async () => {
      vi.spyOn(userService, 'takeUserId');
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

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(userService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderActions.LoadOrderById({
          code: orderCode,
          userId: OCC_USER_ID_CURRENT,
        })
      );
      sub.unsubscribe();
    });

    it('should be able to return order without loading when present in the store', () => {
      vi.spyOn(userService, 'takeUserId');
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
      vi.spyOn(userService, 'takeUserId');
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
    it('should not emit when success and error are null or undefined', () => {
      vi.spyOn(service as any, 'getOrderDetailsState').mockReturnValue(
        of({ success: null, error: undefined, loading: false, value: null })
      );
      service.getOrderDetailsV2(orderCode).subscribe(() => {
        fail('Should not emit any value');
      });
      expect((service as any).getOrderDetailsState).toHaveBeenCalledWith(
        orderCode
      );
    });
  });
  describe('getOrderDetailsWithTracking', () => {
    it('should return order details with consignment tracking', () => {
      vi.spyOn(service, 'getOrderDetailsV2').mockReturnValue(of(order1));
      vi.spyOn(service, 'getConsignmentTracking').mockReturnValue(
        of(tracking1)
      );
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
      vi.spyOn(service, 'getOrderDetailsV2').mockReturnValue(of(order2));
      vi.spyOn(service, 'getConsignmentTracking').mockImplementation(() => {});
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
      historyService.getOrderHistoryList = vi.fn().mockReturnValue(of(list));
      vi.spyOn(service, 'getOrderDetailsWithTracking').mockImplementation(
        (code: string) => (code === orderCode2 ? of(order2) : of(order1))
      );
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
      returnService.getOrderReturnRequestList = vi
        .fn()
        .mockReturnValue(of(returnList));
      vi.spyOn(service, 'getOrderHistoryListWithDetails').mockReturnValue(
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
