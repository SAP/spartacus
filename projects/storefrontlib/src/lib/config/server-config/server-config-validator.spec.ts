import { serverConfigValidator } from './server-config-validator';
import { ServerConfig } from './server-config';

describe('serverConfigValidator', () => {
  it('should warn about undefined baseUrl', () => {
    const invalidConfig: ServerConfig = {
      server: {}
    };
    expect(serverConfigValidator(invalidConfig)).toBeTruthy();
  });

  it('should not warn about undefined baseUrl', () => {
    const invalidConfig: ServerConfig = {
      server: {
        baseUrl: ''
      }
    };
    expect(serverConfigValidator(invalidConfig)).toBeFalsy();
  });
});
