import { TmsConfig } from './tms-config';

export function tmsConfigValidator(config?: TmsConfig): string | void {
  if (!config) {
    return `Please provide the 'tms' configuration before using the TMS feature.`;
  }

  for (const collector in config.tagManager) {
    const collectorConfig = config.tagManager[collector];

    if (collectorConfig.pushStrategy === undefined) {
      return `Please configure 'pushStrategy' functions for the '${collector}' collector before using the TMS feature.`;
    }
  }
}
