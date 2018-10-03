import { serverConfigValidator } from './server-config-validator';
import { ServerConfig } from '@spartacus/storefront';

describe('serverConfigValidator', () => {
  it('should warn about undefined baseUsl', () => {
    const invalidConfig: ServerConfig = {
      server: {}
    };
    expect(serverConfigValidator(invalidConfig)).toBeTruthy();
  });

  it('should not warn about undefined baseUsl', () => {
    const invalidConfig: ServerConfig = {
      server: {
        baseUrl: ''
      }
    };
    expect(serverConfigValidator(invalidConfig)).toBeUndefined();
  });
});
