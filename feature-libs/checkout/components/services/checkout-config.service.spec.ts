import { TestBed } from '@angular/core/testing';
import {
  CheckoutConfig,
  DeliveryModePreferences,
} from '@spartacus/checkout/root';
import { defaultCheckoutConfig } from '../../root/config/default-checkout-config';
import { CheckoutConfigService } from './checkout-config.service';

const mockCheckoutConfig: CheckoutConfig = JSON.parse(
  JSON.stringify(defaultCheckoutConfig)
);

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

describe('CheckoutConfigService', () => {
  let service: CheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutConfigService,
        { provide: mockCheckoutConfig, useClass: CheckoutConfig },
      ],
    });

    service = new CheckoutConfigService(mockCheckoutConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
        standardMode,
        freeMode,
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
