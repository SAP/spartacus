import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

import { ServerConfig } from '@spartacus/core';
import { DeliveryModeSetGuard } from './delivery-mode-set.guard';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutConfigService } from '../checkout-config.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutStepType, CheckoutStep } from '../model/checkout-step.model';

const MockCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        url: '/checkout/delivery-mode',
        type: [CheckoutStepType.deliveryMode],
      },
    ],
  },
};

const mockDeliveryModeCode = 'test mode code';

class MockCheckoutDetailsService {
  getSelectedDeliveryModeCode(): Observable<string> {
    return of();
  }
}

class MockCheckoutConfigService {
  getCheckoutStep(): CheckoutStep {
    return {
      id: 'deliveryMode',
      name: 'checkoutProgress.label.deliveryMode',
      url: '/checkout/delivery-mode',
      type: [CheckoutStepType.deliveryMode],
    };
  }
}

const MockServerConfig: ServerConfig = { production: false };

describe(`DeliveryModeSetGuard`, () => {
  let guard: DeliveryModeSetGuard;
  let mockCheckoutConfigService: CheckoutConfigService;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeliveryModeSetGuard,
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: ServerConfig, useValue: MockServerConfig },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(DeliveryModeSetGuard);
    mockCheckoutConfigService = TestBed.get(CheckoutConfigService);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.get(CheckoutConfig);
  });

  it('should redirect to deliveryMode page when no modes selected', done => {
    spyOn(
      mockCheckoutDetailsService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(null));

    guard.canActivate().subscribe((result: boolean | UrlTree) => {
      expect(result.toString()).toEqual(
        mockCheckoutConfig.checkout.steps[0].url
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
    spyOn(mockCheckoutConfigService, 'getCheckoutStep').and.returnValue(null);
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
