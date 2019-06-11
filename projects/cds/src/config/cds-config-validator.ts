import { CdsConfig } from './config.model';

export function cdsConfigValidator(config: CdsConfig) {
  if (
    config.cds === undefined ||
    config.cds.httpHeaderName === undefined ||
    config.cds.httpHeaderName.id === undefined
  ) {
    return 'Please configure cds.httpHeaderName.id before using CDS library!';
  }

  if (config.cds === undefined || config.cds.baseUrl === undefined) {
    return 'Please configure cds.baseUrl before using CDS library!';
  }

  if (config.cds === undefined || config.cds.tenantId === undefined) {
    return 'Please configure cds.tenantId before using CDS library!';
  }

  if (
    config.cds === undefined ||
    config.cds.profileTagScriptUrl === undefined
  ) {
    return 'Please configure cds.profileTagScriptUrl before using CDS library!';
  }
}
