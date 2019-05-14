import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

import {
  ServerConfig,
  RoutingConfigService,
  RoutesConfig,
} from '@spartacus/core';
import { DeliveryModeSetGuard } from './delivery-mode-set.guard';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { defaultStorefrontRoutesConfig } from '../../ui/pages/default-routing-config';

const MockCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        route: 'deliveryMode',
        type: [CheckoutStepType.deliveryMode],
      },
    ],
  },
};
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

const mockDeliveryModeCode = 'test mode code';

class MockCheckoutDetailsService {
  getSelectedDeliveryModeCode(): Observable<string> {
    return of();
  }
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}

const MockServerConfig: ServerConfig = { production: false };

describe(`DeliveryModeSetGuard`, () => {
  let guard: DeliveryModeSetGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;
  let mockRoutingConfigService: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: ServerConfig, useValue: MockServerConfig },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(DeliveryModeSetGuard);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.get(CheckoutConfig);
    mockRoutingConfigService = TestBed.get(RoutingConfigService);
  });

  it('should redirect to deliveryMode page when no modes selected', done => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(null));

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result.toString()).toEqual(
        '/' +
          mockRoutingConfigService.getRouteConfig(
            MockCheckoutConfig.checkout.steps[0].route
          ).paths[0]
      );
      done();
    });
  });

  it('should redirect to default page if there is no deliveryMode step', done => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(''));
    spyOn(console, 'warn');
    mockCheckoutConfig.checkout.steps = [];

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(console.warn).toHaveBeenCalledWith(
        'Missing step with type deliveryMode in checkout configuration.'
      );
      expect(result.toString()).toEqual('/');
      done();
    });
  });

  it('should not redirect to deliveryMode page when mode is selected', done => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(mockDeliveryModeCode));

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result).toEqual(true);

      done();
    });
  });
});
