import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DeliveryModePageGuard } from './delivery-mode.guard';
import { CheckoutConfig } from '../config/checkout-config';
import { DeliveryMode, CheckoutService, RoutingService } from '@spartacus/core';
import { of, Observable } from 'rxjs';

const mockCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [],
    deliveryMode: '/checkout/delivery-mode',
  },
};

const mockDeliveryMode: DeliveryMode = {
  name: 'test mode name',
};

class MockCheckoutService {
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return of();
  }
}

class MockRoutingService {
  go = jasmine.createSpy();
}

describe(`DeliveryModePageGuard`, () => {
  let guard: DeliveryModePageGuard;
  let mockRoutingService: MockRoutingService;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryModePageGuard,
        { provide: CheckoutConfig, useValue: mockCheckoutConfig },
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(DeliveryModePageGuard);
    mockRoutingService = TestBed.get(RoutingService);
    mockCheckoutService = TestBed.get(CheckoutService);
  });

  it('should redirect to deliveryMode page when no modes selected', done => {
    spyOn(mockCheckoutService, 'getSelectedDeliveryMode').and.returnValue(
      of(null)
    );

    guard.canActivate().subscribe((result: boolean) => {
      expect(result).toEqual(false);
      expect(mockRoutingService.go).toHaveBeenCalledWith({
        route: [mockCheckoutConfig.checkout.deliveryMode],
      });

      done();
    });
  });

  it('should not redirect to deliveryMode page when mode is selected', done => {
    spyOn(mockCheckoutService, 'getSelectedDeliveryMode').and.returnValue(
      of(mockDeliveryMode)
    );

    guard.canActivate().subscribe((result: boolean) => {
      expect(result).toEqual(true);
      expect(mockRoutingService.go).not.toHaveBeenCalled();

      done();
    });
  });
});
