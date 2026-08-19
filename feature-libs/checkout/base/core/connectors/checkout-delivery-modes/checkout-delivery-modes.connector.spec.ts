import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutDeliveryModesAdapter } from './checkout-delivery-modes.adapter';
import { CheckoutDeliveryModesConnector } from './checkout-delivery-modes.connector';

class MockCheckoutDeliveryModesAdapter implements CheckoutDeliveryModesAdapter {
  setMode = vi.fn().mockReturnValue(of({}));
  getSupportedModes = vi.fn().mockReturnValue(of({}));
  clearCheckoutDeliveryMode = vi.fn().mockReturnValue(of({}));
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
    service.setMode('1', '2', '3').pipe(take(1)).subscribe();
    expect(adapter.setMode).toHaveBeenCalledWith('1', '2', '3');
  });

  it('getSupportedModes should call adapter', () => {
    const adapter = TestBed.inject(CheckoutDeliveryModesAdapter);
    service.getSupportedModes('1', '2').pipe(take(1)).subscribe();
    expect(adapter.getSupportedModes).toHaveBeenCalledWith('1', '2');
  });

  it('clearCheckoutDeliveryMode should call adapter', () => {
    const adapter = TestBed.inject(CheckoutDeliveryModesAdapter);
    service.clearCheckoutDeliveryMode('1', '2').pipe(take(1)).subscribe();
    expect(adapter.clearCheckoutDeliveryMode).toHaveBeenCalledWith('1', '2');
  });
});
