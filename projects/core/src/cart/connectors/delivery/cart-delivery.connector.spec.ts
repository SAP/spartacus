import { TestBed } from '@angular/core/testing';
import { CartDeliveryConnector } from './cart-delivery.connector';
import { of } from 'rxjs';
import { CartDeliveryAdapter } from './cart-delivery.adapter';
import createSpy = jasmine.createSpy;

describe('CartDeliveryDeliveryConnector', () => {
  class MockCartDeliveryAdapter implements CartDeliveryAdapter {
    createAddress = createSpy().and.returnValue(of({}));
    setAddress = createSpy().and.returnValue(of({}));
    setMode = createSpy().and.returnValue(of({}));
    getMode = createSpy().and.returnValue(of({}));
    getSupportedModes = createSpy().and.returnValue(of({}));
  }

  describe('CartDeliveryConnector', () => {
    let service: CartDeliveryConnector;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: CartDeliveryAdapter, useClass: MockCartDeliveryAdapter },
        ],
      });

      service = TestBed.get(CartDeliveryConnector);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('createAddress should call adapter', () => {
      const adapter = TestBed.get(CartDeliveryAdapter);
      service.createAddress('1', '2', {}).subscribe();
      expect(adapter.createAddress).toHaveBeenCalledWith('1', '2', {});
    });

    it('setAddress should call adapter', () => {
      const adapter = TestBed.get(CartDeliveryAdapter);
      service.setAddress('1', '2', '3').subscribe();
      expect(adapter.setAddress).toHaveBeenCalledWith('1', '2', '3');
    });

    it('setMode should call adapter', () => {
      const adapter = TestBed.get(CartDeliveryAdapter);
      service.setMode('1', '2', '3').subscribe();
      expect(adapter.setMode).toHaveBeenCalledWith('1', '2', '3');
    });

    it('getMode should call adapter', () => {
      const adapter = TestBed.get(CartDeliveryAdapter);
      service.getMode('1', '2').subscribe();
      expect(adapter.getMode).toHaveBeenCalledWith('1', '2');
    });

    it('getSupportedModes should call adapter', () => {
      const adapter = TestBed.get(CartDeliveryAdapter);
      service.getSupportedModes('1', '2').subscribe();
      expect(adapter.getSupportedModes).toHaveBeenCalledWith('1', '2');
    });
  });
});
