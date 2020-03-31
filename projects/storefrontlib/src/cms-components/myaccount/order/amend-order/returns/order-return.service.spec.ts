import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import {
  GlobalMessageService,
  Order,
  OrderReturnRequestService,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderReturnService } from './order-return.service';
import createSpy = jasmine.createSpy;

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

class MockOrderReturnRequestService {
  createOrderReturnRequest = createSpy();
  getReturnRequestSuccess() {
    return of(true);
  }
  getOrderReturnRequest() {
    return of({ rma: 'rma-number' });
  }
}

class MockRoutingService {
  go = createSpy();
}
class MockGlobalMessageService {
  add = createSpy();
}

describe('OrderReturnService', () => {
  let service: OrderReturnService;
  let returnRequestService: OrderReturnRequestService;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;

  let form: FormGroup;

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

    service = TestBed.inject(OrderReturnService);

    returnRequestService = TestBed.inject(OrderReturnRequestService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);

    service
      .getForm()
      .subscribe((f) => (form = f))
      .unsubscribe();

    form.get('entries').get('2').setValue(3);
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

    expect(returnRequestService.createOrderReturnRequest).toHaveBeenCalledWith({
      orderCode: '123',
      returnRequestEntryInputs: [{ orderEntryNumber: 2, quantity: 3 }],
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

  it('should route to returnRequestDetails', () => {
    service.save();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'returnRequestDetails',
      params: { rma: 'rma-number' },
    });
  });
});
