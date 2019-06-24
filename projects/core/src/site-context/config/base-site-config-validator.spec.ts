import { baseSiteConfigValidator } from './base-site-config-validator';
import { SiteContextConfig } from './site-context-config';

describe('occConfigValidator', () => {
  it('should warn about undefined baseUrl', () => {
    const config: SiteContextConfig = {
      context: {},
    };
    expect(baseSiteConfigValidator(config)).toBeTruthy();
  });

  it('should not warn about undefined baseUrl', () => {
    const config: SiteContextConfig = {
      context: {
        parameters: {
          baseSite: {
            default: 'default',
          },
        },
      },
    };
    expect(baseSiteConfigValidator(config)).toBeFalsy();
  });

  it('should not warn about undefined baseUrl', () => {
    const config: SiteContextConfig = {
      context: {
        parameters: {
          baseSite: {
            values: ['default'],
          },
        },
      },
    };
    expect(baseSiteConfigValidator(config)).toBeFalsy();
  });
});
