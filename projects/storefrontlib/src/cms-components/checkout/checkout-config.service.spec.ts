import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../cms-structure/routing/default-routing-config';
import { CheckoutConfigService } from './checkout-config.service';
import { CheckoutConfig } from './config/checkout-config';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { CheckoutStep } from './model';

const mockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;

const mockCheckoutSteps: Array<CheckoutStep> =
  defaultCheckoutConfig.checkout.steps;

const mockRoutingConfig: RoutesConfig = defaultStorefrontRoutesConfig;

class MockActivatedRoute {
  snapshot = of();
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return mockCheckoutConfig[routeName].paths[0];
  }
}

describe('CheckoutConfigService', () => {
  let service: CheckoutConfigService;
  let activatedRoute: ActivatedRoute;
  let routingConfigService: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    });

    activatedRoute = TestBed.get(ActivatedRoute);
    routingConfigService = TestBed.get(RoutingConfigService);

    service = new CheckoutConfigService(
      mockCheckoutConfig,
      routingConfigService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get checkout step by type', () => {
    const type = mockCheckoutSteps[0].type[0];

    expect(service.getCheckoutStep(type)).toEqual(mockCheckoutSteps[0]);
  });

  it('should get next checkout step url', () => {
    const activeStepIndex = 1;

    spyOn<any>(service, 'getStepUrlFromActivatedRoute').and.returnValue(
      '/' +
        mockRoutingConfig[mockCheckoutSteps[activeStepIndex].routeName].paths[0]
    );

    spyOn<any>(service, 'getStepUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });

    expect(service.getNextCheckoutStepUrl(activatedRoute)).toBe(
      mockRoutingConfig[mockCheckoutSteps[activeStepIndex + 1].routeName]
        .paths[0]
    );
  });

  it('should get prev checkout step url', () => {
    const activeStepIndex = 1;

    spyOn<any>(service, 'getStepUrlFromActivatedRoute').and.returnValue(
      '/' +
        mockRoutingConfig[mockCheckoutSteps[activeStepIndex].routeName].paths[0]
    );

    spyOn<any>(service, 'getStepUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });

    expect(service.getPreviousCheckoutStepUrl(activatedRoute)).toBe(
      mockRoutingConfig[mockCheckoutSteps[activeStepIndex - 1].routeName]
        .paths[0]
    );
  });

  it('should return current step index', () => {
    const activeStepIndex = 1;

    spyOn<any>(service, 'getStepUrlFromActivatedRoute').and.returnValue(
      '/' +
        mockRoutingConfig[mockCheckoutSteps[activeStepIndex].routeName].paths[0]
    );

    spyOn<any>(service, 'getStepUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });

    expect(service.getCurrentStepIndex(activatedRoute)).toBe(1);
  });
});
