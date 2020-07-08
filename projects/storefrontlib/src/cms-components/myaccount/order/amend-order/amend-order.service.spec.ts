import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Order } from '@spartacus/core';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details/order-details.service';
import { AmendOrderType } from './amend-order.model';
import { OrderAmendService } from './amend-order.service';

const mockOrder: Order = {
  code: '123',
  entries: [
    { entryNumber: 0, cancellableQuantity: 3 },
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

describe('OrderAmendService', () => {
  let service: OrderAmendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderAmendService,
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    });

    service = TestBed.inject(OrderAmendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return order details', () => {
    let result;
    service
      .getOrder()
      .subscribe((f) => (result = f))
      .unsubscribe();
    expect(result).toEqual(mockOrder);
  });

  it('should return form with orderCode control', () => {
    let form;
    service
      .getForm()
      .subscribe((f) => (form = f))
      .unsubscribe();

    expect(form.get('orderCode').value).toEqual('123');
  });

  it('should return form with order entries', () => {
    let form;
    service
      .getForm()
      .subscribe((f) => (form = f))
      .unsubscribe();

    expect(Object.keys(<FormGroup>form.get('entries').controls).length).toEqual(
      2
    );
  });

  it('should return cancellable', () => {
    (<any>service).amendType = AmendOrderType.CANCEL;
    expect(service.isCancellation()).toBeTruthy();
  });

  it('should not return cancellable', () => {
    (<any>service).amendType = AmendOrderType.RETURN;
    expect(service.isCancellation()).toBeFalsy();
  });

  it('should return max quantity for cancellable order', () => {
    (<any>service).amendType = AmendOrderType.CANCEL;
    expect(service.getMaxAmendQuantity(mockOrder.entries[0])).toEqual(
      mockOrder.entries[0].cancellableQuantity
    );
  });

  it('should return max return quantity for returnable order', () => {
    (<any>service).amendType = AmendOrderType.RETURN;
    expect(service.getMaxAmendQuantity(mockOrder.entries[1])).toEqual(
      mockOrder.entries[1].returnableQuantity
    );
  });

  it('should calculated amended item price', () => {
    let form: FormGroup;
    service
      .getForm()
      .subscribe((f) => (form = f))
      .unsubscribe();

    const control = form.get('entries').get('3');
    control.setValue(5);

    const price = service.getAmendedPrice(mockOrder.entries[1]);
    expect(price.value).toEqual(50.0);
    expect(price.formattedValue).toEqual('$50.00');
  });
});
