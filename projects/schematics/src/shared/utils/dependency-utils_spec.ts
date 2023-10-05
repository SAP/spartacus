/// <reference types="jest" />

import {
  CART_BASE_FEATURE_NAME,
  CDC_FEATURE_NAME,
  CHECKOUT_B2B_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  ORGANIZATION_USER_REGISTRATION_FEATURE_NAME,
  ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
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
  USER_ACCOUNT_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
  CDC_B2B_FEATURE_NAME,
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
        CDC_B2B_FEATURE_NAME,
        DIGITAL_PAYMENTS_FEATURE_NAME,
        CHECKOUT_B2B_FEATURE_NAME,
      ]);

      expect(result).toEqual([
        USER_ACCOUNT_FEATURE_NAME,
        USER_PROFILE_FEATURE_NAME,
        CART_BASE_FEATURE_NAME,
        ORDER_FEATURE_NAME,
        CHECKOUT_BASE_FEATURE_NAME,
        CHECKOUT_B2B_FEATURE_NAME,
        ORGANIZATION_USER_REGISTRATION_FEATURE_NAME,
        ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
        DIGITAL_PAYMENTS_FEATURE_NAME,
        CDC_B2B_FEATURE_NAME,
      ]);
    });

    it('User Profile - should return the correct set of ordered sub-features', () => {
      const result = analyzeCrossFeatureDependencies([
        USER_PROFILE_FEATURE_NAME,
      ]);

      expect(result).toEqual([
        USER_ACCOUNT_FEATURE_NAME,
        USER_PROFILE_FEATURE_NAME,
      ]);
    });
  });

  describe('analyzeCrossLibraryDependenciesByFeatures', () => {
    it('DP - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependenciesByFeatures([
        DIGITAL_PAYMENTS_FEATURE_NAME,
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
        CDC_FEATURE_NAME,
      ]);

      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_ORGANIZATION,
        SPARTACUS_ASM,
        SPARTACUS_CDC,
      ]);
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
        SPARTACUS_ORGANIZATION,
        SPARTACUS_ASM,
        SPARTACUS_DIGITAL_PAYMENTS,
        SPARTACUS_CDC,
      ]);
    });

    it('CDC - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependenciesByLibraries([
        SPARTACUS_CDC,
      ]);

      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_ORGANIZATION,
        SPARTACUS_ASM,
        SPARTACUS_CDC,
      ]);
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
        SPARTACUS_ORGANIZATION,
        SPARTACUS_PRODUCT_CONFIGURATOR,
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
