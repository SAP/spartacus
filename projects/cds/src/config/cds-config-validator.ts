import { CdsConfig } from './config.model';

export function cdsConfigValidator(config: CdsConfig) {
  if (
    config.cds.profileTag === undefined ||
    config.cds.profileTag.tenant === undefined
  ) {
    return 'Please configure profileTag.tenantId before using CDS library!';
  }

  if (
    config.cds.profileTag === undefined ||
    config.cds.profileTag.configUrl === undefined
  ) {
    return 'Please configure profileTag.configUrl before using CDS library!';
  }
}
