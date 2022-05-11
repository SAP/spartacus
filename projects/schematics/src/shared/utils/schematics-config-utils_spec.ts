/// <reference types="jest" />

import {
  CHECKOUT_BASE_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
} from '../libs-constants';
import { getConfiguredDependencies } from './schematics-config-utils';

describe('schematics-config-util', () => {
  describe('getConfiguredDependencies', () => {
    it('should return the correct feature dependencies for the given feature', () => {
      const result = getConfiguredDependencies(DIGITAL_PAYMENTS_FEATURE_NAME);
      expect(result).toEqual([CHECKOUT_BASE_FEATURE_NAME]);
    });
  });
});
