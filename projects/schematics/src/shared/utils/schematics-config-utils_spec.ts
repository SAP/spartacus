/// <reference types="jest" />

import {
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
} from '../libs-constants';
import { getConfiguredDependencies } from './schematics-config-utils';

describe('schematics-config-util', () => {
  describe('getConfiguredDependencies', () => {
    it('should return the correct feature dependencies for the given feature', () => {
      const result = getConfiguredDependencies(CLI_DIGITAL_PAYMENTS_FEATURE);
      expect(result).toEqual([CLI_CHECKOUT_BASE_FEATURE]);
    });
  });
});
