import { OccConfig } from './occ-config';
import { occConfigValidator } from './occ-config-validator';

describe('occConfigValidator', () => {
  it('should warn about undefined baseUrl', () => {
    const config: OccConfig = {
      backend: {},
    };
    expect(occConfigValidator(config)).toBeTruthy();
  });

  it('should not warn about undefined baseUrl', () => {
    const config: OccConfig = {
      backend: {
        occ: {
          baseUrl: '',
        },
      },
    };
    expect(occConfigValidator(config)).toBeFalsy();
  });

  it('should prepend a slash to the prefix if it does not start with one', () => {
    const config: OccConfig = {
      backend: {
        occ: {
          baseUrl: '',
          prefix: 'occ/v2/',
        },
      },
    };
    occConfigValidator(config);
    expect(config.backend.occ.prefix).toEqual('/occ/v2/');
  });

  it('should not do anything if the prefix starts with a slash', () => {
    const config: OccConfig = {
      backend: {
        occ: {
          baseUrl: '',
          prefix: '/occ/v2/',
        },
      },
    };
    occConfigValidator(config);
    expect(config.backend.occ.prefix).toEqual('/occ/v2/');
  });
});
