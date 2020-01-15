import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  Order,
  OrderReturnRequestService,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderReturnService } from './order-return.service';

const mockOrder: Order = {
  code: '123',
  entries: [
    { entryNumber: 0, cancellableQuantity: 3 },
    { entryNumber: 1, cancellableQuantity: 5 },
    { entryNumber: 2, returnableQuantity: 5 },
    {
      entryNumber: 3,
      returnableQuantity: 9,
      basePrice: { value: 10.0, currencyIso: 'USD' },
    },
  ],
  created: new Date('2019-02-11T13:02:58+0000'),
  cancellable: true,
};

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

class MockOrderReturnRequestService {}
class MockRoutingService {}
class MockGlobalMessageService {}

describe('OrderReturnService', () => {
  let service: OrderReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderReturnService,
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });

    service = TestBed.get(OrderReturnService as Type<OrderReturnService>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not return cancellation', () => {
    expect(service.isCancellation()).toBeFalsy();
  });

  it('should return 2 cancellable entries', () => {
    let result;
    service
      .getEntries()
      .subscribe(entries => (result = entries))
      .unsubscribe();

    expect(result.length).toEqual(2);
  });

  it('should return 1 amended entry', () => {
    let form;
    service
      .getForm()
      .subscribe(f => (form = f))
      .unsubscribe();

    form
      .get('entries')
      .get('2')
      .setValue(3);

    let result;

    service
      .getAmendedEntries()
      .subscribe(entries => (result = entries))
      .unsubscribe();

    expect(result.length).toEqual(1);
  });
});
