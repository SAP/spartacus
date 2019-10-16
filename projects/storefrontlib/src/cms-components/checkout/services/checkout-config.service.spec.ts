import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RoutingConfigService } from '@spartacus/core';
import {
  CheckoutConfig,
  DeliveryModePreferences,
} from '../config/checkout-config';
import { CheckoutStep, CheckoutStepType } from '../model';
import { CheckoutConfigService } from './checkout-config.service';

const mockCheckoutSteps: Array<CheckoutStep> = [
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

const mockCheckoutConfig: CheckoutConfig = {
  checkout: { steps: mockCheckoutSteps },
};

class MockRoutingConfigService {
  getRouteConfig(stepRoute) {
    if (stepRoute === 'route0') {
      return { paths: ['checkout/route0'] };
    } else if (stepRoute === 'route1') {
      return { paths: ['checkout/route1'] };
    } else if (stepRoute === 'route2') {
      return { paths: ['checkout/route2'] };
    } else if (stepRoute === 'route3') {
      return { paths: ['checkout/route3'] };
    }
    return null;
  }
}

const [FREE_CODE, STANDARD_CODE, PREMIUM_CODE] = [
  'free-gross',
  'standard-gross',
  'premium-gross',
];
const [freeMode, standardMode, premiumMode] = [
  { deliveryCost: { value: 0 }, code: FREE_CODE },
  { deliveryCost: { value: 2 }, code: STANDARD_CODE },
  { deliveryCost: { value: 3 }, code: PREMIUM_CODE },
];

const activatedRoute = new ActivatedRoute();
activatedRoute.snapshot = new ActivatedRouteSnapshot();
activatedRoute.snapshot.url = [
  {
    path: 'checkout',
    parameterMap: null,
    parameters: {},
    toString: function() {
      return this.path;
    },
  },
  {
    path: 'route1',
    parameterMap: null,
    parameters: {},
    toString: function() {
      return this.path;
    },
  },
];

describe('CheckoutConfigService', () => {
  let service: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutConfigService,
        { provide: CheckoutConfig, useValue: mockCheckoutConfig },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    });

    service = TestBed.get(CheckoutConfigService as Type<CheckoutConfigService>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to reset the steps', () => {
    // enable the first step
    service.enableStep(CheckoutStepType.PAYMENT_TYPES);
    expect(service.getFirstCheckoutStepRoute()).toEqual(
      mockCheckoutSteps[0].routeName
    );
    // reset
    service.resetSteps();
    expect(service.getFirstCheckoutStepRoute()).toEqual(
      mockCheckoutSteps[1].routeName
    );
  });

  it('should be able to disable one step', () => {
    service.disableStep(CheckoutStepType.SHIPPING_ADDRESS);
    expect(service.steps[0]).not.toEqual(mockCheckoutSteps[1]);
  });

  it('should be able to enable one step', () => {
    service.enableStep(CheckoutStepType.PAYMENT_TYPES);
    expect(service.steps[0].id).toEqual(mockCheckoutSteps[0].id);
  });

  it('should get checkout step by type', () => {
    const type = CheckoutStepType.SHIPPING_ADDRESS;
    expect(service.getCheckoutStep(type)).toEqual(mockCheckoutSteps[1]);
  });

  it('should get checkout step route by type', () => {
    const type = CheckoutStepType.SHIPPING_ADDRESS;
    expect(service.getCheckoutStepRoute(type)).toEqual(
      mockCheckoutSteps[1].routeName
    );
  });

  it('should get the first enabled checkout step route', () => {
    expect(service.getFirstCheckoutStepRoute()).toEqual(
      mockCheckoutSteps[1].routeName
    );
  });

  it('should get the next enabled checkout step url', () => {
    expect(service.getNextCheckoutStepUrl(activatedRoute)).toBe(
      'checkout/route2'
    );
  });

  it('should get the eanbled prev checkout step url', () => {
    // since step0 is disabled, so it go back to cart
    expect(service.getPreviousCheckoutStepUrl(activatedRoute)).toBe('cart');

    // enable first step, then it goes to the first step
    service.enableStep(CheckoutStepType.PAYMENT_TYPES);
    expect(service.getPreviousCheckoutStepUrl(activatedRoute)).toBe(
      'checkout/route0'
    );
  });

  it('should return current step index', () => {
    expect(service.getCurrentStepIndex(activatedRoute)).toBe(0);
  });

  describe('compareDeliveryCost', () => {
    it('should return 1 for higher price', () => {
      expect(
        service['compareDeliveryCost'](
          { deliveryCost: { value: 4 } },
          { deliveryCost: { value: 2 } }
        )
      ).toBe(1);
    });

    it('should return -1 for lower price', () => {
      expect(
        service['compareDeliveryCost'](
          { deliveryCost: { value: 5 } },
          { deliveryCost: { value: 7 } }
        )
      ).toBe(-1);
    });

    it('should return 0 for same price', () => {
      expect(
        service['compareDeliveryCost'](
          { deliveryCost: { value: 1 } },
          { deliveryCost: { value: 1 } }
        )
      ).toBe(0);
    });
  });

  describe('getPreferredDeliveryMode', () => {
    it('should call findMatchingDeliveryMode with ordered modes by price', () => {
      const findMatchingDeliveryMode = spyOn(
        service,
        'findMatchingDeliveryMode' as any
      );

      service.getPreferredDeliveryMode([standardMode, freeMode, premiumMode]);
      expect(findMatchingDeliveryMode).toHaveBeenCalledWith([
        freeMode,
        standardMode,
        premiumMode,
      ]);

      service.getPreferredDeliveryMode([premiumMode, standardMode]);
      expect(findMatchingDeliveryMode).toHaveBeenCalledWith([
        standardMode,
        premiumMode,
      ]);
    });
  });

  describe('findMatchingDeliveryMode', () => {
    it('should return free or lower possible price code', () => {
      service['defaultDeliveryMode'] = [DeliveryModePreferences.FREE];

      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(FREE_CODE);

      expect(
        service['findMatchingDeliveryMode']([standardMode, premiumMode])
      ).toBe(STANDARD_CODE);

      expect(service['findMatchingDeliveryMode']([premiumMode])).toBe(
        PREMIUM_CODE
      );
    });

    it('should return least expensive (but not free, if available) price code', () => {
      service['defaultDeliveryMode'] = [
        DeliveryModePreferences.LEAST_EXPENSIVE,
      ];

      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(STANDARD_CODE);

      expect(
        service['findMatchingDeliveryMode']([standardMode, premiumMode])
      ).toBe(STANDARD_CODE);

      expect(service['findMatchingDeliveryMode']([freeMode, premiumMode])).toBe(
        PREMIUM_CODE
      );

      service['defaultDeliveryMode'] = [
        DeliveryModePreferences.LEAST_EXPENSIVE,
        DeliveryModePreferences.FREE,
      ];
      expect(service['findMatchingDeliveryMode']([freeMode])).toBe(FREE_CODE);
    });

    it('should return free, or most expensive price code if free is not available', () => {
      service['defaultDeliveryMode'] = [
        DeliveryModePreferences.FREE,
        DeliveryModePreferences.MOST_EXPENSIVE,
      ];

      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(FREE_CODE);

      expect(
        service['findMatchingDeliveryMode']([standardMode, premiumMode])
      ).toBe(PREMIUM_CODE);

      expect(service['findMatchingDeliveryMode']([standardMode])).toBe(
        STANDARD_CODE
      );
    });

    it('should return matching code', () => {
      service['defaultDeliveryMode'] = [FREE_CODE];

      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(FREE_CODE);

      service['defaultDeliveryMode'] = [STANDARD_CODE];
      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(STANDARD_CODE);

      service['defaultDeliveryMode'] = [PREMIUM_CODE];
      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(PREMIUM_CODE);

      service['defaultDeliveryMode'] = [
        'not_existing_code1',
        'not_existing_code2',
      ];
      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(FREE_CODE);

      service['defaultDeliveryMode'] = [
        'not_existing_code1',
        'not_existing_code2',
        'existing_code',
        STANDARD_CODE,
      ];
      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(STANDARD_CODE);
      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          { deliveryCost: { value: 1 }, code: 'existing_code' },
          standardMode,
          premiumMode,
        ])
      ).toBe('existing_code');
    });

    it('should return first option if defaultDeliveryMode is empty', () => {
      service['defaultDeliveryMode'] = [];
      expect(
        service['findMatchingDeliveryMode']([
          freeMode,
          standardMode,
          premiumMode,
        ])
      ).toBe(FREE_CODE);
    });
  });

  describe('isExpressCheckout', () => {
    it('return default config value', () => {
      expect(service.isExpressCheckout()).toBeFalsy();
    });

    it('return true for express turned on', () => {
      service['express'] = true;
      expect(service.isExpressCheckout()).toBeTruthy();
    });
  });
});
