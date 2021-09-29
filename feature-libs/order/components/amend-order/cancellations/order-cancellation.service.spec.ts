import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { GlobalMessageService, Order, RoutingService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancellationService } from './order-cancellation.service';
import createSpy = jasmine.createSpy;

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

class MockUserOrderService {
  cancelOrder = createSpy();
  getCancelOrderSuccess() {
    return of(true);
  }
  resetCancelOrderProcessState() {}
}
class MockRoutingService {
  go = createSpy();
}
class MockGlobalMessageService {
  add = createSpy();
}

describe('OrderCancellationService', () => {
  let service: OrderCancellationService;
  let userOrderService: OrderFacade;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;

  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderCancellationService,
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
        {
          provide: OrderFacade,
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

    service = TestBed.inject(OrderCancellationService);

    userOrderService = TestBed.inject(OrderFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);

    service
      .getForm()
      .subscribe((f) => (form = f))
      .unsubscribe();

    form.get('entries').get('1').setValue(3);
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
      .subscribe((entries) => (result = entries))
      .unsubscribe();

    expect(result.length).toEqual(2);
  });

  it('should return 1 amended entry', () => {
    let result;

    service
      .getAmendedEntries()
      .subscribe((entries) => (result = entries))
      .unsubscribe();

    expect(result.length).toEqual(1);
  });

  it('should save one item', () => {
    service.save();

    expect(userOrderService.cancelOrder).toHaveBeenCalledWith('123', {
      cancellationRequestEntryInputs: [{ orderEntryNumber: 1, quantity: 3 }],
    });
  });

  it('should reset form after saving', () => {
    service.save();

    expect(form.dirty).toBeFalsy();
    expect(form.pristine).toBeTruthy();
  });

  it('should send global message', () => {
    service.save();
    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should route to orders', () => {
    service.save();
    expect(routingService.go).toHaveBeenCalled();
    // With({
    //   cxRoute: 'orders',
    // });
  });
});
