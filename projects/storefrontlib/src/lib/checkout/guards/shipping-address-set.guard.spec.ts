import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { Order, ServerConfig } from '@spartacus/core';
import { ShippingAddressSetGuard } from './shipping-address-set.guard';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutConfigService } from '../checkout-config.service';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';

class MockCheckoutDetailsService {
  getDeliveryAddress(): Observable<Order> {
    return of(null);
  }
}

class MockCheckoutConfigService {
  getCheckoutStep(): CheckoutStep {
    return {
      id: 'shippingAddress',
      name: 'checkoutProgress.label.shippingAddress',
      url: '/checkout/shipping-address',
      type: [CheckoutStepType.shippingAddress],
    };
  }
}

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockServerConfig: ServerConfig = { production: false };

describe(`ShippingAddressSetGuard`, () => {
  let guard: ShippingAddressSetGuard;
  let mockCheckoutConfigService: MockCheckoutConfigService;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShippingAddressSetGuard,
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: ServerConfig, useValue: MockServerConfig },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(ShippingAddressSetGuard);
    mockCheckoutConfigService = TestBed.get(CheckoutConfigService);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.get(CheckoutConfig);
  });

  describe(`when there is NO shipping address present`, () => {
    it(`should navigate to shipping address step`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );

      guard.canActivate().subscribe(result => {
        expect(result.toString()).toEqual(
          mockCheckoutConfig.checkout.steps[0].url
        );
        done();
      });
    });

    it(`should navigate to default if not configured`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );
      spyOn(console, 'warn');
      spyOn(mockCheckoutConfigService, 'getCheckoutStep').and.returnValue(null);
      mockCheckoutConfig.checkout.steps = [];

      guard.canActivate().subscribe(result => {
        expect(console.warn).toHaveBeenCalledWith(
          'Missing step with type shippingAddress in checkout configuration.'
        );
        expect(result.toString()).toEqual('/');
        done();
      });
    });
  });

  describe(`when there is shipping address present`, () => {
    it(`should return true`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({ id: 'testAddress' })
      );

      guard.canActivate().subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
