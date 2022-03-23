/// <reference types="jest" />

import { DIGITAL_PAYMENTS_SCHEMATICS_CONFIG } from '../lib-configs/integration-libs/digital-payments-schematics-config';
import {
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
} from '../libs-constants';
import {
  getConfiguredDependencies,
  getSchematicsConfigurationByFeature,
} from './schematics-config-utils';

describe('schematics-config-util', () => {
  describe('getConfiguredDependencies', () => {
    it('should return the correct feature dependencies for the given feature', () => {
      const result = getConfiguredDependencies(CLI_DIGITAL_PAYMENTS_FEATURE);
      expect(result).toEqual([CLI_CHECKOUT_BASE_FEATURE]);
    });
  });

  describe('getSchematicsConfigurationByFeature', () => {
    it('should return the proper schematics config for the given feature', () => {
      const result = getSchematicsConfigurationByFeature(
        CLI_DIGITAL_PAYMENTS_FEATURE
      );
      expect(result).toEqual(DIGITAL_PAYMENTS_SCHEMATICS_CONFIG);
    });

    it('should return undefined if not found', () => {
      const result = getSchematicsConfigurationByFeature('xxx');
      expect(result).toBeFalsy();
    });
  });
});
