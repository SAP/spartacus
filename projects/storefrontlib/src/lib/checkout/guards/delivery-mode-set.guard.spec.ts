import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DeliveryModeSetGuard } from './delivery-mode-set.guard';
import { CheckoutConfig } from '../config/checkout-config';
import { DeliveryMode, CheckoutService } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

const mockCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.label.deliveryMode',
        url: '/checkout/delivery-mode',
        type: ['deliveryMode'],
      },
    ],
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

describe(`DeliveryModeSetGuard`, () => {
  let guard: DeliveryModeSetGuard;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryModeSetGuard,
        { provide: CheckoutConfig, useValue: mockCheckoutConfig },
        { provide: CheckoutService, useClass: MockCheckoutService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(DeliveryModeSetGuard);
    mockCheckoutService = TestBed.get(CheckoutService);
  });

  it('should redirect to deliveryMode page when no modes selected', done => {
    spyOn(mockCheckoutService, 'getSelectedDeliveryMode').and.returnValue(
      of(null)
    );

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result.toString()).toEqual(
        mockCheckoutConfig.checkout.steps[0].url
      );
      done();
    });
  });

  it('should not redirect to deliveryMode page when mode is selected', done => {
    spyOn(mockCheckoutService, 'getSelectedDeliveryMode').and.returnValue(
      of(mockDeliveryMode)
    );

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result).toEqual(true);

      done();
    });
  });
});
