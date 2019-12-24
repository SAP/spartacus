import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  RoutingService,
  LanguageService,
  GlobalMessageService,
  OrderEntry,
  UserOrderService,
  GlobalMessageType,
  OrderReturnRequestService,
  SemanticPathService,
} from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { OrderCancelOrReturnService } from './cancel-or-return.service';

const router = {
  state: {
    url: '/cancel/1234/confirmation',
    params: { orderCode: '1234' },
  },
  nextState: {
    url: '/cancel/1234',
    params: { orderCode: '1234' },
  },
};
class MockRoutingService {
  go = jasmine.createSpy('go');
  getRouterState(): Observable<any> {
    return of(router);
  }
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockUserOrderService {
  cancelOrder = jasmine.createSpy();
  resetCancelOrderProcessState = jasmine.createSpy();
  getCancelOrderLoading() {
    return false;
  }
  getCancelOrderSuccess() {
    return true;
  }
}

class MockOrderReturnRequestService {
  createOrderReturnRequest = jasmine.createSpy();
  clearOrderReturnRequestDetail = jasmine.createSpy();
  getReturnRequestLoading() {
    return false;
  }
  getReturnRequestSuccess() {
    return true;
  }
  getOrderReturnRequest() {
    return of({ rma: '1' });
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

class MockSemanticPathService {
  transform(): string[] {
    return [];
  }
}

const mockRequestInputs = [
  { orderEntryNumber: 1, quantity: 1 },
  { orderEntryNumber: 2, quantity: 2 },
];

describe('OrderCancelOrReturnService', () => {
  let service: OrderCancelOrReturnService;
  let routingService: MockRoutingService;
  let userOrderService: MockUserOrderService;
  let messageService: MockGlobalMessageService;
  let returnRequestService: MockOrderReturnRequestService;
  let semanticPathService: MockSemanticPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderCancelOrReturnService,
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: UserOrderService, useClass: MockUserOrderService },
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    });

    service = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    userOrderService = TestBed.get(UserOrderService as Type<UserOrderService>);
    returnRequestService = TestBed.get(OrderReturnRequestService as Type<
      OrderReturnRequestService
    >);
    messageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    semanticPathService = TestBed.get(SemanticPathService as Type<
      SemanticPathService
    >);

    service.cancelOrReturnRequestInputs = mockRequestInputs;
    spyOn(semanticPathService, 'transform').and.returnValues(
      ['/', 'cancel', '1234', 'confimation'],
      ['/', 'cancel', '1234']
    );
    spyOn(service, 'clearCancelOrReturnRequestInputs').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service['keepRequestInputs']).toBeTruthy();
  });

  it('should be able to clear/keep cancelOrReturnRequestInputs', () => {
    service['keepRequestInputs'] = false;
    service.clearCancelOrReturnRequestInputs();
    expect(service.cancelOrReturnRequestInputs).toEqual([]);

    service.cancelOrReturnRequestInputs = mockRequestInputs;
    service['keepRequestInputs'] = true;
    service.clearCancelOrReturnRequestInputs();
    expect(service.cancelOrReturnRequestInputs).toEqual(mockRequestInputs);
  });

  it('should be able to check whether entry is cancelled or returned', () => {
    let entry: OrderEntry = { entryNumber: 0 };
    let value = service.isEntryCancelledOrReturned(entry);
    expect(value).toEqual(false);

    entry = { entryNumber: 1 };
    value = service.isEntryCancelledOrReturned(entry);
    expect(value).toEqual(true);
  });

  it('should be able to get cancelled or returned quantity', () => {
    let entry: OrderEntry = { entryNumber: 0 };
    let value = service.getEntryCancelledOrReturnedQty(entry);
    expect(value).toEqual(0);

    entry = { entryNumber: 1 };
    value = service.getEntryCancelledOrReturnedQty(entry);
    expect(value).toEqual(1);

    entry = { entryNumber: 2 };
    value = service.getEntryCancelledOrReturnedQty(entry);
    expect(value).toEqual(2);
  });

  it('should be able to go to cancel/return or confirmation page', () => {
    service.goToOrderCancelOrReturn('test', '1');
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'test',
      params: { code: '1' },
    });
  });

  it('should be able to go to get calculated item price', () => {
    const entry = {
      entryNumber: 1,
      returnableQuantity: 1,
      basePrice: { value: 10.0, currencyIso: 'USD' },
    };
    const price = service.getCancelledOrReturnedPrice(entry);
    expect(price.value).toEqual(10.0);
    expect(price.formattedValue).toEqual('$10.00');
  });

  it('should be able to cancel order', () => {
    service.cancelOrder('test');
    expect(userOrderService.cancelOrder).toHaveBeenCalledWith('test', {
      cancellationRequestEntryInputs: mockRequestInputs,
    });
  });

  it('should add global message and redirect to order history page after cancel success', () => {
    service.cancelSuccess('1');
    expect(service.clearCancelOrReturnRequestInputs).toHaveBeenCalled();
    expect(userOrderService.resetCancelOrderProcessState).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orders',
    });
    expect(messageService.add).toHaveBeenCalledWith(
      {
        key: 'orderDetails.cancellationAndReturn.cancelSuccess',
        params: { orderCode: '1' },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should be able to return order', () => {
    service.returnOrder('test');
    expect(returnRequestService.createOrderReturnRequest).toHaveBeenCalledWith({
      orderCode: 'test',
      returnRequestEntryInputs: mockRequestInputs,
    });
  });

  it('should add global message and redirect to return request details page after return success', () => {
    service.returnSuccess();

    expect(service.clearCancelOrReturnRequestInputs).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'returnRequestDetails',
      params: { rma: '1' },
    });
    expect(messageService.add).toHaveBeenCalledWith(
      {
        key: 'orderDetails.cancellationAndReturn.returnSuccess',
        params: { rma: '1' },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should be able to back to order details page', () => {
    service.backToOrder('test');

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: { code: 'test' },
    });
  });

  it('should be able to clear return request data', () => {
    service.clearReturnRequest();
    expect(
      returnRequestService.clearOrderReturnRequestDetail
    ).toHaveBeenCalled();
  });
});
