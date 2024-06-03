import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutDeliveryAddressAdapter } from './checkout-delivery-address.adapter';
import { CheckoutDeliveryAddressConnector } from './checkout-delivery-address.connector';
import createSpy = jasmine.createSpy;

class MockCheckoutDeliveryAdapter implements CheckoutDeliveryAddressAdapter {
  createAddress = createSpy().and.returnValue(of({}));
  setAddress = createSpy().and.returnValue(of({}));
  clearCheckoutDeliveryAddress = createSpy().and.returnValue(of({}));
}

describe('CheckoutDeliveryAddressConnector', () => {
  let service: CheckoutDeliveryAddressConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryAddressConnector,
        {
          provide: CheckoutDeliveryAddressAdapter,
          useClass: MockCheckoutDeliveryAdapter,
        },
      ],
    });

    service = TestBed.inject(CheckoutDeliveryAddressConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createAddress should call adapter', () => {
    const adapter = TestBed.inject(CheckoutDeliveryAddressAdapter);
    service.createAddress('1', '2', {}).pipe(take(1)).subscribe();
    expect(adapter.createAddress).toHaveBeenCalledWith('1', '2', {});
  });

  it('setAddress should call adapter', () => {
    const adapter = TestBed.inject(CheckoutDeliveryAddressAdapter);
    service.setAddress('1', '2', '3').pipe(take(1)).subscribe();
    expect(adapter.setAddress).toHaveBeenCalledWith('1', '2', '3');
  });

  it('clearCheckoutDeliveryAddress should call adapter', () => {
    const adapter = TestBed.inject(CheckoutDeliveryAddressAdapter);
    service.clearCheckoutDeliveryAddress('1', '2').pipe(take(1)).subscribe();
    expect(adapter.clearCheckoutDeliveryAddress).toHaveBeenCalledWith('1', '2');
  });
});
