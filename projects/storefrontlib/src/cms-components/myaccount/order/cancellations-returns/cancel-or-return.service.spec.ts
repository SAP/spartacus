import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  RoutingService,
  LanguageService,
  GlobalMessageService,
  Order,
  OrderEntry,
  UserOrderService,
  LoaderState,
  GlobalMessageType,
} from '@spartacus/core';
import { of, BehaviorSubject } from 'rxjs';
import { OrderCancelOrReturnService } from './cancel-or-return.service';

class MockRoutingService {
  go = jasmine.createSpy('go');
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const orderState: BehaviorSubject<LoaderState<Order>> = new BehaviorSubject({});
class MockUserOrderService {
  cancelOrder = jasmine.createSpy();
  getOrderDetailsState() {
    return orderState;
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderCancelOrReturnService,
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: UserOrderService, useClass: MockUserOrderService },
      ],
    });

    service = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    userOrderService = TestBed.get(UserOrderService as Type<UserOrderService>);
    messageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);

    service.cancelOrReturnRequestInputs = mockRequestInputs;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
    service.goToOrderCancelOrReturn('test', '1', true);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'test',
      params: { code: '1' },
    });
    expect(service['keepRequestInputs']).toEqual(true);
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
    service.cancelOrder('test', {});
    expect(userOrderService.cancelOrder).toHaveBeenCalledWith('test', {});
  });

  it('should add global message and redirect to order history page after cancel success', () => {
    spyOn(service, 'clearCancelOrReturnRequestInputs').and.callThrough();

    orderState.next({
      loading: false,
      error: false,
      success: true,
      value: { code: '1' },
    });
    service.isCancelling$.subscribe().unsubscribe();
    expect(service.clearCancelOrReturnRequestInputs).toHaveBeenCalled();
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

  it('should do nothing when cancelling', () => {
    orderState.next({
      loading: true,
      error: false,
      success: false,
      value: { code: '1' },
    });
    service.isCancelling$.subscribe().unsubscribe();

    expect(routingService.go).not.toHaveBeenCalledWith({
      cxRoute: 'orders',
    });
  });
});
