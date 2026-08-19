import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';
import { CheckoutPaymentConnector } from './checkout-payment.connector';

class MockCheckoutPaymentAdapter implements CheckoutPaymentAdapter {
  createPaymentDetails = vi.fn().mockReturnValue(of({}));
  setPaymentDetails = vi.fn().mockReturnValue(of({}));
  getPaymentCardTypes = vi.fn().mockReturnValue(of([]));
  deletePaymentDetails = vi.fn().mockReturnValue(of([]));
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

  it('delete should call adapter', () => {
    service.deletePaymentDetails('1', '2').pipe(take(1)).subscribe();
    expect(adapter.deletePaymentDetails).toHaveBeenCalledWith('1', '2');
  });
});
