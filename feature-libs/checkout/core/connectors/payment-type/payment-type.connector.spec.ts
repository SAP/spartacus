import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PaymentTypeAdapter } from './payment-type.adapter';
import { PaymentTypeConnector } from './payment-type.connector';
import createSpy = jasmine.createSpy;

describe('PaymentTypeConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  class MockPaymentTypeAdapter implements PaymentTypeAdapter {
    loadPaymentTypes = createSpy().and.returnValue(of([]));
    setPaymentType = createSpy().and.returnValue(of({}));
  }

  let service: PaymentTypeConnector;
  let adapter: PaymentTypeAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentTypeConnector,
        {
          provide: PaymentTypeAdapter,
          useClass: MockPaymentTypeAdapter,
        },
      ],
    });

    service = TestBed.inject(
      PaymentTypeConnector as Type<PaymentTypeConnector>
    );
    adapter = TestBed.inject(PaymentTypeAdapter as Type<PaymentTypeAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPaymentType should call adapter', () => {
    let result;
    service.getPaymentTypes().subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadPaymentTypes).toHaveBeenCalledWith();
  });

  it('setPaymentType should call adapter', () => {
    service
      .setPaymentType('userId', 'cartId', 'typeCode', 'poNumber')
      .subscribe();
    expect(adapter.setPaymentType).toHaveBeenCalledWith(
      'userId',
      'cartId',
      'typeCode',
      'poNumber'
    );
  });
});
