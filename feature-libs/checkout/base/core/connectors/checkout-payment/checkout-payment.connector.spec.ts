import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';
import { CheckoutPaymentConnector } from './checkout-payment.connector';
import createSpy = jasmine.createSpy;

class MockCheckoutPaymentAdapter implements CheckoutPaymentAdapter {
  createPaymentDetails = createSpy().and.returnValue(of({}));
  setPaymentDetails = createSpy().and.returnValue(of({}));
  getPaymentCardTypes = createSpy().and.returnValue(of([]));
}

describe('CheckoutPaymentConnector', () => {
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
    service.createPaymentDetails('1', '2', {}).pipe(take(1)).subscribe();
    expect(adapter.createPaymentDetails).toHaveBeenCalledWith('1', '2', {});
  });

  it('set should call adapter', () => {
    service.setPaymentDetails('1', '2', '3').pipe(take(1)).subscribe();
    expect(adapter.setPaymentDetails).toHaveBeenCalledWith('1', '2', '3');
  });

  it('getCardTypes should call adapter', () => {
    let result;
    service
      .getPaymentCardTypes()
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.getPaymentCardTypes).toHaveBeenCalledWith();
  });
});
