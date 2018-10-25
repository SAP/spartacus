import { ServerConfig } from './server-config';

export function serverConfigValidator(config: ServerConfig) {
  if (config.server.baseUrl === undefined) {
    return 'Please configure server.baseUrl before using storefront library!';
  }
}
