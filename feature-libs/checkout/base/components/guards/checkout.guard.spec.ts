import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  RouteConfig,
  RoutesConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { defaultCheckoutRoutingConfig } from '../../root/config/default-checkout-routing-config';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { CheckoutGuard } from './checkout.guard';
import createSpy = jasmine.createSpy;

const MockRoutesConfig: RoutesConfig =
  defaultCheckoutRoutingConfig.routing?.routes ?? {};

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  isExpressCheckout = createSpy().and.returnValue(true);
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  getFirstCheckoutStepRoute = createSpy().and.returnValue(
    'checkoutDeliveryAddress'
  );
  getCheckoutStepRoute = createSpy().and.returnValue('checkoutReviewOrder');
}

class MockExpressCheckoutService implements Partial<ExpressCheckoutService> {
  trySetDefaultCheckoutDetails = createSpy().and.returnValue(of(false));
}

class MockRoutingConfigService implements Partial<RoutingConfigService> {
  getRouteConfig(routeName: string): RouteConfig | undefined {
    return MockRoutesConfig[routeName];
  }
}

class MockCartService implements Partial<ActiveCartFacade> {
  isGuestCart = createSpy().and.returnValue(of(false));
}

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  let mockRoutingConfigService: RoutingConfigService;
  let mockCheckoutStepService: CheckoutStepService;
  let cartService: ActiveCartFacade;
  let checkoutConfigService: CheckoutConfigService;
  let expressCheckoutService: ExpressCheckoutService;

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
    cartService = TestBed.inject(ActiveCartFacade);
    checkoutConfigService = TestBed.inject(CheckoutConfigService);
    expressCheckoutService = TestBed.inject(ExpressCheckoutService);
  });

  it(`should redirect to first checkout step if express checkout is turned off`, (done) => {
    checkoutConfigService.isExpressCheckout =
      createSpy().and.returnValue(false);

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
    cartService.isGuestCart = createSpy().and.returnValue(of(true));

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
    expressCheckoutService.trySetDefaultCheckoutDetails =
      createSpy().and.returnValue(of(true));

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
