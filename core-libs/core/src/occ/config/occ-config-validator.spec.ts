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
});
