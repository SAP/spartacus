import { SiteContextConfig } from './site-context-config';

/**
 * Helper function for safely getting context parameter config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterValues(
  config: SiteContextConfig,
  parameter: string
): string[] {
  return (config.context && config.context[parameter]) || [];
}

/**
 * Helper function for calculating default value for context parameter from config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterDefault(
  config: SiteContextConfig,
  parameter: string
): string | undefined {
  const param = getContextParameterValues(config, parameter);
  return param && param.length ? param[0] : undefined;
}
