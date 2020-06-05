import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Order,
  RoutesConfig,
  RoutingConfigService,
  PaymentTypeService,
} from '@spartacus/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { PaymentDetailsSetGuard } from './payment-details-set.guard';
import { CheckoutStepType } from '../model/checkout-step.model';
import createSpy = jasmine.createSpy;

// deep copy to avoid issues with mutating imported symbols
const MockCheckoutConfig: CheckoutConfig = JSON.parse(
  JSON.stringify(defaultCheckoutConfig)
);
const MockRoutesConfig: RoutesConfig = JSON.parse(
  JSON.stringify(defaultStorefrontRoutesConfig)
);

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

class MockCheckoutStepService {
  disableEnableStep = createSpy();
  getCheckoutStep() {}
}

const selectedPaymentType$ = new BehaviorSubject<string>('ACCOUNT');
class MockPaymentTypeService {
  readonly ACCOUNT_PAYMENT = 'ACCOUNT';
  getSelectedPaymentType(): Observable<string> {
    return selectedPaymentType$.asObservable();
  }
}

describe(`PaymentDetailsSetGuard`, () => {
  let guard: PaymentDetailsSetGuard;
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
        { provide: PaymentTypeService, useClass: MockPaymentTypeService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(PaymentDetailsSetGuard);
    mockCheckoutDetailsService = TestBed.inject(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.inject(CheckoutConfig);
    mockRoutingConfigService = TestBed.inject(RoutingConfigService);
    mockCheckoutStepService = TestBed.inject(CheckoutStepService);
  });

  describe(`payment details step is disabled if payment type is ACCOUNT`, () => {
    it(`should return true`, (done) => {
      const step = MockCheckoutConfig.checkout.steps[0];
      spyOn(mockCheckoutStepService, 'getCheckoutStep').and.returnValue(step);
      guard.canActivate().subscribe((result) => {
        expect(mockCheckoutStepService.disableEnableStep).toHaveBeenCalledWith(
          CheckoutStepType.PAYMENT_DETAILS,
          true
        );
        expect(result).toBeTruthy();
        done();
      });
    });
  });

  describe(`when there is NO payment details present`, () => {
    it(`should navigate to payment details step`, (done) => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({})
      );

      spyOn(mockCheckoutStepService, 'getCheckoutStep').and.returnValue(
        MockCheckoutConfig.checkout.steps[2]
      );

      guard.canActivate().subscribe((result) => {
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

    it(`should navigate to default if not configured`, (done) => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({})
      );
      spyOn(console, 'warn');
      mockCheckoutConfig.checkout.steps = [];

      guard.canActivate().subscribe((result) => {
        expect(console.warn).toHaveBeenCalledWith(
          'Missing step with type paymentDetails in checkout configuration.'
        );
        expect(result.toString()).toEqual('/');
        done();
      });
    });
  });

  describe(`when there is payment details present`, () => {
    it(`should return true`, (done) => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({ id: 'testDetails' } as any)
      );

      guard.canActivate().subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
