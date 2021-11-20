import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  RouteConfig,
  RoutesConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultCheckoutRoutingConfig } from '../../root/config/default-checkout-routing-config';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { CheckoutGuard } from './checkout.guard';

const setDefaultCheckoutDetailsSuccess = new BehaviorSubject(false);
const MockRoutesConfig: RoutesConfig =
  defaultCheckoutRoutingConfig.routing?.routes ?? {};

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  isExpressCheckout(): boolean {
    return true;
  }
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  getFirstCheckoutStepRoute(): string {
    return 'checkoutShippingAddress';
  }
  getCheckoutStepRoute(): string {
    return 'checkoutReviewOrder';
  }
}

class MockExpressCheckoutService implements Partial<ExpressCheckoutService> {
  trySetDefaultCheckoutDetails(): Observable<boolean> {
    return setDefaultCheckoutDetailsSuccess;
  }
}

class MockRoutingConfigService implements Partial<RoutingConfigService> {
  getRouteConfig(routeName: string): RouteConfig | undefined {
    return MockRoutesConfig[routeName];
  }
}

class MockCartService implements Partial<ActiveCartService> {
  isGuestCart(): boolean {
    return false;
  }
}

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutStepService: CheckoutStepService;
  let cartService: ActiveCartService;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutGuard,
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: ActiveCartService, useClass: MockCartService },
        {
          provide: ExpressCheckoutService,
          useClass: MockExpressCheckoutService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CheckoutGuard);
    mockRoutingConfigService = TestBed.inject(RoutingConfigService);
    mockCheckoutStepService = TestBed.inject(CheckoutStepService);
    cartService = TestBed.inject(ActiveCartService);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);
  });

  it(`should redirect to first checkout step if express checkout is turned off`, (done) => {
    spyOn(checkoutConfigService, 'isExpressCheckout').and.returnValue(false);
    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getFirstCheckoutStepRoute()
            )?.paths?.[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to first checkout step if is guest checkout`, (done) => {
    spyOn(cartService, 'isGuestCart').and.returnValue(true);

    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getFirstCheckoutStepRoute()
            )?.paths?.[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to first checkout step if express checkout is not possible`, (done) => {
    setDefaultCheckoutDetailsSuccess.next(false);
    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getFirstCheckoutStepRoute()
            )?.paths?.[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to review order`, (done) => {
    setDefaultCheckoutDetailsSuccess.next(true);
    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getCheckoutStepRoute(
                CheckoutStepType.REVIEW_ORDER
              ) as string
            )?.paths?.[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });
});
