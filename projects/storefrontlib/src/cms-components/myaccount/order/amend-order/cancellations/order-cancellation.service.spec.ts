import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  Order,
  RoutingService,
  UserOrderService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancellationService } from './order-cancellation.service';

const mockOrder: Order = {
  code: '123',
  entries: [
    { entryNumber: 0, cancellableQuantity: 3 },
    { entryNumber: 1, cancellableQuantity: 5 },
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

class MockUserOrderService {}
class MockRoutingService {}
class MockGlobalMessageService {}

describe('OrderCancellationService', () => {
  let service: OrderCancellationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderCancellationService,
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
        {
          provide: UserOrderService,
          useClass: MockUserOrderService,
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

    service = TestBed.get(OrderCancellationService as Type<
      OrderCancellationService
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cancellation', () => {
    expect(service.isCancellation()).toBeTruthy();
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
      .get('1')
      .setValue(3);

    let result;

    service
      .getAmendedEntries()
      .subscribe(entries => (result = entries))
      .unsubscribe();

    expect(result.length).toEqual(1);
  });
});
