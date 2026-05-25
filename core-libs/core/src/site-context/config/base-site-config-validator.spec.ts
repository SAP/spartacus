import { baseSiteConfigValidator } from './base-site-config-validator';
import { SiteContextConfig } from './site-context-config';

describe('baseSiteConfigValidator', () => {
  it('should warn about undefined baseSite', () => {
    const config: SiteContextConfig = {
      context: {},
    };
    expect(baseSiteConfigValidator(config)).toBeTruthy();
  });

  it('should not warn about undefined baseSite', () => {
    const config: SiteContextConfig = {
      context: {
        baseSite: ['default'],
      },
    };
    expect(baseSiteConfigValidator(config)).toBeFalsy();
  });
});
