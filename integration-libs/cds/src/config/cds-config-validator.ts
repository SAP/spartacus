import { CdsConfig } from './cds-config';

export function cdsConfigValidator(config: CdsConfig): string | void {
  if (!config.cds) {
    return 'Please configure the config.cds object before using the CDS library';
  }
  if (config.cds.profileTag !== undefined) {
    if (
      config.cds.profileTag.configUrl === undefined ||
      config.cds.profileTag.configUrl.trim().length === 0
    ) {
      return 'Please configure cds.profileTag.configUrl before using the CDS library';
    }
    if (
      config.cds.profileTag.javascriptUrl === undefined ||
      config.cds.profileTag.javascriptUrl.trim().length === 0
    ) {
      return 'Please configure cds.profileTag.configUrl before using the CDS library';
    }
  }
  if (
    config.cds.tenant === undefined ||
    config.cds.tenant.trim().length === 0
  ) {
    return 'Please configure cds.tenant before using CDS library';
  }

  if (config.cds.baseUrl === undefined) {
    return 'Please configure cds.baseUrl before using CDS library';
  }

  if (
    config.cds.endpoints === undefined ||
    config.cds.endpoints.strategyProducts === undefined
  ) {
    return 'Please configure the cds.endpoints before using CDS library';
  }
}
