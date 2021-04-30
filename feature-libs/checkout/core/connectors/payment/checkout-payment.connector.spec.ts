import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';
import { CheckoutPaymentConnector } from './checkout-payment.connector';
import createSpy = jasmine.createSpy;

describe('CheckoutPaymentConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  class MockCheckoutPaymentAdapter implements CheckoutPaymentAdapter {
    create = createSpy().and.returnValue(of({}));
    set = createSpy().and.returnValue(of({}));
    loadCardTypes = createSpy().and.returnValue(of([]));
  }

  let service: CheckoutPaymentConnector;
  let adapter: CheckoutPaymentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentConnector,
        {
          provide: CheckoutPaymentAdapter,
          useClass: MockCheckoutPaymentAdapter,
        },
      ],
    });

    service = TestBed.inject(CheckoutPaymentConnector);
    adapter = TestBed.inject(CheckoutPaymentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should call adapter', () => {
    service.create('1', '2', {}).subscribe();
    expect(adapter.create).toHaveBeenCalledWith('1', '2', {});
  });

  it('set should call adapter', () => {
    service.set('1', '2', '3').subscribe();
    expect(adapter.set).toHaveBeenCalledWith('1', '2', '3');
  });

  it('getCardTypes should call adapter', () => {
    let result;
    service.getCardTypes().subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadCardTypes).toHaveBeenCalledWith();
  });
});
