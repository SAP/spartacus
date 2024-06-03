import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentTypeAdapter } from './checkout-payment-type.adapter';
import { CheckoutPaymentTypeConnector } from './checkout-payment-type.connector';
import createSpy = jasmine.createSpy;

class MockPaymentTypeAdapter implements Partial<CheckoutPaymentTypeAdapter> {
  getPaymentTypes = createSpy().and.returnValue(of([]));
  setPaymentType = createSpy().and.returnValue(of({}));
}

describe('PaymentTypeConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service: CheckoutPaymentTypeConnector;
  let adapter: CheckoutPaymentTypeAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentTypeConnector,
        {
          provide: CheckoutPaymentTypeAdapter,
          useClass: MockPaymentTypeAdapter,
        },
      ],
    });

    service = TestBed.inject(
      CheckoutPaymentTypeConnector as Type<CheckoutPaymentTypeConnector>
    );
    adapter = TestBed.inject(
      CheckoutPaymentTypeAdapter as Type<CheckoutPaymentTypeAdapter>
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPaymentType should call adapter', () => {
    let result;
    service
      .getPaymentTypes()
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.getPaymentTypes).toHaveBeenCalledWith();
  });

  it('setPaymentType should call adapter', () => {
    service
      .setPaymentType('userId', 'cartId', 'typeCode', 'poNumber')
      .pipe(take(1))
      .subscribe();
    expect(adapter.setPaymentType).toHaveBeenCalledWith(
      'userId',
      'cartId',
      'typeCode',
      'poNumber'
    );
  });
});
