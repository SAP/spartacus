import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Order, RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { PaymentDetailsSetGuard } from './payment-details-set.guard';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

class MockCheckoutDetailsService {
  getPaymentDetails(): Observable<Order> {
    return of(null);
  }
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}

class MockCheckoutConfigService {
  getCheckoutStep() {}
}

describe(`PaymentDetailsSetGuard`, () => {
  let guard: PaymentDetailsSetGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(PaymentDetailsSetGuard as Type<PaymentDetailsSetGuard>);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService as Type<
      CheckoutDetailsService
    >);
    mockCheckoutConfig = TestBed.get(CheckoutConfig as Type<CheckoutConfig>);
    mockRoutingConfigService = TestBed.get(RoutingConfigService as Type<
      RoutingConfigService
    >);
    mockCheckoutConfigService = TestBed.get(CheckoutConfigService as Type<
      CheckoutConfigService
    >);
  });

  describe(`when there is NO payment details present`, () => {
    it(`should navigate to payment details step`, done => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({})
      );

      spyOn(mockCheckoutConfigService, 'getCheckoutStep').and.returnValue(
        MockCheckoutConfig.checkout.steps[2]
      );

      guard.canActivate().subscribe(result => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              MockCheckoutConfig.checkout.steps[2].routeName
            ).paths[0]
          }`
        );
        done();
      });
    });

    it(`should navigate to default if not configured`, done => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({})
      );
      spyOn(console, 'warn');
      mockCheckoutConfig.checkout.steps = [];

      guard.canActivate().subscribe(result => {
        expect(console.warn).toHaveBeenCalledWith(
          'Missing step with type paymentDetails in checkout configuration.'
        );
        expect(result.toString()).toEqual('/');
        done();
      });
    });
  });

  describe(`when there is payment details present`, () => {
    it(`should return true`, done => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({ id: 'testDetails' } as any)
      );

      guard.canActivate().subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
