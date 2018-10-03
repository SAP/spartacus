import { ServerConfig } from '@spartacus/storefront';

export function serverConfigValidator(config: ServerConfig) {
  if (config.server.baseUrl === undefined) {
    return 'Please configure server.baseUrl before using storefront library!';
  }
}
