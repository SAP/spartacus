import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CheckoutConfig,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  RouteConfig,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutFlowOrchestratorService } from './checkout-flow-orchestrator.service';
import { CheckoutStepService } from './checkout-step.service';
import createSpy = jasmine.createSpy;

const checkoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'step0',
        name: 'step 0',
        routeName: 'route0',
        type: [CheckoutStepType.DELIVERY_ADDRESS],
      },
      {
        id: 'step1',
        name: 'step 1',
        routeName: 'route1',
        type: [CheckoutStepType.DELIVERY_MODE],
      },
      {
        id: 'step2',
        name: 'step 2',
        routeName: 'route2',
        type: [CheckoutStepType.PAYMENT_DETAILS],
      },
    ],
  },
};

class MockRoutingConfigService implements Partial<RoutingConfigService> {
  getRouteConfig(stepRoute: string): RouteConfig | undefined {
    if (stepRoute === 'route0') {
      return { paths: ['checkout/route0'] };
    } else if (stepRoute === 'route1') {
      return { paths: ['checkout/route1'] };
    } else if (stepRoute === 'route2') {
      return { paths: ['checkout/route2'] };
    }
    return undefined;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy();
  getRouterState = createSpy().and.returnValue(
    of({
      state: {
        context: {
          id: '/checkout/route0',
        },
      },
    })
  );
}

class MockCheckoutFlowOrchestratorService
  implements Partial<CheckoutFlowOrchestratorService>
{
  getCheckoutFlow() {
    return checkoutConfig.checkout;
  }
}

describe('CheckoutStepService', () => {
  let service: CheckoutStepService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutStepService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfig, useValue: checkoutConfig },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        {
          provide: CheckoutFlowOrchestratorService,
          useClass: MockCheckoutFlowOrchestratorService,
        },
      ],
    });
    TestBed.inject(CheckoutConfig);

    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    service = TestBed.inject(CheckoutStepService as Type<CheckoutStepService>);
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
    let steps: CheckoutStep[] = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.DELIVERY_ADDRESS, true);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(2);
    // reset
    service.resetSteps();
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    expect(steps[0].id).toEqual('step0');
  });

  it('should be able to disable/enable step', () => {
    let steps: CheckoutStep[] = [];
    // disable the first step
    service.disableEnableStep(CheckoutStepType.DELIVERY_ADDRESS, true);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(2);
    expect(steps[0].id).toEqual('step1');

    // enable the first setp
    service.disableEnableStep(CheckoutStepType.DELIVERY_ADDRESS, false);
    service.steps$.subscribe((value) => (steps = value)).unsubscribe();
    expect(steps.length).toEqual(3);
    expect(steps[0].id).toEqual('step0');
  });

  it('should get checkout step by type', () => {
    expect(service.getCheckoutStep(CheckoutStepType.DELIVERY_MODE)).toEqual(
      checkoutConfig.checkout?.steps?.[1]
    );
  });

  it('should get checkout step route by type', () => {
    expect(
      service.getCheckoutStepRoute(CheckoutStepType.DELIVERY_MODE)
    ).toEqual(checkoutConfig.checkout?.steps?.[1].routeName);
  });

  it('should get first checkout step route', () => {
    expect(service.getFirstCheckoutStepRoute()).toEqual(
      checkoutConfig.checkout?.steps?.[0].routeName
    );
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
    service.disableEnableStep(CheckoutStepType.DELIVERY_MODE, true);
    expect(service.getNextCheckoutStepUrl(<any>mockActivatedRoute)).toBe(
      'checkout/route2'
    );
  });

  it('should be able to get previous enabled checkout step url', () => {
    const mockActivatedRoute = {
      snapshot: {
        url: ['checkout', 'route2'],
      },
    };

    expect(service.getPreviousCheckoutStepUrl(<any>mockActivatedRoute)).toBe(
      'checkout/route1'
    );
    //disable step 1, then previous step should be step 0
    service.disableEnableStep(CheckoutStepType.DELIVERY_MODE, true);
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

  it('should return null when step is not found', () => {
    const mockActivatedRoute = {
      snapshot: {
        url: ['null', 'null'],
      },
    };
    expect(service.getCurrentStepIndex(<any>mockActivatedRoute)).toBe(null);
  });

  it('should go to the requested step', () => {
    service.goToStepWithIndex(0);
    expect(routingService.go).toHaveBeenCalledWith('checkout/route0');
    service.goToStepWithIndex(2);
    expect(routingService.go).toHaveBeenCalledWith('checkout/route2');
  });
});
