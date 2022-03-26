/// <reference types="jest" />

import {
  ASM_MODULE,
  ASM_ROOT_MODULE,
  ASM_SCHEMATICS_CONFIG,
  CART_BASE_ROOT_MODULE,
  CDC_MODULE,
  CDC_ROOT_MODULE,
  CHECKOUT_B2B_MODULE,
  CHECKOUT_B2B_ROOT_MODULE,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
  MINI_CART_MODULE,
  ORDER_MODULE,
  ORDER_ROOT_MODULE,
} from './lib-configs';
import {
  CLI_ASM_FEATURE,
  CLI_CART_BASE_FEATURE,
  CLI_CDC_FEATURE,
  CLI_CDS_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  CLI_ORDER_FEATURE,
  SPARTACUS_ASM,
  SPARTACUS_CDC,
  SPARTACUS_CHECKOUT,
  SPARTACUS_ORDER,
} from './libs-constants';
import {
  generateMappings,
  getKeyByMappingValueOrThrow,
} from './updateable-constants';

describe('generateMappings', () => {
  describe('libraryFeatureMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().libraryFeatureMapping;

      expect(result.get(SPARTACUS_ASM)).toEqual([CLI_ASM_FEATURE]);
      expect(result.get(SPARTACUS_CHECKOUT)).toEqual([
        CLI_CHECKOUT_BASE_FEATURE,
        CLI_CHECKOUT_B2B_FEATURE,
        CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      ]);
      expect(result.get(SPARTACUS_ORDER)).toEqual([CLI_ORDER_FEATURE]);
      expect(result.get(SPARTACUS_CDC)).toEqual([CLI_CDC_FEATURE]);
    });
  });
  describe('featureFeatureModuleMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().featureFeatureModuleMapping;

      expect(result.get(CLI_ASM_FEATURE)).toEqual([ASM_MODULE]);
      expect(result.get(CLI_CART_BASE_FEATURE)).toContain(MINI_CART_MODULE);
      expect(result.get(CLI_CHECKOUT_BASE_FEATURE)).toEqual([
        CHECKOUT_BASE_MODULE,
      ]);
      expect(result.get(CLI_CHECKOUT_B2B_FEATURE)).toEqual([
        CHECKOUT_B2B_MODULE,
      ]);
      expect(result.get(CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE)).toEqual([
        CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
      ]);
      expect(result.get(CLI_ORDER_FEATURE)).toEqual([ORDER_MODULE]);
      expect(result.get(CLI_CDC_FEATURE)).toEqual([CDC_MODULE]);
    });
  });
  describe('featureRootModuleMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().featureRootModuleMapping;

      expect(result.get(CLI_ASM_FEATURE)).toEqual([ASM_ROOT_MODULE]);
      expect(result.get(CLI_CART_BASE_FEATURE)).toContain(
        CART_BASE_ROOT_MODULE
      );
      expect(result.get(CLI_CHECKOUT_BASE_FEATURE)).toEqual([
        CHECKOUT_BASE_ROOT_MODULE,
      ]);
      expect(result.get(CLI_CHECKOUT_B2B_FEATURE)).toEqual([
        CHECKOUT_B2B_ROOT_MODULE,
      ]);
      expect(result.get(CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE)).toEqual([
        CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
      ]);
      expect(result.get(CLI_ORDER_FEATURE)).toEqual([ORDER_ROOT_MODULE]);
      expect(result.get(CLI_CDC_FEATURE)).toEqual([CDC_ROOT_MODULE]);
      expect(result.get(CLI_CDS_FEATURE)).toEqual([]);
      expect(result.get(CLI_DIGITAL_PAYMENTS_FEATURE)).toEqual([]);
    });
  });
  describe('featureSchematicConfigMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().featureSchematicConfigMapping;

      expect(result.get(CLI_ASM_FEATURE)).toEqual(ASM_SCHEMATICS_CONFIG);
      expect(result.get(CLI_CHECKOUT_BASE_FEATURE)).toEqual(
        CHECKOUT_BASE_SCHEMATICS_CONFIG
      );
      expect(result.get(CLI_CHECKOUT_B2B_FEATURE)).toEqual(
        CHECKOUT_B2B_SCHEMATICS_CONFIG
      );
      expect(result.get(CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE)).toEqual(
        CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG
      );
    });
  });
  describe('getKeyByMappingValueOrThrow', () => {
    it('should return the key', () => {
      const mapping: Map<string, string[]> = new Map();
      mapping.set('x', ['1', '2']);
      const result = getKeyByMappingValueOrThrow(mapping, '1');
      expect(result).toEqual('x');
    });
    it('should throw if not found', () => {
      const mapping: Map<string, string[]> = new Map();
      mapping.set('x', ['1', '2']);
      try {
        getKeyByMappingValueOrThrow(mapping, '3');
      } catch (e) {
        expect((e as any).message).toEqual(
          `Value 3 not found in the given map.`
        );
      }
    });
  });
});
