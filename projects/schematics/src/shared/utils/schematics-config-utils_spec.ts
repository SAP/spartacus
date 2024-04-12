/// <reference types="jest" />

import {
  CHECKOUT_BASE_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  //OPPS_COUPON_CODES_FEATURE_NAME,
} from '../libs-constants';
import { getConfiguredDependencies } from './schematics-config-utils';

describe('schematics-config-util', () => {
  describe('getConfiguredDependencies', () => {
    it('should return the correct feature dependencies for the given feature', () => {
      const result = getConfiguredDependencies(DIGITAL_PAYMENTS_FEATURE_NAME);
      //console.log('Anjana: A1:',result);
      expect(result).toEqual([CHECKOUT_BASE_FEATURE_NAME]);
    });
    // it('Anjana', () => {
    //   //const _result = getConfiguredDependencies(OPPS_COUPON_CODES_FEATURE_NAME);
    //   //console.log('Anjana 2:',result);
    // });
  });
});
