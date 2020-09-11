import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { DeliveryModeSetGuard } from './delivery-mode-set.guard';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

const mockDeliveryModeCode = 'test mode code';

class MockCheckoutDetailsService {
  getSelectedDeliveryModeCode(): Observable<string> {
    return of();
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

describe(`DeliveryModeSetGuard`, () => {
  let guard: DeliveryModeSetGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutStepService: CheckoutStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(DeliveryModeSetGuard);
    mockCheckoutDetailsService = TestBed.inject(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.inject(CheckoutConfig);
    mockRoutingConfigService = TestBed.inject(RoutingConfigService);
    mockCheckoutStepService = TestBed.inject(CheckoutStepService);
  });

  describe(`delivery mode step is disabled`, () => {
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

  it('should redirect to deliveryMode page when no modes selected', (done) => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(null));

    spyOn(mockCheckoutStepService, 'getCheckoutStep').and.returnValue(
      MockCheckoutConfig.checkout.steps[1]
    );

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result.toString()).toEqual(
        `/${
          mockRoutingConfigService.getRouteConfig(
            MockCheckoutConfig.checkout.steps[1].routeName
          ).paths[0]
        }`
      );
      done();
    });
  });

  it('should redirect to default page if there is no deliveryMode step', (done) => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(''));
    spyOn(console, 'warn');
    mockCheckoutConfig.checkout.steps = [];

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(console.warn).toHaveBeenCalledWith(
        'Missing step with type deliveryMode in checkout configuration.'
      );
      expect(result.toString()).toEqual('/');
      done();
    });
  });

  it('should not redirect to deliveryMode page when mode is selected', (done) => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(mockDeliveryModeCode));

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result).toEqual(true);

      done();
    });
  });
});
