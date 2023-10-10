/// <reference types="jest" />

import {
  ASM_MODULE,
  ASM_ROOT_MODULE,
  ASM_SCHEMATICS_CONFIG,
  CART_BASE_ROOT_MODULE,
  CDC_MODULE,
  CDC_ROOT_MODULE,
  CDC_USER_ACCOUNT_MODULE,
  CDC_USER_PROFILE_MODULE,
  CHECKOUT_B2B_MODULE,
  CHECKOUT_B2B_ROOT_MODULE,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
  CDC_ADMINISTRATION_MODULE,
  CDC_B2B_REGISTER_MODULE,
  MINI_CART_MODULE,
  ORDER_MODULE,
  ORDER_ROOT_MODULE,
  S4OM_ROOT_MODULE,
} from './lib-configs';
import {
  ASM_FEATURE_NAME,
  CART_BASE_FEATURE_NAME,
  CDC_B2B_FEATURE_NAME,
  CDC_FEATURE_NAME,
  CDS_FEATURE_NAME,
  CHECKOUT_B2B_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  S4OM_FEATURE_NAME,
  SPARTACUS_ASM,
  SPARTACUS_CDC,
  SPARTACUS_CHECKOUT,
  SPARTACUS_ORDER,
  SPARTACUS_S4OM,
} from './libs-constants';
import {
  generateMappings,
  getKeyByMappingValue,
  getKeyByMappingValueOrThrow,
  getSchematicsConfigByFeatureOrThrow,
} from './schematics-config-mappings';

describe('schematics-config-mappings', () => {
  describe('libraryFeatureMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().libraryFeatureMapping;

      expect(result.get(SPARTACUS_ASM)).toEqual([ASM_FEATURE_NAME]);
      expect(result.get(SPARTACUS_CHECKOUT)).toEqual([
        CHECKOUT_BASE_FEATURE_NAME,
        CHECKOUT_B2B_FEATURE_NAME,
        CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
      ]);
      expect(result.get(SPARTACUS_ORDER)).toEqual([ORDER_FEATURE_NAME]);
      expect(result.get(SPARTACUS_CDC)).toEqual([
        CDC_FEATURE_NAME,
        CDC_B2B_FEATURE_NAME,
      ]);
      expect(result.get(SPARTACUS_S4OM)).toEqual([S4OM_FEATURE_NAME]);
    });
  });

  describe('featureFeatureModuleMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().featureFeatureModuleMapping;

      expect(result.get(ASM_FEATURE_NAME)).toEqual([ASM_MODULE]);
      expect(result.get(CART_BASE_FEATURE_NAME)).toContain(MINI_CART_MODULE);
      expect(result.get(CHECKOUT_BASE_FEATURE_NAME)).toEqual([
        CHECKOUT_BASE_MODULE,
      ]);
      expect(result.get(CHECKOUT_B2B_FEATURE_NAME)).toEqual([
        CHECKOUT_B2B_MODULE,
      ]);
      expect(result.get(CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME)).toEqual(
        [CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE]
      );
      expect(result.get(ORDER_FEATURE_NAME)).toEqual([ORDER_MODULE]);
      expect(result.get(CDC_FEATURE_NAME)).toEqual([
        CDC_MODULE,
        CDC_USER_ACCOUNT_MODULE,
        CDC_USER_PROFILE_MODULE,
      ]);
      expect(result.get(CDC_B2B_FEATURE_NAME)).toEqual([
        CDC_MODULE,
        CDC_USER_ACCOUNT_MODULE,
        CDC_USER_PROFILE_MODULE,
        CDC_ADMINISTRATION_MODULE,
        CDC_B2B_REGISTER_MODULE,
      ]);
    });
  });

  describe('featureRootModuleMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().featureRootModuleMapping;

      expect(result.get(ASM_FEATURE_NAME)).toEqual([ASM_ROOT_MODULE]);
      expect(result.get(CART_BASE_FEATURE_NAME)).toContain(
        CART_BASE_ROOT_MODULE
      );
      expect(result.get(CHECKOUT_BASE_FEATURE_NAME)).toEqual([
        CHECKOUT_BASE_ROOT_MODULE,
      ]);
      expect(result.get(CHECKOUT_B2B_FEATURE_NAME)).toEqual([
        CHECKOUT_B2B_ROOT_MODULE,
      ]);
      expect(result.get(CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME)).toEqual(
        [CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE]
      );
      expect(result.get(ORDER_FEATURE_NAME)).toEqual([ORDER_ROOT_MODULE]);
      expect(result.get(CDC_FEATURE_NAME)).toEqual([CDC_ROOT_MODULE]);
      expect(result.get(CDC_B2B_FEATURE_NAME)).toEqual([CDC_ROOT_MODULE]);
      expect(result.get(CDS_FEATURE_NAME)).toEqual([]);
      expect(result.get(DIGITAL_PAYMENTS_FEATURE_NAME)).toEqual([]);
      expect(result.get(S4OM_FEATURE_NAME)).toEqual([S4OM_ROOT_MODULE]);
    });
  });

  describe('featureSchematicConfigMapping', () => {
    it('should generate a correct mapping', () => {
      const result = generateMappings().featureSchematicConfigMapping;

      expect(result.get(ASM_FEATURE_NAME)).toEqual(ASM_SCHEMATICS_CONFIG);
      expect(result.get(CHECKOUT_BASE_FEATURE_NAME)).toEqual(
        CHECKOUT_BASE_SCHEMATICS_CONFIG
      );
      expect(result.get(CHECKOUT_B2B_FEATURE_NAME)).toEqual(
        CHECKOUT_B2B_SCHEMATICS_CONFIG
      );
      expect(result.get(CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME)).toEqual(
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

  describe('getKeyByMappingValue', () => {
    it('should return the key', () => {
      const mapping: Map<string, string[]> = new Map();
      mapping.set('x', ['1', '2']);
      const result = getKeyByMappingValue(mapping, '1');
      expect(result).toEqual('x');
    });
    it('should return undefined if not found', () => {
      const mapping: Map<string, string[]> = new Map();
      mapping.set('x', ['1', '2']);
      const result = getKeyByMappingValue(mapping, '3');
      expect(result).toBeFalsy();
    });
  });

  describe('getSchematicsConfigByFeatureOrThrow', () => {
    it('should return the config', () => {
      const config = getSchematicsConfigByFeatureOrThrow(
        CHECKOUT_BASE_FEATURE_NAME
      );
      expect(config).toBeTruthy();
    });
    it('should throw when not found', () => {
      const feature = 'xxx';
      try {
        getSchematicsConfigByFeatureOrThrow(feature);
      } catch (e) {
        expect((e as any).message).toEqual(
          `Config not found for the given feature '${feature}'`
        );
      }
    });
  });
});
