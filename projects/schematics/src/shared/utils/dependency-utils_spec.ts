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
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_ORDER,
  SPARTACUS_USER,
} from '../libs-constants';
import {
  analyzeCrossFeatureDependencies,
  analyzeCrossLibraryDependencies,
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

  describe('analyzeCrossLibraryDependencies', () => {
    it('DP - should return the correct set of ordered libraries', () => {
      const result = analyzeCrossLibraryDependencies([
        SPARTACUS_DIGITAL_PAYMENTS,
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
      const result = analyzeCrossLibraryDependencies([SPARTACUS_CDC]);

      expect(result).toEqual([SPARTACUS_USER, SPARTACUS_ASM, SPARTACUS_CDC]);
    });
  });
});
