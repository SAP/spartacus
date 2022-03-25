/// <reference types="jest" />

import {
  CLI_CART_BASE_FEATURE,
  CLI_CDC_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  CLI_ORDER_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  CLI_USER_PROFILE_FEATURE,
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CORE,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_ORDER,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_USER,
} from '../libs-constants';
import {
  analyzeCrossFeatureDependencies,
  analyzeCrossLibraryDependenciesByFeatures,
  analyzeCrossLibraryDependenciesByLibraries,
  collectCrossSpartacusPeerDeps,
} from './dependency-utils';

describe('dependency-util', () => {
  describe('analyzeCrossFeatureDependencies', () => {
    it('DP - should return the correct set of ordered sub-features', () => {
      const result = analyzeCrossFeatureDependencies([
        CLI_CDC_FEATURE,
        CLI_DIGITAL_PAYMENTS_FEATURE,
        CLI_CHECKOUT_B2B_FEATURE,
      ]);

      expect(result).toEqual([
        CLI_USER_ACCOUNT_FEATURE,
        CLI_USER_PROFILE_FEATURE,
        CLI_CART_BASE_FEATURE,
        CLI_ORDER_FEATURE,
        CLI_CHECKOUT_BASE_FEATURE,
        CLI_CHECKOUT_B2B_FEATURE,
        CLI_DIGITAL_PAYMENTS_FEATURE,
        CLI_CDC_FEATURE,
      ]);
    });
    it('User Profile - should return the correct set of ordered sub-features', () => {
      const result = analyzeCrossFeatureDependencies([
        CLI_USER_PROFILE_FEATURE,
      ]);

      expect(result).toEqual([
        CLI_USER_ACCOUNT_FEATURE,
        CLI_USER_PROFILE_FEATURE,
      ]);
    });
  });

  describe('analyzeCrossLibraryDependenciesByFeatures', () => {
    it('DP - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependenciesByFeatures([
        CLI_DIGITAL_PAYMENTS_FEATURE,
      ]);

      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_DIGITAL_PAYMENTS,
      ]);
    });
    it('CDC - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependenciesByFeatures([
        CLI_CDC_FEATURE,
      ]);

      expect(result).toEqual([SPARTACUS_USER, SPARTACUS_ASM, SPARTACUS_CDC]);
    });
  });

  describe('analyzeCrossLibraryDependenciesByLibraries', () => {
    it('DP and CDC - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependenciesByLibraries([
        SPARTACUS_DIGITAL_PAYMENTS,
        SPARTACUS_CDC,
      ]);

      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_ASM,
        SPARTACUS_DIGITAL_PAYMENTS,
        SPARTACUS_CDC,
      ]);
    });

    it('CDC - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependenciesByLibraries([
        SPARTACUS_CDC,
      ]);

      expect(result).toEqual([SPARTACUS_USER, SPARTACUS_ASM, SPARTACUS_CDC]);
    });

    it('Core libs, Organization and Product configurator', () => {
      const result = analyzeCrossLibraryDependenciesByLibraries([
        SPARTACUS_CORE,
        SPARTACUS_STOREFRONTLIB,
        SPARTACUS_ORGANIZATION,
        SPARTACUS_PRODUCT_CONFIGURATOR,
      ]);

      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_PRODUCT_CONFIGURATOR,
        SPARTACUS_ORGANIZATION,
        SPARTACUS_CORE,
        SPARTACUS_STOREFRONTLIB,
      ]);
    });
  });

  describe('collectCrossSpartacusPeerDeps', () => {
    it('should correctly collect all peer deps for the given library and its dependencies', () => {
      const result: string[] = [];
      collectCrossSpartacusPeerDeps(SPARTACUS_DIGITAL_PAYMENTS, result);

      expect(result).toContain(SPARTACUS_CART);
      expect(result).toContain(SPARTACUS_CHECKOUT);
      expect(result).toContain(SPARTACUS_ORDER);
      expect(result).toContain(SPARTACUS_USER);
    });
  });
});
