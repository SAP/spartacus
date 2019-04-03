import { OccConfig } from '../../occ';

export function serverConfigValidator(config: OccConfig) {
  if (config.backend.occ.baseUrl === undefined) {
    return 'Please configure server.baseUrl before using storefront library!';
  }
}
