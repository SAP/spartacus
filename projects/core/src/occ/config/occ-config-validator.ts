import { OccConfig } from './occ-config';

export function occConfigValidator(config: OccConfig) {
  if (
    config.backend === undefined ||
    config.backend.occ === undefined ||
    config.backend.occ.baseUrl === undefined
  ) {
    return 'Please configure backend.occ.baseUrl before using storefront library!';
  }
}
