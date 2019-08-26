import { SiteContextConfig } from './site-context-config';
import {
  getContextParameterValues,
  getContextParameterDefault,
} from './context-config-utils';

describe('Context Config Utils', () => {
  describe('getContextParameterValues', () => {
    it('should return correct values from the config', () => {
      const testParam = ['default'];
      const config: SiteContextConfig = {
        context: {
          test: testParam,
        },
      };
      expect(getContextParameterValues(config, 'test')).toBe(testParam);
    });

    it('should return empty array if no config is provided', () => {
      const config: SiteContextConfig = {};
      expect(getContextParameterValues(config, 'test')).toEqual([]);
    });
  });

  describe('getContextParameterDefault', () => {
    it('should return first value from values as default', () => {
      const config: SiteContextConfig = {
        context: {
          test: ['a', 'b'],
        },
      };
      expect(getContextParameterDefault(config, 'test')).toEqual('a');
    });

    it('should return undefined if there is no values', () => {
      const config: SiteContextConfig = {
        context: {
          baseSite: [],
        },
      };
      expect(getContextParameterDefault(config, 'test')).toBe(undefined);
    });
  });
});
