import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RoutingService, RoutingConfigService } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { CheckoutStepType } from '../model';
import { CheckoutConfigService } from './checkout-config.service';
import { CheckoutStepService } from './checkout-step.service';

import createSpy = jasmine.createSpy;

class MockCheckoutConfigService {
  steps = [
    {
      id: 'step0',
      name: 'step 0',
      routeName: 'route0',
      type: [CheckoutStepType.PAYMENT_TYPES],
      enabled: false,
    },
    {
      id: 'step1',
      name: 'step 1',
      routeName: 'route1',
      type: [CheckoutStepType.SHIPPING_ADDRESS],
      enabled: true,
    },
    {
      id: 'step2',
      name: 'step 2',
      routeName: 'route2',
      type: [CheckoutStepType.DELIVERY_MODE],
      enabled: true,
    },
  ];

  getNextCheckoutStepUrl(): string {
    return '';
  }
  getPreviousCheckoutStepUrl(): string {
    return '';
  }
}

class MockRoutingConfigService {
  getRouteConfig(stepRoute) {
    if (stepRoute === 'route0') {
      return { paths: ['checkout/route0'] };
    } else if (stepRoute === 'route1') {
      return { paths: ['checkout/route1'] };
    } else if (stepRoute === 'route2') {
      return { paths: ['checkout/route2'] };
    }
    return null;
  }
}

class MockActivatedRoute {
  snapshot = of();
}

class MockRoutingService {
  go = createSpy();
  getRouterState(): Observable<any> {
    return of({
      state: {
        context: {
          id: '/checkout/route0',
        },
      },
    });
  }
}

describe('CheckoutStpService', () => {
  let service: CheckoutStepService;
  let activatedRoute: ActivatedRoute;
  let routingService: RoutingService;
  let routingConfigService: RoutingConfigService;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutStepService,
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    });

    activatedRoute = TestBed.inject(ActivatedRoute as Type<ActivatedRoute>);
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    checkoutConfigService = TestBed.inject(
      CheckoutConfigService as Type<CheckoutConfigService>
    );
    routingConfigService = TestBed.inject(
      RoutingConfigService as Type<RoutingConfigService>
    );

    service = new CheckoutStepService(
      routingService,
      checkoutConfigService,
      routingConfigService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get active step index', () => {
    let index;
    service.activeStepIndex$.subscribe((value) => (index = value));
    expect(index).toEqual(0);
  });

  it('should be able to go back', () => {
    service.back(activatedRoute);
    expect(routingService.go).toHaveBeenCalledWith('');

    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.returnValue(
      null
    );
    service.back(activatedRoute);
    expect(routingService.go).toHaveBeenCalledWith('cart');
  });

  it('should be able to go next', () => {
    service.next(activatedRoute);
    expect(routingService.go).toHaveBeenCalledWith('');
  });

  it('should be able to get back button text', () => {
    expect(service.getBackBntText(activatedRoute)).toEqual('common.back');

    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.returnValue(
      null
    );
    expect(service.getBackBntText(activatedRoute)).toEqual(
      'checkout.backToCart'
    );
  });

  it('should be able to reset the steps', () => {
    let steps = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.PAYMENT_TYPES, true);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(2);
    // reset
    service.resetSteps();
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    expect(steps[0].id).toEqual('step0');
  });

  it('should be able to disable/enable step', () => {
    let steps = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.PAYMENT_TYPES, true);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(2);
    expect(steps[0].id).toEqual('step1');

    // enable the first setp
    service.disableEnableStep(CheckoutStepType.PAYMENT_TYPES, false);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    expect(steps[0].id).toEqual('step0');
  });
});
