import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckoutDeliveryModesAdapter } from './checkout-delivery-modes.adapter';
import { CheckoutDeliveryModesConnector } from './checkout-delivery-modes.connector';
import createSpy = jasmine.createSpy;

describe('CheckoutDeliveryModesConnector', () => {
  class MockCheckoutDeliveryModesAdapter
    implements CheckoutDeliveryModesAdapter
  {
    setMode = createSpy().and.returnValue(of({}));
    getMode = createSpy().and.returnValue(of({}));
    getSupportedModes = createSpy().and.returnValue(of({}));
    clearCheckoutDeliveryMode = createSpy().and.returnValue(of({}));
  }

  describe('CheckoutDeliveryModesConnector', () => {
    let service: CheckoutDeliveryModesConnector;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CheckoutDeliveryModesConnector,
          {
            provide: CheckoutDeliveryModesAdapter,
            useClass: MockCheckoutDeliveryModesAdapter,
          },
        ],
      });

      service = TestBed.inject(CheckoutDeliveryModesConnector);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('setMode should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryModesAdapter);
      service.setMode('1', '2', '3').subscribe();
      expect(adapter.setMode).toHaveBeenCalledWith('1', '2', '3');
    });

    it('getMode should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryModesAdapter);
      service.getMode('1', '2').subscribe();
      expect(adapter.getMode).toHaveBeenCalledWith('1', '2');
    });

    it('getSupportedModes should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryModesAdapter);
      service.getSupportedModes('1', '2').subscribe();
      expect(adapter.getSupportedModes).toHaveBeenCalledWith('1', '2');
    });

    it('clearCheckoutDeliveryMode should call adapter', () => {
      const adapter = TestBed.inject(CheckoutDeliveryModesAdapter);
      service.clearCheckoutDeliveryMode('1', '2').subscribe();
      expect(adapter.clearCheckoutDeliveryMode).toHaveBeenCalledWith('1', '2');
    });
  });
});
