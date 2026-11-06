import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig } from './auth-config';
import { baseUrlConfigValidator } from './base-url-config-validator';

describe('baseUrlConfigValidator', () => {
  it('should warn when occ and auth baseUrl is not set', () => {
    const config: OccConfig & AuthConfig = {
      backend: {},
      authentication: {},
    };
    expect(baseUrlConfigValidator(config)).toBeTruthy();
  });

  it('should not warn when auth baseUrl is set', () => {
    const config: OccConfig & AuthConfig = {
      backend: {},
      authentication: {
        baseUrl: 'http://authserver.com',
      },
    };
    expect(baseUrlConfigValidator(config)).toBeFalsy();
  });

  it('should not warn when occ baseUrl is set', () => {
    const config: OccConfig & AuthConfig = {
      backend: {
        occ: {
          baseUrl: 'http://baseurl.com',
        },
      },
      authentication: {},
    };
    expect(baseUrlConfigValidator(config)).toBeFalsy();
  });

  it('should not warn when requireHttps option is set to false', () => {
    const config: OccConfig & AuthConfig = {
      backend: {},
      authentication: {
        OAuthLibConfig: {
          requireHttps: false,
        },
      },
    };
    expect(baseUrlConfigValidator(config)).toBeFalsy();
  });
});
