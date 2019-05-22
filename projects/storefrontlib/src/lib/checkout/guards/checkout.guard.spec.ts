import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutGuard } from './checkout.guard';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { RoutingConfigService, RoutesConfig } from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from '../../ui/pages/default-routing-config';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  let mockRoutingConfigService: RoutingConfigService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(CheckoutGuard);
    mockRoutingConfigService = TestBed.get(RoutingConfigService);
  });

  it(`should redirect to first checkout step`, done => {
    guard.canActivate().subscribe(result => {
      expect(result.toString()).toEqual(
        `/${
          mockRoutingConfigService.getRouteConfig(
            MockCheckoutConfig.checkout.steps[0].route
          ).paths[0]
        }`
      );
      done();
    });
  });
});
