import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { CheckoutStepType } from '@spartacus/checkout/root';
import { RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { defaultCheckoutRoutingConfig } from '../../root/config/default-checkout-routing-config';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { CheckoutGuard } from './checkout.guard';

const isExpressCheckoutSet = new BehaviorSubject(false);
const setDefaultCheckoutDetailsSuccess = new BehaviorSubject(false);
const MockRoutesConfig: RoutesConfig =
  defaultCheckoutRoutingConfig.routing?.routes;

class MockCheckoutConfigService {
  isExpressCheckout() {
    return isExpressCheckoutSet;
  }
}

class MockCheckoutStepService {
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
    return of(false);
  }
}

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutStepService: CheckoutStepService;
  let cartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutGuard,
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: ActiveCartFacade, useClass: MockCartService },
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
    cartFacade = TestBed.inject(ActiveCartFacade);
  });

  it(`should redirect to first checkout step if express checkout is turned off`, (done) => {
    isExpressCheckoutSet.next(false);
    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getFirstCheckoutStepRoute()
            ).paths[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to first checkout step if is guest checkout`, (done) => {
    isExpressCheckoutSet.next(true);
    spyOn(cartFacade, 'isGuestCart').and.returnValue(of(true));

    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getFirstCheckoutStepRoute()
            ).paths[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to first checkout step if express checkout is not possible`, (done) => {
    isExpressCheckoutSet.next(true);
    setDefaultCheckoutDetailsSuccess.next(false);
    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getFirstCheckoutStepRoute()
            ).paths[0]
          }`
        );
        done();
      })
      .unsubscribe();
  });

  it(`should redirect to review order`, (done) => {
    isExpressCheckoutSet.next(true);
    setDefaultCheckoutDetailsSuccess.next(true);
    guard
      .canActivate()
      .subscribe((result) => {
        expect(result.toString()).toEqual(
          `/${
            mockRoutingConfigService.getRouteConfig(
              mockCheckoutStepService.getCheckoutStepRoute(
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
