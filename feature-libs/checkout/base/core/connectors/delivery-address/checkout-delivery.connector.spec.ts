import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckoutDeliveryAddressAdapter } from './checkout-delivery-address.adapter';
import { CheckoutDeliveryConnector } from './checkout-delivery.connector';
import createSpy = jasmine.createSpy;

describe('CheckoutDeliveryDeliveryConnector', () => {
  class MockCheckoutDeliveryAdapter implements CheckoutDeliveryAddressAdapter {
    createAddress = createSpy().and.returnValue(of({}));
    setAddress = createSpy().and.returnValue(of({}));
    clearCheckoutDeliveryAddress = createSpy().and.returnValue(of({}));
  }

  describe('CheckoutDeliveryConnector', () => {
    let service: CheckoutDeliveryConnector;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CheckoutDeliveryConnector,
          {
            provide: CheckoutDeliveryAddressAdapter,
            useClass: MockCheckoutDeliveryAdapter,
          },
        ],
      });

      service = TestBed.inject(CheckoutDeliveryConnector);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('createAddress should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryAddressAdapter);
      service.createAddress('1', '2', {}).subscribe();
      expect(adapter.createAddress).toHaveBeenCalledWith('1', '2', {});
    });

    it('setAddress should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryAddressAdapter);
      service.setAddress('1', '2', '3').subscribe();
      expect(adapter.setAddress).toHaveBeenCalledWith('1', '2', '3');
    });

    it('clearCheckoutDeliveryAddress should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryAddressAdapter);
      service.clearCheckoutDeliveryAddress('1', '2').subscribe();
      expect(adapter.clearCheckoutDeliveryAddress).toHaveBeenCalledWith(
        '1',
        '2'
      );
    });
  });
});
