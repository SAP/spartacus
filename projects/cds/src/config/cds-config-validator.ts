import { CdsConfig } from './cds-config';

export function cdsConfigValidator(config: CdsConfig): string | void {
  if (config.cds) {
    if (config.cds.tenant === undefined) {
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
}
