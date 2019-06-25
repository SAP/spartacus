import { ContextParameter, SiteContextConfig } from './site-context-config';
import {
  getContextParameter,
  getContextParameterDefault,
} from './context-config-utils';

describe('Context Config Utils', () => {
  describe('getContextParameter', () => {
    it('should return correct context paramter from the config', () => {
      const testParam: ContextParameter = {
        default: 'default',
      };
      const config: SiteContextConfig = {
        context: {
          parameters: {
            test: testParam,
          },
        },
      };
      expect(getContextParameter(config, 'test')).toBe(testParam);
    });

    it('should return empty object if no config is provided', () => {
      const config: SiteContextConfig = {};
      expect(getContextParameter(config, 'test')).toEqual({});
    });
  });

  describe('getContextParameterDefault', () => {
    it('should return default value', () => {
      const config: SiteContextConfig = {
        context: {
          parameters: {
            test: {
              default: 'defaultValue',
              values: ['a', 'b'],
            },
          },
        },
      };
      expect(getContextParameterDefault(config, 'test')).toEqual(
        'defaultValue'
      );
    });

    it('should return first value from values if there is no default', () => {
      const config: SiteContextConfig = {
        context: {
          parameters: {
            test: {
              values: ['a', 'b'],
            },
          },
        },
      };
      expect(getContextParameterDefault(config, 'test')).toEqual('a');
    });

    it('should return undefined if there is no default or values', () => {
      const config: SiteContextConfig = {
        context: {
          parameters: {
            baseSite: {
              values: [],
            },
          },
        },
      };
      expect(getContextParameterDefault(config, 'test')).toBe(undefined);
    });
  });
});
