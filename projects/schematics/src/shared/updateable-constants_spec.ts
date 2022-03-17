/// <reference types="jest" />

import {
  ASM_MODULE,
  ASM_ROOT_MODULE,
  CART_BASE_ROOT_MODULE,
  CDC_MODULE,
  CDC_ROOT_MODULE,
  CHECKOUT_B2B_MODULE,
  CHECKOUT_B2B_ROOT_MODULE,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  MINI_CART_MODULE,
  ORDER_MODULE,
  ORDER_ROOT_MODULE,
} from './lib-configs';
import {
  CLI_ASM_FEATURE,
  CLI_CDC_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_ORDER_FEATURE,
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_ORDER,
} from './libs-constants';
import { generateMappings } from './updateable-constants';

describe('generateMappings', () => {
  describe('cliFeatureMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().packageCliMapping;

      expect(result[SPARTACUS_ASM]).toEqual([CLI_ASM_FEATURE]);
      expect(result[SPARTACUS_CHECKOUT]).toEqual([
        CLI_CHECKOUT_BASE_FEATURE,
        CLI_CHECKOUT_B2B_FEATURE,
        CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      ]);
      expect(result[SPARTACUS_ORDER]).toEqual([CLI_ORDER_FEATURE]);
      expect(result[SPARTACUS_CDC]).toEqual([CLI_CDC_FEATURE]);
    });
  });
  describe('packageFeatureMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().packageFeatureMapping;

      expect(result[SPARTACUS_ASM]).toEqual([ASM_MODULE]);
      expect(result[SPARTACUS_CART]).toContain(MINI_CART_MODULE);
      expect(result[SPARTACUS_CHECKOUT]).toEqual([
        CHECKOUT_BASE_MODULE,
        CHECKOUT_B2B_MODULE,
        CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
      ]);
      expect(result[SPARTACUS_ORDER]).toEqual([ORDER_MODULE]);
      expect(result[SPARTACUS_CDC]).toEqual([CDC_MODULE]);
    });
  });
  describe('packageRootMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().packageRootMapping;

      expect(result[SPARTACUS_ASM]).toEqual([ASM_ROOT_MODULE]);
      expect(result[SPARTACUS_CART]).toContain(CART_BASE_ROOT_MODULE);
      expect(result[SPARTACUS_CHECKOUT]).toEqual([
        CHECKOUT_BASE_ROOT_MODULE,
        CHECKOUT_B2B_ROOT_MODULE,
        CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
      ]);
      expect(result[SPARTACUS_ORDER]).toEqual([ORDER_ROOT_MODULE]);
      expect(result[SPARTACUS_CDC]).toEqual([CDC_ROOT_MODULE]);
      expect(result[SPARTACUS_CDS]).toEqual([]);
      expect(result[SPARTACUS_DIGITAL_PAYMENTS]).toEqual([]);
    });
  });
});
