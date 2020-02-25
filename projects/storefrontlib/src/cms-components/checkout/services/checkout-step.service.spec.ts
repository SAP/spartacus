import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
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
    {
      id: 'step3',
      name: 'step 3',
      routeName: 'route3',
      type: [CheckoutStepType.PAYMENT_DETAILS],
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

class MockActivatedRoute {
  snapshot = of();
}

class MockRoutingService {
  go = createSpy();
}

describe('CheckoutStpService', () => {
  let service: CheckoutStepService;
  let activatedRoute: ActivatedRoute;
  let routingService: RoutingService;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutStepService,
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    activatedRoute = TestBed.inject(ActivatedRoute as Type<ActivatedRoute>);
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    checkoutConfigService = TestBed.inject(CheckoutConfigService as Type<
      CheckoutConfigService
    >);

    service = new CheckoutStepService(
      routingService,
      checkoutConfigService,
      activatedRoute
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to go back', () => {
    service.back();
    expect(routingService.go).toHaveBeenCalledWith('');

    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.returnValue(
      null
    );
    service.back();
    expect(routingService.go).toHaveBeenCalledWith('cart');
  });

  it('should be able to go next', () => {
    service.next();
    expect(routingService.go).toHaveBeenCalledWith('');
  });

  it('should be able to get back button text', () => {
    expect(service.getBackBntText()).toEqual('common.back');

    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.returnValue(
      null
    );
    expect(service.getBackBntText()).toEqual('checkout.backToCart');
  });

  it('should be able to reset the steps', () => {
    let steps = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.PAYMENT_TYPES, true);
    service.steps$.subscribe(value => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    // reset
    service.resetSteps();
    service.steps$.subscribe(value => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(4);
    expect(steps[0].id).toEqual('step0');
  });

  it('should be able to disable/enable step', () => {
    let steps = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.PAYMENT_TYPES, true);
    service.steps$.subscribe(value => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    expect(steps[0].id).toEqual('step1');

    // enable the first setp
    service.disableEnableStep(CheckoutStepType.PAYMENT_TYPES, false);
    service.steps$.subscribe(value => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(4);
    expect(steps[0].id).toEqual('step0');
  });
});
