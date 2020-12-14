import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Order, RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ShippingAddressSetGuard } from './shipping-address-set.guard';

const MockRoutesConfig: RoutesConfig = JSON.parse(
  JSON.stringify(defaultStorefrontRoutesConfig)
);

class MockCheckoutDetailsService {
  getDeliveryAddress(): Observable<Order> {
    return of(null);
  }
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}
class MockCheckoutStepService {
  getCheckoutStep() {}
}

const MockCheckoutConfig: CheckoutConfig = JSON.parse(
  JSON.stringify(defaultCheckoutConfig)
);

describe(`ShippingAddressSetGuard`, () => {
  let guard: ShippingAddressSetGuard;
  let mockCheckoutDetailsService: CheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutStepService: CheckoutStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ShippingAddressSetGuard);
    mockCheckoutDetailsService = TestBed.inject(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.inject(CheckoutConfig);
    mockRoutingConfigService = TestBed.inject(RoutingConfigService);
    mockCheckoutStepService = TestBed.inject(CheckoutStepService);

    spyOn(console, 'warn');
  });

  describe(`shipping address step is disabled`, () => {
    it(`should return true`, (done) => {
      const step = MockCheckoutConfig.checkout.steps[0];
      step.disabled = true;
      spyOn(mockCheckoutStepService, 'getCheckoutStep').and.returnValue(step);
      guard.canActivate().subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });

  describe(`when there is NO shipping address present`, () => {
    it(`should navigate to shipping address step if this step is enabled`, (done) => {
      MockCheckoutConfig.checkout.steps[0].disabled = undefined;
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );

      spyOn(mockCheckoutStepService, 'getCheckoutStep').and.returnValue(
        MockCheckoutConfig.checkout.steps[0]
      );

      guard.canActivate().subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              MockCheckoutConfig.checkout.steps[0].routeName
            ).paths[0]
          }`
        );
        done();
      });
    });

    it(`should navigate to default if not configured`, (done) => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );
      mockCheckoutConfig.checkout.steps = [];

      guard.canActivate().subscribe((result) => {
        expect(console.warn).toHaveBeenCalledWith(
          'Missing step with type shippingAddress in checkout configuration.'
        );
        expect(result.toString()).toEqual('/');
        done();
      });
    });
  });

  describe(`when there is shipping address present`, () => {
    it(`should return true`, (done) => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({ id: 'testAddress' } as any)
      );

      guard.canActivate().subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
