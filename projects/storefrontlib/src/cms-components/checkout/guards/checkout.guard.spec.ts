import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { CheckoutGuard } from './checkout.guard';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { BehaviorSubject } from 'rxjs';
import { CheckoutConfigService, CheckoutStepType } from '@spartacus/storefront';

const isExpressCheckoutSet = new BehaviorSubject(false);
const setDefaultCheckoutDetailsSuccess = new BehaviorSubject(false);
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

class MockCheckoutConfigService {
  isExpressCheckout() {
    return isExpressCheckoutSet;
  }
  getFirstCheckoutStepRoute() {
    return 'checkoutShippingAddress';
  }
  getCheckoutStepRoute() {
    return 'checkoutReviewOrder';
  }
}

class MockExpressCheckoutService {
  trySetDefaultCheckoutDetails() {
    return setDefaultCheckoutDetailsSuccess;
  }
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutConfigService: CheckoutConfigService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        {
          provide: ExpressCheckoutService,
          useClass: MockExpressCheckoutService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(CheckoutGuard as Type<CheckoutGuard>);
    mockRoutingConfigService = TestBed.get(RoutingConfigService as Type<
      RoutingConfigService
    >);
    mockCheckoutConfigService = TestBed.get(CheckoutConfigService);
  });

  it(`should redirect to first checkout step if express checkout is turned off`, done => {
    guard.canActivate().subscribe(result => {
      expect(result.toString()).toEqual(
        `/${
          mockRoutingConfigService.getRouteConfig(
            mockCheckoutConfigService.getFirstCheckoutStepRoute()
          ).paths[0]
        }`
      );
      done();
    });
  });

  it(`should redirect to first checkout step if express checkout is not available`, done => {
    isExpressCheckoutSet.next(true);
    guard.canActivate().subscribe(result => {
      expect(result.toString()).toEqual(
        `/${
          mockRoutingConfigService.getRouteConfig(
            mockCheckoutConfigService.getFirstCheckoutStepRoute()
          ).paths[0]
        }`
      );
      done();
    });
  });

  it(`should redirect to last checkout step`, done => {
    isExpressCheckoutSet.next(true);
    setDefaultCheckoutDetailsSuccess.next(true);
    guard.canActivate().subscribe(result => {
      expect(result.toString()).toEqual(
        `/${
          mockRoutingConfigService.getRouteConfig(
            mockCheckoutConfigService.getCheckoutStepRoute(
              CheckoutStepType.REVIEW_ORDER
            )
          ).paths[0]
        }`
      );
      done();
    });
  });
});
