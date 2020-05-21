import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
      type: [CheckoutStepType.PO_NUMBER],
    },
    {
      id: 'step1',
      name: 'step 1',
      routeName: 'route1',
      type: [CheckoutStepType.SHIPPING_ADDRESS],
    },
    {
      id: 'step2',
      name: 'step 2',
      routeName: 'route2',
      type: [CheckoutStepType.DELIVERY_MODE],
    },
  ];
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
  let routingService: RoutingService;
  let routingConfigService: RoutingConfigService;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutStepService,
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    });

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

  it('should be able to go back to cart', () => {
    spyOn(service, 'getPreviousCheckoutStepUrl').and.returnValue(null);
    service.back(<any>{});
    expect(routingService.go).toHaveBeenCalledWith('cart');
  });

  it('should be able to go back to next step', () => {
    spyOn(service, 'getPreviousCheckoutStepUrl').and.returnValue('back');
    service.back(<any>{});
    expect(routingService.go).toHaveBeenCalledWith('back');
  });

  it('should be able to go next', () => {
    spyOn(service, 'getNextCheckoutStepUrl').and.returnValue('next');
    service.next(<any>{});
    expect(routingService.go).toHaveBeenCalledWith('next');
  });

  it('should be able to get back button text: backToCart', () => {
    spyOn(service, 'getPreviousCheckoutStepUrl').and.returnValue(null);
    expect(service.getBackBntText(<any>{})).toEqual('checkout.backToCart');
  });
  it('should be able to get back button text: backToCart', () => {
    spyOn(service, 'getPreviousCheckoutStepUrl').and.returnValue('back');
    expect(service.getBackBntText(<any>{})).toEqual('common.back');
  });

  it('should be able to reset the steps', () => {
    let steps = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.PO_NUMBER, true);
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
    service.disableEnableStep(CheckoutStepType.PO_NUMBER, true);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(2);
    expect(steps[0].id).toEqual('step1');

    // enable the first setp
    service.disableEnableStep(CheckoutStepType.PO_NUMBER, false);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    expect(steps[0].id).toEqual('step0');
  });

  it('should get checkout step by type', () => {
    expect(service.getCheckoutStep(CheckoutStepType.SHIPPING_ADDRESS)).toEqual(
      checkoutConfigService.steps[1]
    );
  });

  it('should get checkout step route by type', () => {
    expect(
      service.getCheckoutStepRoute(CheckoutStepType.SHIPPING_ADDRESS)
    ).toEqual('route1');
  });

  it('should get first checkout step route', () => {
    expect(service.getFirstCheckoutStepRoute()).toEqual('route0');
  });

  it('should be able to get next enabled checkout step url', () => {
    const mockActivatedRoute = {
      snapshot: {
        url: ['checkout', 'route0'],
      },
    };

    expect(service.getNextCheckoutStepUrl(<any>mockActivatedRoute)).toBe(
      'checkout/route1'
    );
    //disable step 1, then next step should be step 2
    service.disableEnableStep(CheckoutStepType.SHIPPING_ADDRESS, true);
    expect(service.getNextCheckoutStepUrl(<any>mockActivatedRoute)).toBe(
      'checkout/route2'
    );
  });

  it('should be able to get prevous enabled checkout step url', () => {
    const mockActivatedRoute = {
      snapshot: {
        url: ['checkout', 'route2'],
      },
    };

    expect(service.getPreviousCheckoutStepUrl(<any>mockActivatedRoute)).toBe(
      'checkout/route1'
    );
    //disable step 1, then previous step should be step 0
    service.disableEnableStep(CheckoutStepType.SHIPPING_ADDRESS, true);
    expect(service.getPreviousCheckoutStepUrl(<any>mockActivatedRoute)).toBe(
      'checkout/route0'
    );
  });

  it('should return current step index', () => {
    const mockActivatedRoute = {
      snapshot: {
        url: ['checkout', 'route2'],
      },
    };
    expect(service.getCurrentStepIndex(<any>mockActivatedRoute)).toBe(2);
  });
});
