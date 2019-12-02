import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RoutingService, LanguageService, OrderEntry } from '@spartacus/core';
import { of } from 'rxjs';
import { OrderCancelOrReturnService } from './cancel-or-return.service';

class MockRoutingService {
  go = jasmine.createSpy('go');
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockRequestInputs = [
  { orderEntryNumber: 1, quantity: 1 },
  { orderEntryNumber: 2, quantity: 2 },
];

describe('OrderCancelOrReturnService', () => {
  let service: OrderCancelOrReturnService;
  let routingService: MockRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderCancelOrReturnService,
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
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
});
