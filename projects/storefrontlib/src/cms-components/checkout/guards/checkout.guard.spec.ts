import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartService,
  RoutesConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { CheckoutConfigService, CheckoutStepType } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { CheckoutGuard } from './checkout.guard';

const isExpressCheckoutSet = new BehaviorSubject(false);
const setDefaultCheckoutDetailsSuccess = new BehaviorSubject(false);
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;

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

class MockCartService {
  isGuestCart() {
    return false;
  }
}

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutConfigService: CheckoutConfigService;
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: CartService, useClass: MockCartService },
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
    mockCheckoutConfigService = TestBed.get(CheckoutConfigService as Type<
      CheckoutConfigService
    >);
    cartService = TestBed.get(CartService as Type<CartService>);
  });

  it(`should redirect to first checkout step if express checkout is turned off`, done => {
    isExpressCheckoutSet.next(false);
    guard
      .canActivate()
      .subscribe(result => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutConfigService.getFirstCheckoutStepRoute()
            ).paths[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to first checkout step if is guest checkout`, done => {
    isExpressCheckoutSet.next(true);
    spyOn(cartService, 'isGuestCart').and.returnValue(true);

    guard
      .canActivate()
      .subscribe(result => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutConfigService.getFirstCheckoutStepRoute()
            ).paths[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to first checkout step if express checkout is not possible`, done => {
    isExpressCheckoutSet.next(true);
    setDefaultCheckoutDetailsSuccess.next(false);
    guard
      .canActivate()
      .subscribe(result => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutConfigService.getFirstCheckoutStepRoute()
            ).paths[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to review order`, done => {
    isExpressCheckoutSet.next(true);
    setDefaultCheckoutDetailsSuccess.next(true);
    guard
      .canActivate()
      .subscribe(result => {
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
      })
      .unsubscribe();
  });
});
